class BetsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @bets = User.find(1).bets
    p @bets
    @inverse_bets = User.find(1).inverse_bets

    # @friends = []
    # @inverse_friends = []
    # @bets.each do |bet|
    #   @friends << bet.friendship.friend
    # end

    # @inverse_bets.each do |bet|
    #   @inverse_friends << bet.friendship.user
    # end



    render json: [@bets, @inverse_bets]
  end

  def create

    p params
    user = User.find(1)
    # friend = User.find_by(params[:email])
    # user.friendship.where(friend_id: friend.id)
    newbet = user.friendships.first.bets.new(friendship_id: 1, bet_amount: params[:bet_amount], description: params[:description], end: params[:end], creator: "#{user.first_name} #{user.last_name}", reciever: params[:reciever])
    if newbet.save
      p "*"*1000
    end
    render json: newbet, status: :created
  end

  def update
    #bet = Bet.find(params[:id])
    #User.find_by() <-- find by data from declareWinner function
    #bet.update_attributes(winner:)
  end
end
