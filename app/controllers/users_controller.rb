include UsersHelper
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    # login('sfdfsd')
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

  def logout
    destroy_session
    redirect_to '/'
  end

  def check
    # if current_user
    #   ok = true
    # else
    #   ok = false
    # end
    ok = true
    render json: ok
  end
end
