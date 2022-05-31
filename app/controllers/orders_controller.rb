class OrdersController < ApplicationController
    include HTTParty
    before_action :set_user, except: [:update, :done]
    
    base_uri 'https://ccore.newebpay.com/MPG/mpg_gateway'

    def index
        order = @user.orders.create(name: "plan_pro", email: @user.email, amount: 100)
        @return_url = "#{request.protocol}#{request.host_with_port}#{orders_done_path}"
        @notify_url = "#{request.protocol}#{request.host_with_port}#{orders_update_path}"
        @form_info = Newebpay::Mpg.new(order).form_info    
        # render html: [@return_url,@notify_url, @form_info]
    end
        
    def create
    end
    
    def update
        response = Newebpay::MpgResponse.new(params[:TradeInfo])
        order = Orders.max
        order.update(ps: response)
    end
    
    def done
        
    end
    
    private
    def set_user
      @user = User.find(params[:user_id])
    end

end