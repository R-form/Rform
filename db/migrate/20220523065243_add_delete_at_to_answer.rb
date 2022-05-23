class AddDeleteAtToAnswer < ActiveRecord::Migration[6.1]
  def change
    add_column :answers, :deleted_at, :datetime, index: true
  end
end
