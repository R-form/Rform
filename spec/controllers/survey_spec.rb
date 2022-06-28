require 'rails_helper'

RSpec.describe SurveysController do
  before :each do
    @user = FactoryBot.create(:user)
    login_user
  end

  it '登入使用者可以載入index頁面' do
    get :index
    expect(response).to render_template(:index)
  end

  it '未付費使用者不能建超過三個問卷' do
    4.times { get :new }
    expect(@user.surveys.count).not_to eq 4
  end

  it '付費使用者可建超過三個問卷' do
    @user.orders.create(status: 'paid')
    4.times { get :new }
    expect(@user.surveys.count).to eq 4
  end
end
