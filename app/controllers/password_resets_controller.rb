class PasswordResetsController < ApplicationController
    
  def create 
    @user = User.find_by_email(params[:email])    
    @user.deliver_reset_password_instructions! if @user
    redirect_to(root_path, notice: '忘記密碼的指示已經送到email內')
  end
    
  def edit
    @token = params[:id]
    @user = User.load_from_reset_password_token(@token)

    if @user.blank?
      not_authenticated
      return
    end
  end

  def update
    user = User.load_from_reset_password_token(params[:id])

    if user.blank?
      not_authenticated
      return
    end

    user.password_confirmation = params[:user][:password_confirmation]
    if user.change_password(params[:user][:password])
      redirect_to(root_path, :notice => '密碼成功更新')
    else
      render :action => "edit"
    end
  end
  
end
