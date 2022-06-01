class OauthsController < ApplicationController
      
  def provider
    login_at(params[:provider])
  end
      
  def callback
    provider = params[:provider]
    if @user = login_from(provider)
      redirect_to root_path, notice: "登入從 #{provider.titleize}!"
    else
      begin
        @user = create_from(provider)

        reset_session
        auto_login(@user)
        redirect_to root_path, notice: "登入從 #{provider.titleize}!"
      rescue
        redirect_to root_path, alert: "登入 #{provider.titleize} 失敗!"
      end
    end
  end
end