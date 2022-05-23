# frozen_string_literal: true

class SurveysController < ApplicationController
  before_action :find_survey, except: %i[index new create ]

  def index
    @surveys = current_user.surveys
  end

  def show; end

  def new
    @survey = current_user.surveys.create
    redirect_to  edit_survey_path(@survey.id)
  end

  def edit
    question = @survey.questions.order(:position)
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
  end

  def destroy
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
  
    @survey.responses.each do |response|
      response_answer_datas << '==========================='
      response_answer_datas << '第' + (response_index+1).to_s + '份'
      response_answer_datas << '==========================='

      @survey.questions.each do |question|
        response_answer_datas << question.title
        current_response_answers = response.answers[question.id.to_s]

        case question.question_type
        when 'multiple_choice'
          if current_response_answers.present?
            current_response_answers.delete('0')
            current_response_answers.each do |current_response_answer|
              answer_index = 0
              while answer_index < answers_counts.sum
                if current_response_answer == answer_ids[answer_index].to_s
                  response_answer_datas << answer_titles[answer_index]
                  response_answer_ids << answer_ids[answer_index]
                end
                answer_index += 1
              end
            end
          end
        when 'single_choice', 'satisfaction', 'drop_down_menu'
          answer_index = 0
          while answer_index < answers_counts.sum
            if current_response_answers == answer_ids[answer_index].to_s
              response_answer_datas << answer_titles[answer_index]
              response_answer_ids << answer_ids[answer_index]
            end
            answer_index += 1
          end
        when 'long_answer', 'date', 'time', 'range'
          response_answer_datas << current_response_answers
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
    chart_types = []
    chart_datas = []
    chart_options = []
    @survey.questions.each do |question|
      case question.question_type
      when 'multiple_choice' , 'single_choice', 'satisfaction', 'drop_down_menu'
          
        slice_from += answers_counts[chart_index]
        slice_length = answers_counts[chart_index+1]  

        chart_types[chart_index] = 'bar'
        chart_datas[chart_index] = {
          labels: answer_titles.slice(slice_from, slice_length),
          datasets: [{
            label: question.title,
            backgroundColor: '#ffb3b3',
            borderColor: '#ffb3b3',
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

  def font_style
    @survey.update(font_style: params[:font_style])
    render json: {
      message: "字體更新成功"
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
      questions_attributes: [
        :_destroy,
        :id,
        :question_type,
        :title,
        :required,
        :position,
        :description,
        { answers_attributes: %i[
          _destroy
          id
          title
        ] }
      ]
    )
  end
end
