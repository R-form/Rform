class AddBackgroundColorToSurvey < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :background_color, :string, foreign_key: true
  end
end
