
class UsersController < ApplicationController
  def index

  end

  def new
    url = request.original_url
    authorization_code = url[47..-1]
    response = HTTParty.post("https://api.venmo.com/v1/oauth/access_token",
      :body => { :client_id => ENV["VENMO_ID"],
                 :client_secret => ENV["VENMO_SECRET"],
                 :code => "#{authorization_code}"
      }.to_json,
      :headers => { 'Content-Type' => 'application/json'} )

    p "*" * 50
    p response
    p "*" * 50
  end

end
