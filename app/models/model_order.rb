class ModelOrder < ActiveRecord::Base
  attr_accessible :model_id, :order_id, :item_id
  belongs_to :model
  belongs_to :order
  belongs_to :item
  
  before_create :add_item
  
  private
  def add_item
    item = Item.create
    self.item = item
    #p self  
  end
end
