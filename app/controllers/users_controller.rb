class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    drew = User.find(3)
    render json: drew
  end

  def create
    newbet = Bet.new(bet_amount: params[:bet_amount], end: params[:end])
    newbet.save
    render json: newbet, status: :created
  end

  def new
    url = request.original_url
    user = parse_user(send_response(url))
    new_user = User.create(user)
    p new_user
  end

  private

  def parse_user(response)
    user = {}
    user["access_token"] = response["access_token"]
    user["email"] = response["user"]["email"]
    user["first_name"] = response["user"]["first_name"]
    user["last_name"] = response["user"]["last_name"]
    user["username"] = response["user"]["username"]
    user["venmo_id"] = response["user"]["id"]
    return user
  end

  def send_response(url)
    authorization_code = url[47..-1]
    response = HTTParty.post("https://api.venmo.com/v1/oauth/access_token",
      :body => { :client_id => ENV["VENMO_ID"],
                 :client_secret => ENV["VENMO_SECRET"],
                 :code => "#{authorization_code}"
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'} )
    return response
  end

end
