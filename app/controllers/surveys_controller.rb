class SurveysController < ApplicationController
  before_action :find_survey, only: %i[show edit update destroy]

  def index
    @surveys = Survey.all
  end

  def show; end

  def new
    @survey = Survey.new
  end

  def edit; end

  def create
    @survey = Survey.new(survey_params)

    # respond_to do |format|
      if @survey.save
        # format.html { redirect_to survey_url(@survey), notice: 'survey was successfully created.' }
        # format.json { render :show, status: :created, location: @survey }
        redirect_to survey_path(@survey), notice: "新增問卷成功"
      else
        render :new
        # format.html { render :new, status: :unprocessable_entity }
        # format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    # end
  end

  def update
    # respond_to do |format|
      if @survey.update(survey_params)
        # format.html do
        #   redirect_to survey_path(@survey), notice: 'survey was successfully updated.'
        # end
        # format.json { render :show, status: :ok, location: @survey }
        redirect_to survey_path(@survey), notice: "修改成功"
      else
        # format.html { render :edit, status: :unprocessable_entity }
        # format.json { render json: @survey.errors, status: :unprocessable_entity }
        render :edit
      end
    # end
  end

  def destroy
    @survey.destroy

    redirect_to surveys_path, notice: '問卷已刪除'
    # respond_to do |format|
    #   format.html { redirect_to surveys_url, notice: '問卷已刪除' }
    #   format.json { head :no_content }
    # end
  end

  private

  def find_survey
    @survey = Survey.find(params[:id])
  end

  def survey_params
    params.require(:survey).permit(
      :title,
      :description,
      questions_attributes: [
        :_destroy,
        :id,
        :question_type,
        :title,
        { answers_attributes: %i[
          _destroy
          id
          title
        ] }
      ]
    )
  end
end
