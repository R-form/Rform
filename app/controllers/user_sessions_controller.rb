# frozen_string_literal: true

class UserSessionsController < ApplicationController
  before_action :require_login, only: [:destroy]

  def create
    @user = login(params[:email], params[:password])

    if @user
      redirect_back_or_to(surveys_path, notice: '登入成功')
    else
      redirect_to new_user_sessions_path, alert: "登入失敗"
    end
  end

  def destroy
    logout
    redirect_to(root_path, notice: '登出成功!')
  end
end
