class CreateModelOrdersTable < ActiveRecord::Migration
  def up
    create_table :model_orders do |t|
        t.references :model
        t.references :order
        t.integer :quantity
    end
    add_index :model_orders, [:model_id,:order_id]
    add_index :model_orders, :model_id
  end

  def down
    drop_table :model_orders
  end  
  
end
