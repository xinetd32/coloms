class ProductType < ActiveRecord::Base
  attr_accessible :name, :description
  has_many :items
  
  validates :name, presence: true, uniqueness: true, length: { maximum: 255 }
  validates :description, length: { maximum: 255 }

end
