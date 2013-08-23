class Inventory::OrdersController < ApplicationController
  ORDER_STATUS = [{id: 1, name: "Expected delivery"}, {id: 2, name: "Received"}, {id: 3, name: "Canceled"}]
  
  include ExtRestController
  def defaultModel
    Order
  end
  
  def index
    # Поля по которым производить Live-поиск
    defaultModel.queryColumns=['orders.id','orders.name', 'orders.order_status', 'users.email', 'users.last_name', 'users.first_name', 'distributors.name']
    @result = defaultModel.includes(:user).includes(:distributor).extLimits(params)
  end

  def create
    @result = defaultModel.new(params[defaultModel.name.underscore.to_sym].merge({:user_id => current_user.id}))
    if @result.save
      render :template => 'application/extStore.json.erb'
    else
      render :json => {:success => false}.merge({:message => 'Error', :type => 'validation',:data => to_json_msg(@result.errors.messages)})
    end
  end
  
  def get_order_status
    @result = ORDER_STATUS
    render :template => 'application/extStoreNoTotal.json.erb'    
  end

end
