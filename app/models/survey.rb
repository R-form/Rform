# frozen_string_literal: true

class Survey < ApplicationRecord
  extend FriendlyId
  include AASM

  aasm column: "status" do
    state :published, initial: true
    state :draft, :closed

    event :publish do
      transitions from: [:draft], to: :published
    end

    event :close do
      transitions from: [:published], to: :closed
    end
  end

  before_create :generate_slug
  after_find do |survey|
    if survey.published? && survey.closetime? && Time.now >= survey.closetime
      survey.close
    end 
  end

  belongs_to :user
  friendly_id :slug, use: :slugged
  
  has_many :questions, -> { order(position: :asc) }, dependent: :destroy
  has_many :responses, dependent: :destroy
  has_one_attached :image
  
  accepts_nested_attributes_for :questions, allow_destroy: true
  acts_as_paranoid
  acts_as_list scope: :user

  def publish_opening_time
    self.published? && self.opentime <= Time.now && self.closetime == nil || self.published? && self.opentime <= Time.now && self.closetime > Time.now
  end

  
  private 
  # Generates an 6 character alphanumeric id
  def generate_slug
    self.slug = SecureRandom.alphanumeric(6)
  end 
  
  def self.all_status
    [
      %w[發佈 published],
      %w[草稿 draft],
      %w[關閉 closed]
    ]
  end

end
