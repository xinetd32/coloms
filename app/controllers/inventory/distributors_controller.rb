class Inventory::DistributorsController < ApplicationController
  include ExtRestController
  def defaultModel
    Distributor.queryColumns = ['name', 'description', 'email', 'address', 'phone']
    Distributor
  end
end
