class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :authenticate

  helper_method :current_user
  
  
  protected
  def authenticate
    unless (session[:user_id]) && (@_user = User.find(session[:user_id]))
      logger.error "no user with id #{session[:user_id]}"
      redirect_to login_path
      return false
    end

    allowed_paths = ["/", "/logout"]

    unless (allowed_paths.include? request.path)
      render :status => :forbidden, :file => "public/403.html"
      return false;
    end
   
    return true
  end
  
  
  private
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

end
