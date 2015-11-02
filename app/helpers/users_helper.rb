require 'digest'
module UsersHelper


  def login(user)
    session[:current_user_id] = user[:venmo_id]
  end

  def logout
    session.destroy
  end

  def current_user
    return nil unless session[:current_user_id]
    session[:current_user_id]
  end

  def parse_user(response)
    user = {}
    user[:access_token] = response["access_token"]
    user[:email] = response["user"]["email"]
    user[:first_name] = response["user"]["first_name"]
    user[:last_name] = response["user"]["last_name"]
    user[:username] = response["user"]["username"]
    user[:venmo_id] = response["user"]["id"]
    user[:small_image] = gravatar(response["user"]["email"],'small')
    user[:large_image] = gravatar(response["user"]["email"],'large')

    return user
  end

  def send_response(url)
    authorization_code = url[47..-1]
    response = HTTParty.post("https://api.venmo.com/v1/oauth/access_token",
      :body => { :client_id     => ENV["VENMO_ID"],
                 :client_secret => ENV["VENMO_SECRET"],
                 :code          => "#{authorization_code}"
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'} )
    return response
  end

  def pay_winner(bet)
    # winner = User.find(1)
    # loser = User.find(5)
    winner = User.find_by(:venmo_id => bet[:winner])
    loser = User.find_by(:venmo_id => current_user)
    # :note         => bet.description,
    # :amount       => bet.amount
    response = HTTParty.post("https://api.venmo.com/v1/payments",
      :body => { :access_token => loser.access_token,
                 :email      => winner[:email],
                 :note       => bet.description,
                 :amount     => bet.amount
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'} )
  end

  def valid_bet?(bet)
    if bet.winner == nil || bet.user_vote == nil || bet.friend_vote == nil || bet.friend_vote != bet.user_vote
      return false
    end
    return true
  end

  def gravatar(email,size)
    if size == 'small'
      md5 = Digest::MD5.new
      md5.update email
      md5 = md5.hexdigest
      return "http://www.gravatar.com/avatar/#{md5}?d=mm&s=80"
    end
    if size == 'large'
      md5 = Digest::MD5.new
      md5.update email
      md5 = md5.hexdigest
      return "http://www.gravatar.com/avatar/#{md5}?d=mm&s=200"
    end
  end

end
