class AddDeleteAtToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :deleted_at, :datetime, index: true
  end
end
