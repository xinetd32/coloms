class Inventory::ProductTypesController < ApplicationController
  include ExtRestController
  def defaultModel
    ProductType
  end
end
