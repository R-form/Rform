require 'rails_helper'

RSpec.describe Survey, type: :model do
  let(:user) { FactoryBot.create(:user) }

  describe 'create, update, destroy' do
    it '使用者可以建立問卷' do
      # arrange :user
      # act
      survey = user.surveys.create
      # assert
      expect(survey.user_id).to eq user.id
    end

    it '使用者可以建立多個問卷' do
      2.times { user.surveys.create }
      expect(user.surveys.count).to eq 2
    end

    it '使用者可以修改問卷' do
      survey = user.surveys.create
      survey.update(title: 'ChangeME')
      expect(survey.title).to eq 'ChangeME'
    end

    it '使用者可以刪除問卷' do
      survey = user.surveys.create
      survey.destroy
      expect(survey ? 'true' : 'false')
    end
  end
end
