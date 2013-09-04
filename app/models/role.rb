class Role < ActiveRecord::Base
  attr_accessible :description, :name
  audited
end
