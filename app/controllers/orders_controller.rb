class OrdersController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:update, :done]
    before_action :set_user, except: [:update, :done]

    def index
      if current_user.status == "free"
        order = @user.orders.create(status: 0, name: "plan_pro", email: @user.email, amount: 100)
        @form_info = Newebpay::Mpg.new(order).form_info    
      end
    end
        
    def create
    end
    
    def update
        response = Newebpay::Mpgresponse.new(params[:TradeInfo])
        if response.success?
        order = Order.find_by(slug: response.order_no)
        order.update(status: 1)
        end
    end
    
    def done
        response = Newebpay::Mpgresponse.new(params[:TradeInfo])
        if response.success?
          redirect_to user_orders_path(user_id: Order.find_by(slug: response.order_no).user.id)
        else
          render html: "付款失敗"
        end
    end
    
    private
    def set_user
      @user = User.find(params[:user_id])
    end

end