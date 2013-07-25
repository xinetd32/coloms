class UsersController < ApplicationController
  include ExtRestController
  def defaultModel
    @jsonOptions = {:except => [:password_hash, :password_salt]}
    User
  end
  
  def set_password
    user = User.find(params[:id])
    if user
      user.password = params[:password]
      if user.save
        render :json => {:success => true}
      else 
        render :json => {:success => false}
      end
    end
  end
  
end
