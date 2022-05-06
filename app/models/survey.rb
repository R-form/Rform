class Survey < ApplicationRecord
  has_many :questions, dependent: :destroy
  belongs_to :user
  acts_as_list scope: :user
  has_many :responses, dependent: :destroy
  accepts_nested_attributes_for :questions, allow_destroy: true
  acts_as_paranoid
  
end
