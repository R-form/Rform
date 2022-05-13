class AddTagsToSurvey < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :tag, :string
  end
end
