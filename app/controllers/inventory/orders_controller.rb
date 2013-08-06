class Inventory::OrdersController < ApplicationController
  include ExtRestController
  def defaultModel
    Order
  end
  
  def index
    # Поля по которым производить Live-поиск
    defaultModel.queryColumns=['orders.id','orders.name', 'users.email', 'users.lastname', 'users.firstname']
    @result = defaultModel.includes(:user).extLimits(params)
  end

end
