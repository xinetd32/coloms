class Inventory::ProductTypesController < ApplicationController
  include ExtRestController
  def defaultModel
    ProductType.queryColumns = ['name', 'description']
    ProductType
  end
end
