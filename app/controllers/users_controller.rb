include UsersHelper
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :autheticate


  def new
    # user = {id: 10, username: "Brady-Rudesill", first_name: "Brady", last_name: "Rudesill", email: "bradyrudesill@gmail.com", encrypted_access_token: "+BG2nMcGIh/aiUdQttum1XONON3wIxbuZ1XKm4e0W1bIHVGEry81FxUkGqqP\nOXxoHLY0rAlVqLNhYyKTCJeFKWFDJRNNPqIG3TfbHA7ESuc=\n", encrypted_access_token_salt: "7f933fd724ca286c", encrypted_access_token_iv: "7U9Dl8x5ceM8ZYEGaO5XtA==\n", venmo_id: "1806884898078720454", large_image: "http://www.gravatar.com/avatar/6f1ee73002f145a28e6d559fc53347ad?d=mm&s=200", small_image: "http://www.gravatar.com/avatar/6f1ee73002f145a28e6d559fc53347ad?d=mm&s=80", created_at: "Mon, 02 Nov 2015 02:40:11 UTC +00:00", updated_at: "Mon, 02 Nov 2015 02:40:11 UTC +00:00"}

    # user = {id: 2, username: "grant-wong", first_name: "Grant", last_name: "Wong", email: "hoolaxin@gmail.com", encrypted_access_token: "yiLLQdhMyP70D0a82+E5AdsF3WRwP1FIZ9GVJ8jMk4E9sh4Qmm+IAiENSFZW\naU7tIh+qNBUutuHqcQPolV6jG2q4D1QbiglC4kFfOjKbWWY=\n", encrypted_access_token_salt: "d6a93f5a9b8a48e4", encrypted_access_token_iv: "sZs7NV1FZ1JwirP2VjPrmQ==\n", venmo_id: "1477224414838784567", large_image: "http://www.gravatar.com/avatar/497837f655bc04102bab81bb09b5efcb?d=mm&s=200", small_image: "http://www.gravatar.com/avatar/497837f655bc04102bab81bb09b5efcb?d=mm&s=80", created_at: "Mon, 02 Nov 2015 02:40:58 UTC +00:00", updated_at: "Mon, 02 Nov 2015 02:40:58 UTC +00:00"}
    # user = User.find_by(venmo_id: "1806884898078720454")

    # login(user)
    # get_friends(user)
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
      p user
      p session
    end
    user = {}
  end

  def destroy
    logout
  end

end
