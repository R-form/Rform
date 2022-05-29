# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :require_login, only: %i[show edit update destroy] 
  def index

  end

  def show
    redirect_to(surveys_path, notice: 'Login successful')
  end

  def new
    @user = User.new
  end

  def edit
    @user = current_user
  end

  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to users_url(@user), notice: 'User was successfully created.' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if current_user.update(user_params)
        format.html { redirect_to users_url(current_user), notice: 'User was successfully updated.' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
    end
  end

  private

    def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
