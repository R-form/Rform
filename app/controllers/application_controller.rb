# frozen_string_literal: true

class ApplicationController < ActionController::Base

  private

  def not_authenticated
    redirect_to new_user_session_path, alert: 'Please login first'
  end
end
