class Survey < ApplicationRecord
<<<<<<< Updated upstream
  has_many :questions, dependent: :destroy, autosave: true
  has_many :responses, dependent: :destroy
  accepts_nested_attributes_for :questions, allow_destroy: true
  
  belongs_to :user


=======
  extend FriendlyId
  before_create :generate_slug
  has_many :questions, dependent: :destroy
  has_many :responses, dependent: :destroy
  accepts_nested_attributes_for :questions, allow_destroy: true
  
  friendly_id :slug, use: :slugged
>>>>>>> Stashed changes
  default_scope {where(deleted_at: nil)}

  def destroy
    update(deleted_at: Time.current)
  end

  # def to_param
  #   self.permalink
  # end
  private 
  # Generates an 8 character alphanumeric id
  def generate_slug
    self.slug = SecureRandom.hex(3)
  end 
end
