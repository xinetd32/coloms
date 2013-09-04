class Distributor < ActiveRecord::Base
  attr_accessible :address, :description, :email, :name, :phone
  has_many :orders
  
  validates :name, presence: true, uniqueness: true, length: { maximum: 255 }
  validates :description, length: { maximum: 255 }
  audited
end
