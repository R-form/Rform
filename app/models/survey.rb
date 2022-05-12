# frozen_string_literal: true

class Survey < ApplicationRecord
  belongs_to :user
  acts_as_list scope: :user
  has_many :responses, dependent: :destroy
  has_many :questions, -> { order(position: :asc) }, dependent: :destroy, autosave: true
  accepts_nested_attributes_for :questions, allow_destroy: true
  acts_as_paranoid
end
