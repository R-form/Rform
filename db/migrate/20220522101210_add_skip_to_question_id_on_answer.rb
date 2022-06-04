class AddSkipToQuestionIdOnAnswer < ActiveRecord::Migration[6.1]
  def change
    add_column :answers, :skip_to_question_id, :integer
  end
end
