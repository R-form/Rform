# frozen_string_literal: true

class SurveysController < ApplicationController
  before_action :find_survey, except: %i[index new create tag]

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
    question_index = 0
    question_ids = []
    question_titles = []
    question_types = []
    answer_index = 0
    max_answers_count = 0
    answer_ids = []
    answer_titles = []
    answer_question_ids = []
    question_answer_data = []
    answers_counts = [0]

  
    # combine question and answers
    @survey.questions.each do |question|
      question_ids[question_index] = question.id
      question_titles[question_index] = question.title
      question_types[question_index] = question.question_type
      question_answer_data.push(question_titles[question_index])
      question_answer_data.push(question_types[question_index])

      answers_count = 0
      question.answers.each do |answer|
        answer_ids[answer_index] = answer.id
        answer_titles[answer_index] = answer.title
        answer_question_ids[answer_index] = answer.question_id
        if answer_question_ids[answer_index] == question_ids[question_index]
          question_answer_data.push(answer_titles[answer_index])
          answers_count += 1
        end
        answer_index += 1
      end
      question_answer_data.push(answer_index)
      question_index += 1
      answers_counts.push(answers_count)
    end
    max_answers_count = answer_index
    question_answer_data.push(max_answers_count)
   
    @questionAnswerDatas = question_answer_data
  
    # deal with responses  
    response_index = 0
    response_json = []
    response_id = []
    response_answers = []
    response_answer_datas = []
    response_answer_ids = []

    @survey.responses.all.each do |response|
      response_answer_datas.push(response_index+1)
      response_answer_datas.push('===========================')

      response_json = response.as_json(only: [:id, :answers])
      response_id = response_json['id']
      response_answers = response_json['answers']

      question_index = 0
      while question_index < @survey.questions.count
        question_id_string = @survey.questions[question_index].id.to_s
        current_response_answers = response_answers[question_id_string]

        case @survey.questions[question_index].question_type
        when 'multiple_choice'
          current_response_answers.delete('0')
          current_response_answers.each do |current_response_answer|
            answer_index = 0
            while answer_index < max_answers_count
              if current_response_answer == answer_ids[answer_index].to_s
                response_answer_datas.push(answer_titles[answer_index])
                response_answer_ids.push(answer_ids[answer_index])
              end
              answer_index += 1
            end
          end
        when 'single_choice'
          answer_index = 0
          while answer_index < max_answers_count
            if current_response_answers == answer_ids[answer_index].to_s
              response_answer_datas.push(answer_titles[answer_index])
            end
            answer_index += 1
          end
        when 'long_answer'
          response_answer_datas.push(current_response_answers)
        end

        question_index += 1
      end
      response_index += 1
    end

    sum_of_response_answer_ids = []

    answer_ids.each do |answer_id|
      sum_of_response_answer_ids.push(response_answer_ids.count(answer_id))
    end

    @responseAnswerDatas = response_answer_datas

    # create charts
    chart_index = 0
    slice_from = 0
    chart_types = []
    chart_datas = []
    chart_options = []
    @survey.questions.each do |question|
      slice_from += answers_counts[chart_index]
      slice_length = answers_counts[chart_index+1]  

      chart_types[chart_index] = 'bar'
      chart_datas[chart_index] = {
        labels: answer_titles.slice(slice_from, slice_length),
        datasets: [{
          label: question.title,
          backgroundColor: '#3B82F6',
          borderColor: '#3B82F6',
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
    @chart_types = chart_types
    @chart_datas = chart_datas
    @chart_options = chart_options
  end

  def tag
    @survey = current_user.surveys.find(params[:survey_id])
    @survey.update(tag: params[:survey][:tag])
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
