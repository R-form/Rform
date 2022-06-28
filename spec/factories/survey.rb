FactoryBot.define do
  factory :survey do
    association :user
    title { Faker::Lorem.word }
  end
end
