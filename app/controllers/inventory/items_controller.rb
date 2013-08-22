class Inventory::ItemsController < ApplicationController
  include ExtRestController
  def defaultModel
    Item
  end
  
  def index
    # Поля по которым производить Live-поиск
    defaultModel.queryColumns=['items.id','vendors.name','orders.id', 'product_types.name','models.name', 'items.status', 'equipments.name']
    @result = defaultModel.includes(:vendor).includes(:product_type).includes(:model).includes(:order).includes(:location).extLimits(params)
  end
 
 
  def update
    @result = defaultModel.find(params[:id])
    if @result.update_attributes(params[defaultModel.name.underscore.to_sym])
      render :template => 'inventory/items/update.json.erb'
    else
      render :json => {:success => false}.merge({:message => 'Error', :type => 'validation',:data => to_json_msg(@result.errors.messages)})
    end
  end  

end
