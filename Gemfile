# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.5'

gem 'acts_as_list', '~> 1.0'
gem 'jbuilder', '~> 2.7'
gem 'paranoia', '~> 2.1', '>= 2.1.5'
gem 'pg', '~> 1.1'
gem "puma", ">= 5.6.4"
gem 'rails', '~> 6.1.5', '>= 6.1.5.1'
gem 'sass-rails', '>= 6'
gem 'sorcery', '~> 0.16.3'
gem 'turbolinks', '~> 5'
gem 'webpacker', '~> 5.0'
gem 'deep_cloneable', '~> 3.2.0'
gem 'friendly_id', '~> 5.0.0'
gem 'caxlsx', '~> 3.2'
gem 'caxlsx_rails', '~> 0.6.3'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
gem 'image_processing', '~> 1.2'
# gem 'aws-sdk', '~> 2'
gem "aws-sdk-s3", require: false
gem 'bootsnap', '>= 1.4.4', require: false
gem 'rubocop', '~> 1.28', '>= 1.28.2'
gem 'dotenv', '~> 2.7', '>= 2.7.6'
group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'foreman', '~> 0.87.2'
  gem 'listen', '~> 3.3'
  gem 'web-console', '>= 4.1.0'
  gem 'omniauth', '~> 2.1'
  gem 'omniauth-google-oauth2', '~> 1.0', '>= 1.0.1'
  gem 'figaro', '~> 1.2'
  gem 'letter_opener', '~> 1.8', '>= 1.8.1'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '>= 4.0.0.rc1'
  gem 'webdrivers', '~> 5.0'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem "font_awesome5_rails", "~> 1.5"
