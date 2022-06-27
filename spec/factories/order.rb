FactoryBot.define do
  factory :order do
    association :user
    title { Faker::Lorem.word }
  end
end
