FactoryBot.define do
    factory :user do
        email { Faker::Internet.email }
        password { "secret" }
        password_confirmation { "secret" }
        salt { salt = "asdasdastr4325234324sdfds" }
        crypted_password { Sorcery::CryptoProviders::BCrypt.encrypt("secret", salt) }
    end
end