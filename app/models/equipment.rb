class Equipment < ActiveRecord::Base
   attr_accessible :name, :description
   self.table_name = "equipments"
   
   has_many :items, foreign_key: "location_id"
   audited
   
   before_destroy { |record|
     items = record.items
     items.each { |item|
       item.location_id = 0
       item.save
     }
   }
end
