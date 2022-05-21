class AddStatusToSurvey < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :status, :string
  end
end
