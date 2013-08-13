class AddRelationsToItems < ActiveRecord::Migration
  def up
    add_column :items, :order_id, :integer
    add_column :items, :vendor_id, :integer
    add_column :items, :product_type_id, :integer
    add_column :items, :model_id, :integer    
  end
  
  def down
    remove_column  :items, :order_id
    remove_column  :items, :vendor_id
    remove_column  :items, :product_type_id
    remove_column  :items, :model_id   
  end
end
