class Model < ActiveRecord::Base
  attr_accessible :name, :description, :product_type_id, :vendor_id
  
  belongs_to :vendor
  belongs_to :product_type
  
  validates :name, presence: true
  
end
