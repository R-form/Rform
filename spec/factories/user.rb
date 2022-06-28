FactoryBot.define do
  factory :user do
    id { Faker::Number.number(digits: 2) }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password }
    password_confirmation { password }
  end
end
