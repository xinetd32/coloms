class Inventory::EquipmentsController < ApplicationController
  include ExtRestController
  def defaultModel
    Equipment.queryColumns = ['name', 'description']
    Equipment
  end
end
