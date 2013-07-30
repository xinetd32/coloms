class Inventory::VendorsController < ApplicationController
  include ExtRestController
  def defaultModel
    Vendor.queryColumns = ['name', 'description']
    Vendor
  end
end
