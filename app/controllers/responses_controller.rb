class ResponsesController < ApplicationController
  before_action :set_survey, except: :show
  before_action :set_response, only: %i[ edit update destroy ]

  def show
    @survey = Survey.includes(questions: :answers).find(params[:survey_id])
    @response = @survey.responses.find(params[:id])
  end

  def new
    if @survey.published? && @survey.opentime <= Time.now && @survey.closetime > Time.now || @survey.closetime == nil
      @response = @survey.responses.new
    else
      redirect_to submitted_survey_responses_path(@survey)
    end
  end

  def create
    @response = @survey.responses.new(response_params)

    if @response.save
      redirect_to submitted_survey_responses_path(@survey)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def submitted
  end

  private
  def set_survey
    @survey = Survey.find(params[:survey_id])
  end

  def set_response
    @response = @survey.responses.find(params[:id])
  end

  def response_params
    params.require(:response).permit(:survey_id, answers: {})
  end

end
