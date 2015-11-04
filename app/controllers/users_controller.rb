include UsersHelper
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
     url = request.original_url
    user = parse_user(send_response(url))
    if User.find_by(:venmo_id => user[:venmo_id]) != nil
      # user[:access_token] = response["access_token"]
      login(user)
      get_friends(user)
    else
      User.create(user)
      login(user)
      get_friends(user)
    end
    user = {}
    redirect_to '/'
  end

  def destroy
    logout
  end

  def check
    if current_user != nil
      render json: 1
    else
      render json: nil
    end
  end
end
