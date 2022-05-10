# frozen_string_literal: true

class AddDeleteAtToQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :deleted_at, :datetime
  end
end
