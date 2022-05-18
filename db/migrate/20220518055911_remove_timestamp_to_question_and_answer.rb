class RemoveTimestampToQuestionAndAnswer < ActiveRecord::Migration[6.1]
  def change
    remove_column :questions, :timestamp, :string
    remove_column :answers, :timestamp, :string
  end
end
