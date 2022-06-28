require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.create(:user) }

  it '未建立訂單，當前使用者狀態為free' do
    expect(user.status).to eq 'free'
  end

  it '已建立訂單並且付費，當前使用者狀態為pro' do
    Order.create(status: 'paid', user_id: user.id)
    expect(user.status).to eq 'pro'
  end
end
