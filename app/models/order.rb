class Order < ApplicationRecord
  extend FriendlyId
  before_create :generate_slug
  belongs_to :user
  friendly_id :slug, use: :slugged
  enum status: { pending: 0, paid: 1, canceled: 2 }

  private 
  # Generates an 6 character alphanumeric id
  def generate_slug
    self.slug = SecureRandom.hex(3)
  end 
end
