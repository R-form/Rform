# frozen_string_literal: true

class SurveysController < ApplicationController
  before_action :find_survey, except: %i[index new create]
  before_action :find_question, only: %i[question_sort]

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

  def sort
    @survey.insert_at(params[:newIndex].to_i)
  end

  def question_sort
    @question.insert_at(params[:newIndex].to_i)
    render json: params
  end

  # def add_question_item
  #   @survey.questions.create
  #   render json: params
  # end

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

  # def add_answer_item
  #   # @question.answers.create
  #   # @question = @survey.questions.find(params[:question_id])
  #   if @survey.questions.find(params[:question_id])

  #   elsif @survey.questions.find(params[:timestamp])

  #   else
  #     @question.answers.create
  #   end
  #   render json: params
  # end

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
    render json: params
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
      render json: params
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
    render json: params
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
