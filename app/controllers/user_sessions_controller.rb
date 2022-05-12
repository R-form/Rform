class UserSessionsController < ApplicationController
  before_action :require_login, only: [:destroy]
  def create
    @user = login(params[:email], params[:password])

    if @user
      redirect_back_or_to(:users, notice: 'Login successful')
      # 改成轉址到問卷
    else
      flash.now[:alert] = 'Login failed'
      render action: 'new'
    end
  end

  def destroy
    logout
    redirect_to(:users, notice: 'Logged out!')
  end
end
