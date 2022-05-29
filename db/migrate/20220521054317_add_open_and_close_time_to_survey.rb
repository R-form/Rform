class AddOpenAndCloseTimeToSurvey < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :opentime, :datetime, default: -> { 'NOW()' }
    add_column :surveys, :closetime, :datetime
  end
end
