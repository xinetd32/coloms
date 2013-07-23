class Inventory::ModelsController < ApplicationController
  include ExtRestController
  def defaultModel
    Model
  end
  
  def index
    defaultModel.queryColumns=['models.name', 'vendors.name', 'product_types.name', 'models.description']
    @result = defaultModel.includes(:vendor).includes(:product_type).extLimits(params)
  end

end

