class Order < ActiveRecord::Base
  attr_accessible :name, :description, :distributor_id, :user_id, :dis_offer, :dis_order, :dis_invoce, :order_status
  has_many :items
  has_many :model_orders, dependent: :destroy
  has_many :models, :through => :model_orders
  belongs_to :user
  belongs_to :distributor
  
  validates :user_id, presence: true
  validates :order_status, presence: true
  validates :distributor_id, numericality: {greater_than: 0 }
  validates_each  :dis_offer, :dis_order, :dis_invoce do |record, attr, values|
    record.errors.add attr, 'Distributor params is blank' if record.dis_offer.blank? and record.dis_order.blank? and record.dis_invoce.blank?
  end 
 
 audited  
end
