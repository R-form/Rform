class AddPositionToSurvey < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :position, :integer
  end
end
