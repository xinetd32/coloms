class Permission < ActiveRecord::Base
  belongs_to :role
  attr_accessible :element, :module, :name
  audited
end
