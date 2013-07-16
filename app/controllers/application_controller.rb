class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :authenticate

  helper_method :current_user

=begin
class AdminsController < ApplicationController
   before_filter :admin_required
end

class MarksController < ApplicationController
   before_filter :admin_required, only: %w(create update)
end  
=end

  def admin_required
    unless current_user && current_user.is_admin?
      logger.error "Sorry, you don't have access to that."
      redirect_to login_path and return false
    end
  end
  
  protected
  def authenticate
    logger.error "SESSION Start".center 50, "="
    logger.error session
    logger.error "SESSION End".center 50, "="
    unless (session[:user_id]) && (@_user = User.find(session[:user_id]))
      logger.error "no user with id #{session[:user_id]}"
      redirect_to login_path
      return false
    end
=begin
    allowed_paths = ["/", "/logout", "/inventory/vendors.json"]

    unless (allowed_paths.include? request.path)
      render :status => :forbidden, :file => "public/403.html"
      return false;
    end
=end   
    return true
  end
  
  
  private
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

end
