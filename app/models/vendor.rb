class Vendor < ActiveRecord::Base
  attr_accessible :name, :description
  has_many :items
  has_many :models, dependent: :destroy
  has_many :product_types, through: :models
  
  validates :name, presence: true, uniqueness: true, length: { maximum: 255 }
  validates :description, length: { maximum: 255 }

end
