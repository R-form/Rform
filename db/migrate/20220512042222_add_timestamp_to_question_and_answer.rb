class AddTimestampToQuestionAndAnswer < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :timestamp, :string
    add_column :answers, :timestamp, :string
  end
end
