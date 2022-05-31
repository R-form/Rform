class AddDefaultToSurveysStatus < ActiveRecord::Migration[6.1]
  def change
    change_column :surveys, :status, :string, default: "published"
  end
end
