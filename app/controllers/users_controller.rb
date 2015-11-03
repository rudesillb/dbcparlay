include UsersHelper
class UsersController < ApplicationController
<<<<<<< HEAD
  # skip_before_action :verify_authenticity_token
  before_action :authenticate

=======
  skip_before_action :verify_authenticity_token
>>>>>>> fc215f1888e5dc1eda8cc1fef6cc59f1ae261125

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
  end

  def destroy
    logout
  end

  private

  def authenticate
    p current_user
    if !current_user
      redirect_to "https://api.venmo.com/v1/oauth/authorize?client_id=3073&scope=make_payments%20access_profile%20access_email%20access_phone%20access_friends%20access_balance&response_type=code"
    end
  end

end
