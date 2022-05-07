class AddPositionToQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :position, :integer
  end
end

