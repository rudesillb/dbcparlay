class BetsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @bets = User.find(1).bets
    # @inverse_bets =
    render json: @bets
  end

  def create
    p params
    newbet = Bet.new(bet_amount: params[:bet_amount], end: params[:end])
    newbet.save
    render json: newbet, status: :created
  end




end
