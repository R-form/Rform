class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :status
      t.string :name
      t.integer :amount
      t.string :email
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
