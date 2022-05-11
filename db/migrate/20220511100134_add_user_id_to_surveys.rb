class AddUserIdToSurveys < ActiveRecord::Migration[6.1]
  def change
    add_reference :surveys, :user, null: false, foreign_key: true
  end
end
