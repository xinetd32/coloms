class SessionsController < ApplicationController
  skip_before_filter :authenticate, :only => [:new, :create]
  
  def new
  end

  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      user.update_attributes(:last_login => Time.now)
      session[:user_id] = user.id
      render :json => {:success => true, :user => user.to_json({:except => [:password_hash, :password_salt]}).to_s.html_safe}
    else
      render :json => {:success => false, :message => "Invalid login/password combination"}
    end
  end
  
  def destroy
    reset_session
    session[:user_id] = nil
    redirect_to root_url, :notice => "Logged out!"
  end

end
