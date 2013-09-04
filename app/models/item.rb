class Item < ActiveRecord::Base
  attr_accessible :description, :condition, :guaranty, :guaranty_service, :status, :location_id, :price
  
  has_one :model_order
  #has_one :order, through: :model_order
  #has_one :model, through: :model_order
  belongs_to :order
  belongs_to :model
  belongs_to :distributor
  belongs_to :vendor
  belongs_to :product_type
  belongs_to :product_invoice
  belongs_to :location, :class_name => "Equipment"
  
  #validates :price, :format => { :with => /^\d+??(?:\.\d{0,2})?$/ }, :numericality =>{:greater_than => 0}
  
end
