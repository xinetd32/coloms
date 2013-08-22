class Equipment < ActiveRecord::Base
   attr_accessible :name, :description
   self.table_name = "equipments"
   
   has_many :items, foreign_key: "location_id"
end
