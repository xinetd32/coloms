class ProductOrder < ActiveRecord::Base
  attr_accessible :name, :description
  has_many :items
  audited
end
