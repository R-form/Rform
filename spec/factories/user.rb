FactoryBot.define do
  factory :user do
    Faker::Number.number(digits: 10)
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password }
    password_confirmation { password }
  end
end
