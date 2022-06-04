# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :require_login, only: %i[show edit update destroy] 
  def index

  end

  def show
    redirect_to(surveys_path, notice: '登入成功')
  end

  def new
    @user = User.new
  end

  def edit
    
  end

  def create
    @user = User.new(user_params)
      if @user.save
        login_user = login(user_params[:email], user_params[:password])
        if login_user
          redirect_back_or_to(surveys_path, notice: '登入成功')
        else
          flash.now[:alert] = '登入失敗'
          render action: 'new'
        end
      else
        respond_to do |format|
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if current_user.update(user_params)
        format.html { redirect_to users_url(current_user), notice: '使用者成功更新' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, notice: '使用者成功刪除' }
    end
  end

  private

    def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
