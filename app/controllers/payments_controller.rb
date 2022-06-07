class PaymentsController < ApplicationController
    def notify_response
        response = Newebpay::MpgResponse.new(params[:TradeInfo])
    end
end