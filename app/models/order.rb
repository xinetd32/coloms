class Order < ActiveRecord::Base
  attr_accessible :name, :description, :distributor_id, :user_id
  has_many :items
  has_many :model_orders, dependent: :destroy
  has_many :models, :through => :model_orders
  belongs_to :user
  belongs_to :distributor
  
  validates :user_id, presence: true
  validates :distributor_id, presence: true
end
