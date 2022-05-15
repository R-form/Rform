# frozen_string_literal: true

class Survey < ApplicationRecord
  extend FriendlyId
  before_create :generate_slug
  belongs_to :user
  
  friendly_id :slug, use: :slugged
  has_many :responses, dependent: :destroy
  has_many :questions, -> { order(position: :asc) }, dependent: :destroy, autosave: true
  has_one_attached :image

  accepts_nested_attributes_for :questions, allow_destroy: true
  acts_as_paranoid
  acts_as_list scope: :user

  private 
  # Generates an 6 character alphanumeric id
  def generate_slug
    self.slug = SecureRandom.hex(3)
  end 

end
