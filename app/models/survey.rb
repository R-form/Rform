class Survey < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :responses, dependent: :destroy
  accepts_nested_attributes_for :questions, allow_destroy: true
  
  belongs_to :user


  default_scope {where(deleted_at: nil)}

  def destroy
    update(deleted_at: Time.current)
  end
end
