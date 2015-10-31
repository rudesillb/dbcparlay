class BidsController < ApplicationController

  def create
    newbet = Bet.new(bet_amount: params[:bet_amount], end: params[:end])
    newbet.save
    render json: newbet, status: :created
  end
end
