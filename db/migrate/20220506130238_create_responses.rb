# frozen_string_literal: true

class CreateResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :responses do |t|
      t.belongs_to :survey, null: false, foreign_key: true
      t.json :answers

      t.timestamps
    end
  end
end
