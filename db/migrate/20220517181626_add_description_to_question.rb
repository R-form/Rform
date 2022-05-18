class AddDescriptionToQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :description, :string
  end
end
