class UsersController < ApplicationController
  def index

    # url = request.original_url
    url = request.original_url
    authorization_code = url[38..-1]
    p authorization_code
    response = HTTParty.post("https://api.venmo.com/v1/oauth/access_token",{
      "client_id": 3071,
      "client_secret": aBDA9ba2eB4RZNcCJ8DRbbydhjsmXDBS,
      "code": authorization_code
      })

    p "*" 50
    p response
    p "*" 50
  end

end
