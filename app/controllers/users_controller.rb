include UsersHelper
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :autheticate



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
