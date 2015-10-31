class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @bets = User.find(1).bets
    @inverse_bets = User.find(1).inverse_bets
    friends = []
    inverse_friends = []
    @bets.each do |bet|
      friends << bet.friendship.inverse_friend
    end

    @inverse_bets.each do |bet|
      inverse_friends << bet.friendship.user
    end

    render json: drew
  end

  # def create
  #   newbet = Bet.new(bet_amount: params[:bet_amount], end: params[:end])
  #   newbet.save
  #   render json: newbet, status: :created
  # end

  def new
    url = request.original_url
    authorization_code = url[47..-1]
    response = HTTParty.post("https://api.venmo.com/v1/oauth/access_token",
      :body => { :client_id => '3071',
                 :client_secret => '',
                 :code => "#{authorization_code}"
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'} )

    p "*" * 50
    p response
    p "*" * 50
  end

end
