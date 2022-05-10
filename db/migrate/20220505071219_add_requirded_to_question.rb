class AddRequirdedToQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :required, :boolean
  end
end
