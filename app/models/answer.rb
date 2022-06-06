# frozen_string_literal: true

class Answer < ApplicationRecord
  belongs_to :question
  acts_as_paranoid
  has_one_attached :answerimg

  # 委派
  delegate :question_type, to: :question
end
