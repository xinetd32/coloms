class UsersController < ApplicationController
  include ExtRestController
  def defaultModel
    @jsonOptions = {:except => [:password_hash, :password_salt]}
    User
  end

  def update
    @result = defaultModel.find(params[:id])
    if @result.update_attributes(params[defaultModel.name.underscore.to_sym])
      @result.roles = params[:roles].split(',')
      @result.save!
      render :template => 'application/extStore.json.erb'
    else
      render :json => {:success => false}.merge({:message => 'Error', :type => 'validation',:data => to_json_msg(@result.errors.messages)})
    end
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
