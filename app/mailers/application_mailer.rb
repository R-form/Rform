# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'rform@rform.com'
  layout 'mailer'
end
