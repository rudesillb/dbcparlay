class UsersController < ApplicationController
  def index
    p "*" * 50
    p request.original_url
    p "*" * 50
  end

end
