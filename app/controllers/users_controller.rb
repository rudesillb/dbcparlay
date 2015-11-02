include UsersHelper
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @bets = User.find(1).bets
    @inverse_bets = User.find(1).inverse_bets


    render json: drew
  end

  def new
    url = request.original_url
    user = parse_user(send_response(url))
    if User.find_by(:venmo_id => user[:venmo_id]) != nil
      login(user)
    else
      User.create(user)
      login(user)
    end
    user = {}
  end

  def destroy
    logout
  end

end
