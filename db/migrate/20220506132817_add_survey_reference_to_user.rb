class AddSurveyReferenceToUser < ActiveRecord::Migration[6.1]
  def change
    add_reference :surveys, :user, index: true, foreign_key: true
  end
end
