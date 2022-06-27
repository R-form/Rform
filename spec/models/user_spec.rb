require 'rails_helper'

RSpec.describe 'User', type: :model do
  let(:current_user) { FactoryBot.create(:user) }

  it '未建立訂單，當前使用者狀態為free' do
    expect(current_user.status).to eq 'free'
  end

  it '已建立訂單並且付費，當前使用者狀態為pro' do
    Order.create(status: 'paid', user_id: current_user.id)
    expect(current_user.status).to eq 'pro'
  end
end
