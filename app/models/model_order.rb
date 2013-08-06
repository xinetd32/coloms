class ModelOrder < ActiveRecord::Base
  attr_accessible :model_id, :order_id, :quantity
  belongs_to :model
  belongs_to :order
  #validates_presence_of :quantity  
end
