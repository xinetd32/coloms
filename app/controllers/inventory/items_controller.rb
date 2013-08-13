class Inventory::ItemsController < ApplicationController
  include ExtRestController
  def defaultModel
    Item
  end
  
  def index
    # Поля по которым производить Live-поиск
    defaultModel.queryColumns=['items.id','vendors.name','orders.id', 'product_types.name','models.name', 'items.status']
    @result = defaultModel.includes(:vendor).includes(:product_type).includes(:model).includes(:order).extLimits(params)
  end
end
