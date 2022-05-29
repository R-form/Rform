class OrdersController < ApplicationController
    include HTTParty
    before_action :set_user
    
    base_uri 'https://ccore.newebpay.com/MPG/mpg_gateway'

    def index
        order = @user.orders.create(name: "plan_pro", email: @user.email, amount: 100)
        @return_url = "#{request.protocol}#{request.host}#{orders_done_path}"
        @notify_url = "#{request.protocol}#{request.host}#{orders_update_path}"
        @form_info = Newebpay::Mpg.new(order).form_info    
    end
        
    def create
    end
    
    def update
        
    end
    
    def done
        
    end
    
    private
    def set_user
      @user = User.find(params[:user_id])
    end

end