# frozen_string_literal: true

class SurveysController < ApplicationController
  before_action :find_survey, except: %i[index new create]
  before_action :find_question, only: %i[question_sort add_answer_item add_question add_question_description save_checkbox add_answer update_select remove_question remove_answer questions_list skip_to_question_id remove_skip_to_question_id]

  def index
    if logged_in?
      @surveys = current_user.surveys
    else
      redirect_to new_users_path
    end
  end

  def show; end

  def new
    case current_user.status
    when "free"
      if current_user.surveys.count >= 3
        redirect_to surveys_path, alert: '你尚未升級為專業會員'
      else
        @survey = current_user.surveys.create
        question = @survey.questions.create
        2.times { question.answers.create }
        redirect_to edit_survey_path(@survey.id)
      end
    when "pro"
      @survey = current_user.surveys.create
      question = @survey.questions.create
      2.times { question.answers.create }
      redirect_to edit_survey_path(@survey.id)
    end
  end

  def edit
    @survey.questions.order(:position)
    @survey_url = "#{request.protocol}#{request.host_with_port}/to/#{params[:id]}"
  end

  def create
    @survey = current_user.surveys.new(survey_params)
    if @survey.save
      render :edit
    else
      render :new
    end
  end

  def update
    @survey.update(survey_params)
    redirect_to edit_survey_path(@survey), notice: "更換圖片成功"
  end

  def destroy
    @survey.image.purge
    @survey.destroy
    redirect_to surveys_path, notice: '問卷已刪除'
  end

  def duplicate
    dup = @survey.deep_clone include: {questions: :answers }
    dup.title.insert(-1, " - 副本")
    if dup.save 
      redirect_to surveys_path, notice: '問卷已複製成功'
    end
  end

  def duplicate_question
    question = @survey.questions.find(params[:question_id]).deep_clone include: :answers
    question.update(title: (question.title + ' - 副本'), position: question.position + 1)
    render json: {
      copy_question: question,
      question_description: question.description,
      answers: question.answers
    }
  end

  def stats
    question_ids = []
    question_titles = []
    answer_ids = []
    answer_titles = []
    answers_counts = [0]

    # combine question and answers
    @survey.questions.each do |question|
      question_ids << question.id
      question_titles << question.title

      case question.question_type
      when '多選題', '單選題', '滿意度', '下拉選單'
        answers_count = 0
        question.answers.each do |answer|
          answer_ids << answer.id
          answer_titles << answer.title
          if answer.question_id == question.id
            answers_count += 1
          end
        end
        answers_counts << answers_count
      end
    end
   
    # deal with responses  
    response_index = 0
    response_question_index = 0
    response_answer_ids = []
    xls_answer_arrays = []
    response_jsons = []
    response_question_answers = []
    
    @survey.responses.each do |response|
      xls_answer_array = [response.created_at]
      key_index = 0
      while key_index < question_ids.length
        unless response.answers.has_key?(question_ids[key_index].to_s)
          response.answers[question_ids[key_index].to_s] =
            ''
        end
        key_index += 1
      end

      @survey.questions.each do |question|
        response_question_answer = []
        current_response_answers = response.answers[question.id.to_s] 
        case question.question_type
        when '多選題'
          if current_response_answers.present?
            current_response_answers.delete('0')
            multiple_answers = []
            current_response_answers.each do |current_response_answer|
              answer_index = 0
              while answer_index < answers_counts.sum
                if current_response_answer == answer_ids[answer_index].to_s
                  response_question_answer << answer_titles[answer_index]
                  multiple_answers << answer_titles[answer_index]
                  response_answer_ids << answer_ids[answer_index]
                  break
                end
                answer_index += 1
              end
            end
            xls_answer_array << multiple_answers.join(', ')
          end
        when '單選題', '滿意度', '下拉選單'
          answer_index = 0
          if current_response_answers.present?
            while answer_index < answers_counts.sum
              if current_response_answers == answer_ids[answer_index].to_s
                response_question_answer << answer_titles[answer_index]
                response_answer_ids << answer_ids[answer_index]
                xls_answer_array << answer_titles[answer_index]
                break
              end
              answer_index += 1
            end
          else
            xls_answer_array << ''
          end

        when '問答題', '日期', '時間', '範圍'
          response_question_answer << current_response_answers
          xls_answer_array << current_response_answers
          xls_answer_arrays << xls_answer_array
        end

        response_question_answers << response_question_answer

        response_jsons[response_question_index] = {
          responseIndex: response_index,
          questionTitles: question.title,
          responseAnswerTitles: response_question_answers[response_question_index],
        }
        response_question_index += 1
      end
      response_index += 1
    end

    @responseJsons = response_jsons
    @response_question_answers = response_question_answers
    
    sum_of_response_answer_ids = []

    answer_ids.each do |answer_id|
      sum_of_response_answer_ids << response_answer_ids.count(answer_id)
    end

    # create charts
    chart_index = 0
    slice_from = 0
    chart_datas = []
    chart_options = []
    chart_types = %w[bar pie line]
    canvas_target_name = %w[canvasBar canvasPie canvasLine]

    @survey.questions.each do |question|
      case question.question_type
      when '多選題' , '單選題', '滿意度', '下拉選單'
          
        slice_from += answers_counts[chart_index]
        slice_length = answers_counts[chart_index + 1]

        chart_datas[chart_index] = {
          labels: answer_titles.slice(slice_from, slice_length),
          datasets: [{
            label: question.title,
            backgroundColor: ['#f65686', '#1e8df6', '#f9cb40', '#27dd9c'],
            borderColor: ['#f65686', '#1e8df6', '#f9cb40', '#27dd9c'],
            borderWidth: 1,
            data: sum_of_response_answer_ids.slice(slice_from, slice_length)
          }]
        }

        chart_options[chart_index] = {
          plugins: {
            title: {
              display: true,
              text: question.title
            }
          },
          layout: {
            padding: 50
          },
          scales: {
            y: {
              ticks: {
                stepSize: 1
              },
              beginAtZero: true
            }
          },
        }   

        chart_index += 1
      end
    end
    @chart_types = chart_types
    @chart_datas = chart_datas
    @chart_options = chart_options
    @chart_count = chart_index
    @canvas_target_name = canvas_target_name

    #excel
    @questionTitles = question_titles.insert(0,'時間')
    @xlsAnswerArrays = xls_answer_arrays
    respond_to do |format|
      format.xlsx
      format.html
    end
  end

  def tag
    survey = Survey.find(params[:survey_id])
    tag = params[:survey][:tag]
    survey.update(tag: tag)
    redirect_to surveys_path(survey)
  end

  def sort
    @survey.insert_at(params[:newIndex].to_i)
  end

  def question_sort
    @question.insert_at(params[:newIndex].to_i)
  end

  def add_survey_title
    @survey.update(title: params[:survey_title])
    render json: {
      message: '更新成功',
      params: params
    }
  end

  def add_survey_description
    @survey.update(description: params[:survey_description])
    render json: {
      message: '更新成功',
      params: params
    }
  end

  def add_question_item
    @survey.questions.create
    new_question = Question.last

    render json: {
      message: '更新成功',
      new_question_id: new_question.id,
      params: params
    }
  end

  def add_answer_item
    @question.answers.create
    new_answer_id = Answer.last

    render json: {
      message: '更新成功',
      new_answer_id: new_answer_id.id,
      params: params
    }
  end

  def add_question
    @question.update(title: params[:question_value])
    render json: {
      message: '更新成功',
      params: params
    }
  end

  def add_question_description
    @question.update(description: params[:question_description])

    render json: {
      message: '更新成功',
      params: params
    }
  end

  def question_image
    question = Question.find(params[:question_id])
    question.image.attach(params[:image])
    redirect_to edit_survey_path(params[:survey_id])
  end
  

  def save_checkbox
    @question.update(required: !@question.required)
    render json: {
      message: '更新成功',
      params: params
    }
  end

  def add_answer
    answer = @question.answers.find(params[:answer_id])
    answer.update(title: params[:answer_value])
    render json: {
      message: '更新成功',
      params: params
    }
  end

  def update_select
    @question.update(question_type: params[:select])
    render json: {
      message: '更新成功',
      params: params
    }
  end
  
  def remove_question
    @question.destroy
    render json: {
      message: '刪除問題成功',
      params: params
    }
  end

  def remove_answer
    answer = @question.answers.find(params[:answer_id])
    answer.destroy
    render json: {
      message: '刪除答案成功',
      params: params
    }
  end

  def update_status
    @survey.update(status: params[:status_value])
    render json: {
      message: '問卷狀態更新',
      params: params
    }
  end

  def update_opentime
    @survey.update(opentime: params[:opentime])
    if @survey.closetime.present? && @survey.closetime < @survey.opentime
      @survey.update(opentime: @survey.created_at)
      render json: {
        message: "不能晚於關閉時間",
        params: params
      }
    else
      render json: {
        message: "設定成功!",
        params: params
      }
    end
  end

  def update_closetime
    @survey.update(closetime: params[:closetime])
    if @survey.closetime > @survey.opentime
      render json: {
        message: "設定成功!",
        params: params
      }
    else
      @survey.update(closetime: nil)
      render json: {
        message: "不能早於開啟時間",
        params: params
      }
    end
  end

  def font_style
    @survey.update(font_style: params[:font_style])
    render json: {
      message: '字體更新成功'
    }
  end

  def theme
    @survey.update(theme: params[:theme])
    render json: {
      message: '主題顏色更新成功'
    }
  end

  def background_color
    @survey.update(background_color: params[:background_color])
    render json: {
      message: '背景顏色更新成功'
    }
  end

  def questions_list
    answer_skip_to_question_id = @question.answers.find(params[:answer_id]).skip_to_question_id
    @questions = @survey.questions
    render json: {
      message: @questions,
      params: answer_skip_to_question_id
    }
  end

  def skip_to_question_id
    answer = @question.answers.find(params[:answer_id])
    answer.update(skip_to_question_id: params[:skip_to_question_id])
    render json: {
      message: '儲存成功',
      params: params
    }
  end

  def remove_skip_to_question_id
    answer = @question.answers.find(params[:answer_id])
    answer_skip_to_question_id = @question.answers.find(params[:answer_id]).skip_to_question_id
    answer.update(skip_to_question_id: nil)
    render json: {
      message: '移除成功',
      params: answer_skip_to_question_id
    }
  end

  private
  def find_survey
    @survey = current_user.surveys.find(params[:id])
  end

  def find_question
    @question = @survey.questions.find(params[:question_id])
  end

  def survey_params
    params.require(:survey).permit(
      :title,
      :description,
      :position,
      :font_style,
      :theme,
      :image,
      :status,
      :opentime,
      :closetime,
      questions_attributes: [
        :_destroy,
        :id,
        :question_type,
        :title,
        :required,
        :position,
        :description,
        :image,
        :skip_to_question_id,
        { answers_attributes: %i[
          _destroy
          id
          title
        ] }
      ]
    )
  end
end
