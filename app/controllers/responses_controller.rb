class ResponsesController < ApplicationController
  before_action :set_survey, except: :show
  before_action :set_response, only: %i[ edit update destroy ]

  def show
    @survey = Survey.includes(questions: :answers).find(params[:survey_id])
    @response = @survey.responses.find(params[:id])
  end

  def new
    @response = @survey.responses.new
  end

  def create
    render html: response_params
    # @response = @survey.responses.new(response_params)

    # if @response.save
    #   redirect_to [@survey, @response], notice: "Response was successfully created."
    # else
    #   render :new, status: :unprocessable_entity
    # end
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