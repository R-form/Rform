# frozen_string_literal: true

class Survey < ApplicationRecord
  extend FriendlyId
  acts_as_paranoid
  before_create :generate_slug
  acts_as_list scope: :user

  has_many :questions, -> { order(position: :asc) }, dependent: :destroy, autosave: true
  has_many :responses, dependent: :destroy
  belongs_to :user
  accepts_nested_attributes_for :questions, allow_destroy: true
  

  friendly_id :slug, use: :slugged
  belongs_to :user

  private 
  # Generates an 6 character alphanumeric id
  def generate_slug
    self.slug = SecureRandom.hex(3)
  end 

end
