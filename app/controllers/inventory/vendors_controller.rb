class Inventory::VendorsController < ApplicationController
  include ExtRestController
  def defaultModel
    Vendor
  end
end
