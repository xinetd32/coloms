class Distributor < ActiveRecord::Base
  attr_accessible :name, :description
  has_many :items
end