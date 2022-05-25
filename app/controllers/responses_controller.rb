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
    @response = @survey.responses.new(response_params)

    if @response.save
      redirect_to submitted_survey_responses_path(@survey)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def submitted
    
  end

  def data
    responses = @survey.responses
    answers = Array.new
    header = Array.new
    answers = responses.map {|r| r.answers}
    trans_answers = answers.each { |a|
      a.transform_keys!{ |k|
        Question.find(k).title
      }
      a.transform_values!{ |v| 
        (Answer.find_by(id: v) && Question.find_by(id: Answer.find_by(id: v).question_id).question_type.to_i < 3) ? Answer.find(v).title : v 
      }
    }
    qq = trans_answers.flat_map(&:keys).uniq

    @result  = CSV.generate do |csv|
      headers = ["id"] + qq
      csv << headers
      answers.each.with_index do |a,i|
        row =   a.values_at(*headers)
        row[0] = i
        csv <<  row
      end 
    end

    respond_to do |format|
      format.html 
      format.csv {send_data @result}
    end
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
