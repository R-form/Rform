require 'rails_helper'

RSpec.describe User  do
    let(:user) { FactoryBot.create(:user) }

    it '未付費會員狀態' do
        expect(user.status).to eq("free")
    end  

    it '已付費會員狀態' do
        user.orders.create(status: "paid")
        expect(user.status).to eq("pro")
    end

end
