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
    questions_count = @survey.questions.all.count
    question_index = 0
    question_json = []
    question_id = []
    question_title = []
    question_type = []
    answer_index = 0
    max_answers_count = 0
    answer_json = []
    answer_id = []
    answer_title = []
    answer_question_id = []
    question_answer_data = []
    response_answer_data = []

    # combine question and answers
    @survey.questions.all.each do |question|
      question_json[question_index] = question.as_json(only: [:id, :title, :question_type])
      question_id[question_index] = question_json[question_index]['id']
      question_title[question_index] = question_json[question_index]['title']
      question_type[question_index] = question_json[question_index]['question_type']
      question_answer_data.push(question_title[question_index])
      question_answer_data.push(question_type[question_index])
      question.answers.each do |answer|
        answer_json[answer_index] = answer.as_json(only: [:id, :title, :question_id])
        answer_id[answer_index] = answer_json[answer_index]['id']
        answer_title[answer_index] = answer_json[answer_index]['title']
        answer_question_id[answer_index] = answer_json[answer_index]['question_id']
        if answer_question_id[answer_index] == question_id[question_index]
          question_answer_data.push(answer_title[answer_index])
        end
        answer_index += 1
      end
      if max_answers_count < answer_index
        max_answers_count = answer_index
      end
      question_answer_data.push('===========================')
      question_index += 1
    end
    @questionAnswerDatas = question_answer_data

    # deal with responses  
    responses_count = @survey.responses.all.count
    responses = @survey.responses.all
    response_index = 0
    response_json = []
    response_id = []
    response_answers = []

    @survey.responses.all.each do |response|
      response_json[response_index] = response.as_json(only: [:id, :answers])
      response_id[response_index] = response_json[response_index]['id']
      response_answers[response_index] = response_json[response_index]['answers']

      question_index = 0
      while question_index < questions_count
        question_id_string = question_id[question_index].to_s
        current_response_answers = response_answers[response_index][question_id_string]

        # 改switch case
        if question_type[question_index] == 'multiple_choice'
          current_response_answers.delete('0')
          current_response_answers.each do |current_response_answer|
            answer_index = 0
            while answer_index < max_answers_count
              if current_response_answer == answer_id[answer_index].to_s
                response_answer_data.push(answer_title[answer_index])
              end
              answer_index += 1
            end
          end
        end
        if question_type[question_index] == 'single_choice'
          answer_index = 0
          while answer_index < max_answers_count
            if current_response_answers == answer_id[answer_index].to_s
              response_answer_data.push(answer_title[answer_index])
            end
            answer_index += 1
          end
        end
        if question_type[question_index] == 'long_answer'
          response_answer_data.push(current_response_answers)
        end

        question_index += 1
      end

      response_answer_data.push('===========================')
    end

    @responsesCount = responses_count
    @responseAnswerDatas = response_answer_data

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
