class AddDefaultValueToThemeAndBgColor < ActiveRecord::Migration[6.1]
  def change
    change_column_default :surveys, :theme, "#8E354A"
    change_column_default :surveys, :background_color, "#DC9FB4"
  end
end