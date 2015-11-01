module UsersHelper

  def login(user)
    session[:current_user_id] = user["venmo_id"]
  end

  def logout
    session.destroy
  end

  def current_user
    return nil unless session[:current_user_id]
    session[:current_user_id]
  end
end
