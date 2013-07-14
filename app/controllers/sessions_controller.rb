class SessionsController < ApplicationController
  skip_before_filter :authenticate, :only => [:new, :create]
  
  def new
  end

  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      session[:user_id] = user.id
      render :json => {:success => true}
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
