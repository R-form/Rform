# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :survey, autosave: true
  has_many :answers, dependent: :destroy
  has_one_attached :image
  
  accepts_nested_attributes_for :answers, allow_destroy: true

  acts_as_paranoid
  acts_as_list scope: :survey

  enum question_type: { 單選題: 0, 多選題: 1, 問答題: 2, 滿意度: 3, 日期: 4, 時間: 5, 下拉選單: 6, 範圍: 7, 檔案: 8 }

  def self.question_type_select
    question_types.keys.map { |k| [k, k] }
  end
end
