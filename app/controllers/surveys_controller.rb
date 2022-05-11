class SurveysController < ApplicationController
  before_action :find_survey, only: %i[show edit update destroy duplicate_survey] 

  def index
    @surveys = @current_user.surveys
  end

  def show; end

  def new
    @survey = Survey.new
  end

  def edit; end

  def create
    @survey = current_user.surveys.new(survey_params)
    if @survey.save
      redirect_to survey_path(@survey), notice: "新增問卷成功"
    else
      render :new
    end
  end

  def update
    if @survey.update(survey_params)
      redirect_to survey_path(@survey), notice: "修改成功"
    else
      render :edit
    end
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
        :required,
        { answers_attributes: %i[
          _destroy
          id
          title
        ] }
      ]
    )
  end
end
