class AddOpenAndCloseTimeToSurvey < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :opentime, :Time, default: Time.now
    add_column :surveys, :closetime, :Time
  end
end
