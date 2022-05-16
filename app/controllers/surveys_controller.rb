# frozen_string_literal: true

class SurveysController < ApplicationController
  before_action :find_survey, except: %i[index new create ]

  def index
    @surveys = current_user.surveys
  end

  def show; end

  def new
    @survey = Survey.new
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

  def survey_title
    @survey.update(title: params[:survey_title])
  end

  def survey_description
    @survey.update(description: params[:survey_description])
  end

  def add_question
    if params[:timestamp]
      if @survey.questions.find_by(timestamp: params[:timestamp])
        @question = @survey.questions.find_by(timestamp: params[:timestamp])
        @question.update(title: params[:question_value])
      else
        @question = @survey.questions.create
        @question.update(timestamp: params[:timestamp],title: params[:question_value])
      end
    else 
      @question = @survey.questions.find(params[:question_id])
      @question.update(title: params[:question_value])
    end
  end

  def save_checkbox
    if params[:timestamp]
      if @survey.questions.find_by(timestamp: params[:timestamp])
        @question = @survey.questions.find_by(timestamp: params[:timestamp])
        @question.update(required: !@question.required)
      else
        @question = @survey.questions.create
        @question.update(timestamp: params[:timestamp],required: !@question.required)
      end
    else 
      @question = @survey.questions.find(params[:question_id])
      @question.update(required: !@question.required)
    end
  end

  def add_answer

    if params[:timestamp]
      if @survey.questions.find_by(timestamp: params[:timestamp])
        @question = @survey.questions.find_by(timestamp: params[:timestamp])
        answer = @question.answers.create(title: params[:answer_value]) 
      else
        @question = @survey.questions.create
        @question.update(timestamp: params[:timestamp])
        answer = @question.answers.create(title: params[:answer_value]) 
      end
    elsif params[:question_id]
      @question = @survey.questions.find(params[:question_id])
      if params[:answer_timestamp]
        answer = @question.answers.create
        answer.update(timestamp: params[:answer_timestamp],title: params[:answer_value])
      elsif params[:answer_id]
        answer = @question.answers.find(params[:answer_id])
        answer.update(title: params[:answer_value])
      end
    end
  end

  def update_select
    if params[:timestamp]
      if @survey.questions.find_by(timestamp: params[:timestamp])
        @question = @survey.questions.find_by(timestamp: params[:timestamp])
        @question.update(question_type: params[:select])
      else
        @question = @survey.questions.create
        @question.update(timestamp: params[:timestamp],question_type: params[:select])
      end
    else 
      @question = @survey.questions.find(params[:question_id])
      @question.update(question_type: params[:select])
    end
  end

  def remove_question
    if params[:timestamp]
      @question = @survey.questions.find_by(timestamp: params[:timestamp])
      @question.destroy
    else 
      @question = @survey.questions.find(params[:question_id])
      @question.destroy
    end
  end

  def remove_answer
    if params[:question_id]
      @question = @survey.questions.find(params[:question_id])
      if params[:answer_id]
        answer = @question.answers.find(params[:answer_id])
        answer.destroy
      end
    end
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
      questions_attributes: [
        :_destroy,
        :id,
        :question_type,
        :title,
        :required,
        :position,
        { answers_attributes: %i[
          _destroy
          id
          title
        ] }
      ]
    )
  end
end
