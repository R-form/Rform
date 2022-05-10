class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :title
      t.integer :question_type
      t.belongs_to :survey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
