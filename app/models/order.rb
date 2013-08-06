class Order < ActiveRecord::Base
  attr_accessible :name, :description
  has_many :items
  has_many :model_orders, dependent: :destroy
  has_many :models, :through => :model_orders
  belongs_to :user
end
