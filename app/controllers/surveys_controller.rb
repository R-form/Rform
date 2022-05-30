# frozen_string_literal: true

class SurveysController < ApplicationController
  before_action :find_survey, except: %i[index new create]

  def index
    @surveys = current_user.surveys
  end

  def show; end

  def new
    @survey = current_user.surveys.create
    question = @survey.questions.create
    2.times { question.answers.create }
    redirect_to  edit_survey_path(@survey.id)
  end

  def edit
    @survey.questions.order(:position)
    @survey_url = "#{ENV['HOST_NAME']}/to/#{params[:id]}"
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
    @survey.image.purge
    @survey.update(survey_params)
    @survey.image.attach(params[:survey][:image])
    if @survey.questions.first.image.attach(params[:survey][:questions_attributes]["0"][:image])
      redirect_to surveys_path, notice: "`更換圖片成功#{params[:survey][:questions_attributes]["0"][:image]}`"
    end
    # render html: params
  end

  def destroy
    @survey.image.purge
    @survey.destroy
    redirect_to surveys_path, notice: '問卷已刪除'
  end

  def duplicate_survey
    dup = @survey.deep_clone include: {questions: :answers }
    dup.title.insert(-1, " - 副本")
    if dup.save 
      redirect_to surveys_path, notice: '問卷已複製成功'
    end
  end

  def duplicate_question
    question = @survey.questions.find(params[:question_id]).deep_clone include: :answers
    question.update(title: (question.title+" - 副本"),position: (question.position)+1)
    render json: {
      copy_question: question, 
      question_description: question.description,
      answers: question.answers
    }
  end
  
  def stats
    question_ids = []
    question_titles = []
    question_types = []
    answer_ids = []
    answer_titles = []
    answer_question_ids = []
    question_answer_data = []
    answers_counts = [0]
  
    # combine question and answers
    @survey.questions.each do |question|
      question_ids << question.id
      question_titles << question.title
      question_types << question.question_type
      question_answer_data << question.title
      question_answer_data << question.question_type

      case question.question_type
      when 'multiple_choice', 'single_choice', 'satisfaction', 'drop_down_menu'
        answers_count = 0
        question.answers.each do |answer|
          answer_ids << answer.id
          answer_titles << answer.title
          answer_question_ids << answer.question_id
          if answer.question_id == question.id
            question_answer_data << answer.title
            answers_count += 1
          end
        end
        answers_counts << answers_count
      end
      
    end
   
    @questionAnswerDatas = question_answer_data
  
    # deal with responses  
    response_index = 0
    response_answer_datas = []
    response_answer_ids = []
    xls_answer_arrays = []

    @survey.responses.each do |response|
      response_answer_datas << '==========================='
      response_answer_datas << '第' + (response_index+1).to_s + '份'
      response_answer_datas << '==========================='

      xls_answer_array = [response.created_at]
      key_index = 0
      while key_index < question_ids.length
        if !response.answers.has_key?(question_ids[key_index].to_s)
          response.answers[question_ids[key_index].to_s] = ''
        end
        key_index += 1
      end
      @survey.questions.each do |question|
        response_answer_datas << question.title
        current_response_answers = response.answers[question.id.to_s] 
        case question.question_type
        when 'multiple_choice'
          if current_response_answers.present?
            current_response_answers.delete('0')
            multiple_answers = []
            current_response_answers.each do |current_response_answer|
              answer_index = 0
              while answer_index < answers_counts.sum
                if current_response_answer == answer_ids[answer_index].to_s
                  response_answer_datas << answer_titles[answer_index]
                  multiple_answers << answer_titles[answer_index]

                  response_answer_ids << answer_ids[answer_index]
                end
                answer_index += 1
              end
            end
            xls_answer_array << multiple_answers.join(', ')
          end
        when 'single_choice', 'satisfaction', 'drop_down_menu'
          answer_index = 0
          if current_response_answers.present?
            while answer_index < answers_counts.sum
              if current_response_answers == answer_ids[answer_index].to_s
                response_answer_datas << answer_titles[answer_index]
                response_answer_ids << answer_ids[answer_index]
                xls_answer_array << answer_titles[answer_index]
              end
              answer_index += 1
            end
          else
            xls_answer_array << ''
          end
        when 'long_answer', 'date', 'time', 'range'
          response_answer_datas << current_response_answers
          xls_answer_array << current_response_answers
        xls_answer_arrays << xls_answer_array
        end
      end
      response_index += 1    
    end

    sum_of_response_answer_ids = []

    answer_ids.each do |answer_id|
      sum_of_response_answer_ids << response_answer_ids.count(answer_id)
    end

    @responseAnswerDatas = response_answer_datas

    # create charts
    chart_index = 0
    slice_from = 0
    chart_datas = []
    chart_options = []
    chart_types = ['bar', 'pie', 'line']
    canvas_target_name = ['canvasBar', 'canvasPie', 'canvasLine']
    
    @survey.questions.each do |question|
      case question.question_type
      when 'multiple_choice' , 'single_choice', 'satisfaction', 'drop_down_menu'
          
        slice_from += answers_counts[chart_index]
        slice_length = answers_counts[chart_index+1]  

        chart_datas[chart_index] = {
          labels: answer_titles.slice(slice_from, slice_length),
          datasets: [{
            label: question.title,
            backgroundColor: ['#f65686','#1e8df6','#f9cb40','#27dd9c'],
            borderColor: ['#f65686','#1e8df6','#f9cb40','#27dd9c'],
            borderWidth: 1,
            data: sum_of_response_answer_ids.slice(slice_from, slice_length)
          }]
        }

        chart_options[chart_index] = {
          layout: {
            padding: 200
          }
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
    @question = @survey.questions.find(params[:question_id])
    @question.insert_at(params[:newIndex].to_i)
  end

  def add_survey_title
    @survey.update(title: params[:survey_title])
    render json: {
      message: "更新成功",
      params: params
    }
  end

  def add_survey_description
    @survey.update(description: params[:survey_description])
    render json: {
      message: "更新成功",
      params: params
    }
  end

  def add_question_item
    @survey.questions.create
    new_question = Question.last

    render json: {
      message: "更新成功",
      new_question_id: new_question.id,
      params: params
    }
  end

  def add_answer_item
    question = @survey.questions.find(params[:question_id])
    question.answers.create
    new_answer_id = Answer.last

    render json: {
      message: "更新成功",
      new_answer_id: new_answer_id.id,
      params: params
    }
  end

  def add_question
    question = @survey.questions.find(params[:question_id])
    question.update(title: params[:question_value])
    render json: {
      message: "更新成功",
      params: params
    }
  end

  def add_question_description
    question = @survey.questions.find(params[:question_id])
    question.update(description: params[:question_description])

    render json: {
      message: "更新成功",
      params: params
    }
  end

  def save_checkbox
    question = @survey.questions.find(params[:question_id])
    question.update(required: !question.required)
    render json: {
      message: "更新成功",
      params: params
    }
  end

  def add_answer
    question = @survey.questions.find(params[:question_id])
    answer = question.answers.find(params[:answer_id])
    answer.update(title: params[:answer_value])
    render json: {
      message: "更新成功",
      params: params
    }
  end

  def update_select
    question = @survey.questions.find(params[:question_id])
    question.update(question_type: params[:select])
    render json: {
      message: "更新成功",
      params: params
    }
  end

  def remove_question
    question = @survey.questions.find(params[:question_id])
    question.destroy
    render json: {
      message: "刪除問題成功",
      params: params
    }
  end

  def remove_answer
    question = @survey.questions.find(params[:question_id])
    answer = question.answers.find(params[:answer_id])
    answer.destroy
    render json: {
      message: "刪除答案成功",
      params: params
    }
  end

  def update_status
    @survey.update(status: params[:status_value])
    render json: {
      message: "問卷狀態更新",
      params: params
    }
  end

  def update_opentime
    @survey.update(opentime: params[:opentime])
    render json: {
      message: "預設開啟時間設定成功",
      params: params
    }
  end

  def update_closetime
    @survey.update(closetime: params[:closetime])
    render json: {
      message: "預設關閉時間設定成功",
      params: params
    }
  end

  def font_style
    @survey.update(font_style: params[:font_style])
    render json: {
      message: "字體更新成功"
    }
  end

  def theme
    @survey.update(theme: params[:theme])
    render json: {
      message: "主題顏色更新成功"
    }  
  end

  def background_color
    @survey.update(background_color: params[:background_color])
    render json: {
      message: "背景顏色更新成功"
    }  
  end
  
  private
  def find_survey
    @survey = current_user.surveys.find(params[:id])
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
        {images: []},
        { answers_attributes: %i[
          _destroy
          id
          title
        ] },
      ]
    )
  end
end
