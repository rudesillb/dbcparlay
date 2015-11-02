include UsersHelper
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :autheticate

  def index
    debugger
    cookies[:notworking] = 'explain yourself'
  end

  def new
    user = {id: 10, username: "Brady-Rudesill", first_name: "Brady", last_name: "Rudesill", email: "bradyrudesill@gmail.com", encrypted_access_token: "c6EklGYEtfrAwJaly1f1Ozg5+k+11DiJI86VlK5YwY2g26Pb+gBWpzGEEXx9\nVBG3p4dd0t/7ighIcL7PVLtO3aGZL5gsj+knItxZvfiyTl8=\n", encrypted_access_token_salt: "7f933fd724ca286c", encrypted_access_token_iv: "7U9Dl8x5ceM8ZYEGaO5XtA==\n", venmo_id: "1806884898078720454", large_image: "http://www.gravatar.com/avatar/6f1ee73002f145a28e6d559fc53347ad?d=mm&s=200", small_image: "http://www.gravatar.com/avatar/6f1ee73002f145a28e6d559fc53347ad?d=mm&s=80", created_at: "Mon, 02 Nov 2015 02:40:11 UTC +00:00", updated_at: "Mon, 02 Nov 2015 02:40:11 UTC +00:00"}
    login(user)
    # url = request.original_url
    # user = parse_user(send_response(url))
    # if User.find_by(:venmo_id => user[:venmo_id]) != nil
    #   login(user)
    # else
    #   User.create(user)
    #   login(user)
    # end
    # user = {}
  end

  # def destroy
  #   logout
  # end

end
