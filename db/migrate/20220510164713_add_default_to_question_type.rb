class AddDefaultToQuestionType < ActiveRecord::Migration[6.1]
  def change
    change_column :questions, :question_type, :integer, default: 0
  end
end
