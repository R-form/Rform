# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :survey, autosave: true
  has_many :answers, dependent: :destroy
  accepts_nested_attributes_for :answers, allow_destroy: true

  acts_as_paranoid
  acts_as_list scope: :survey

  enum question_type: { single_choice: 0, multiple_choice: 1, long_answer: 2, satisfaction: 3, date: 4, time: 5,
                        drop_down_menu: 6, range: 7, file: 8, image: 9 }

  def self.question_type_select
    question_types.keys.map { |k| [k.titleize, k] }
  end
end
