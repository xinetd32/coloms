class Item < ActiveRecord::Base
  belongs_to :order
  belongs_to :distributor
  belongs_to :vendor
  belongs_to :product_order
  belongs_to :product_invoice
end
