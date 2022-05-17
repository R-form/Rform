class AddStyleToSurvey < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :font_style, :string, foreign_key: true
    add_column :surveys, :theme, :string, foreign_key: true
  end
end
