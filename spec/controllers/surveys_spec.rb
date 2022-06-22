require 'rails_helper'

RSpec.describe SurveysController do
    before(:each) do
        @user = FactoryBot.create(:user)
        login_user
    end

    context "正常網站使用情況下新增問卷" do
        it '會員可以建立問卷' do
            1.times {get :new}
            expect(@user.surveys.count).to eq(1)
        end
        
        it '免費會員不能建超過三個問卷' do
            4.times {get :new}
            expect(@user.surveys.count).not_to eq(4)
        end
        
        it '付費會員能建超過三個問卷' do
            @user.orders.create(status: "paid")
            4.times {get :new}
            expect(@user.surveys.count).to eq(4)
        end
    end

    context "非正常瀏覽網站情況下建立問卷" do
        it '會員可以建立問卷' do
            1.times {@user.surveys.create}
            expect(@user.surveys.count).to eq(1)
        end
        
        it '免費會員不能建超過三個問卷' do
            4.times {@user.surveys.create}
            expect(@user.surveys.count).not_to eq(4)
        end
        
        it '付費會員能建超過三個問卷' do
            @user.orders.create(status: "paid")
            4.times {@user.surveys.create}
            expect(@user.surveys.count).to eq(4)
        end
    end
    

end
