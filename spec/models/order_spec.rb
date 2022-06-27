require 'rails_helper'

RSpec.describe 'Order', type: :model do
  it '訂單未付費，當前使用者狀態為free' do
    user = FactoryBot.create(:user)
    Order.create(status: 0, user_id: user.id)
    expect(user.status).to eq 'free'
  end

  it '訂單已付費，當前使用者狀態為pro' do
    user = FactoryBot.create(:user)
    Order.create(status: 1, user_id: user.id)
    expect(user.status).to eq 'pro'
  end

  it '訂單取消，當前使用者狀態為free' do
    user = FactoryBot.create(:user)
    Order.create(status: 2, user_id: user.id)
    expect(user.status).to eq 'free'
  end
end
