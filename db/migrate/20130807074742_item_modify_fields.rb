class ItemModifyFields < ActiveRecord::Migration
  def up
    remove_column :items, :order_id
    remove_column :items, :distributor_id
    remove_column :items, :vendor_id
    remove_column :items, :product_order_id
    remove_column :items, :product_invoce_id
    remove_column :items, :product_type_id
  end

  def down
    add_column :items, :order_id, :integer
    add_column :items, :distributor_id, :integer
    add_column :items, :vendor_id, :integer
    add_column :items, :product_order_id, :integer
    add_column :items, :product_invoce_id, :integer
    add_column :items, :product_type_id, :integer    
  end
end
