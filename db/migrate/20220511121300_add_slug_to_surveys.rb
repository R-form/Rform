class AddSlugToSurveys < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :slug, :string
    add_index :surveys, :slug, unique: true
  end
end
