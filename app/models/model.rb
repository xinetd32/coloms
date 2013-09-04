class Model < ActiveRecord::Base
  attr_accessible :name, :description, :product_type_id, :vendor_id, :power
  
  belongs_to :vendor
  belongs_to :product_type
  has_many :model_orders
#  has_and_belongs_to_many :orders
  has_many :orders, :through => :model_orders 
  
  validates :name, presence: true
  validates :power, numericality: {:greater_than => 0}
  
end
