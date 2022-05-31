class AddColumnToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :resp, :string
  end
end
