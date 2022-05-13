# frozen_string_literal: true

class UserSessionsController < ApplicationController
  before_action :require_login, only: [:destroy]
  def create
    @user = login(params[:email], params[:password])

    if @user
      redirect_back_or_to(surveys_path, notice: 'Login successful')
    else
      flash.now[:alert] = 'Login failed'
      render action: 'new'
    end
  end

  def destroy
    logout
    redirect_to(root_path, notice: 'Logged out!')
  end
end
