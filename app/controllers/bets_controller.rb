include UsersHelper
class BetsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :autheticate


  def index
    @bets = User.find_by(venmo_id: session[:current_user_id]).bets
    @inverse_bets = User.find_by(venmo_id: session[:current_user_id]).inverse_bets
    @user = User.find_by(venmo_id: session[:current_user_id])

    render json: [@bets, @inverse_bets, @user.id]
  end

  def create
    user = User.find_by(venmo_id: session[:current_user_id])
    friend = User.find_by(username: params[:reciever])
    friendship = Friendship.where(friend_id: friend.id, user_id: user.id)
    newbet = friendship[0].bets.new(friendship_id: friendship[0].id, bet_amount: params[:bet_amount], description: params[:description], end: params[:end], creator: user.username, reciever: params[:reciever])
    if newbet.save
      # placeholder
    end
    render json: newbet, status: :created
  end

  def update
    bet = Bet.find(params[:id])
    #checking and registering votes
    if params[:user_vote]
      if params[:user_vote] == 'user'
        user = bet.friendship.user
        bet.update_attributes(user_vote: user.id)
      elsif params[:user_vote] == 'friend'
        user = bet.friendship.friend
        bet.update_attributes(user_vote: user.id)
      else
        bet.update_attributes(user_vote: '0')
      end
    elsif params[:friend_vote]
      if params[:friend_vote] == 'user'
        user = bet.friendship.user
        bet.update_attributes(friend_vote: user.id)
      elsif params[:friend_vote] == 'friend'
        user = bet.friendship.friend
        bet.update_attributes(friend_vote: user.id)
      else
        bet.update_attributes(friend_vote: '0')
      end
    end

    #check for winner
    if bet.user_vote && bet.friend_vote
      if bet.user_vote == bet.friend_vote
         bet.update_attributes(winner: bet.user_vote, status: 'outstanding')
      else
        bet.update_attributes(user_vote: nil, friend_vote: nil)
      end
    end

    render json: bet
  end

  def accept
    accepted_bet = Bet.find(params[:id])
    accepted_bet.update_attributes(status: 'active')
    render json: accepted_bet
  end

  def decline
    declined_bet = Bet.find(params[:id])
    declined_bet.destroy
    # rendering nothing here
    render json: declined_bet
  end

  def pay
    bet = Bet.find(params[:id])
    if valid_bet?(bet)
      pay_winner(bet)
      bet.update_attributes(status: 'complete')
    end
    render json: bet
  end

end
