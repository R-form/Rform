class AddQuestionRequiredDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :questions, :required, "false"
    change_column_default :surveys, :theme, "brightRed"
    change_column_default :surveys, :background_color, "softRed"
  end
end
