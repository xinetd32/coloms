class RemoveQuantityAddItemIdToModelOrders < ActiveRecord::Migration
  def up
    remove_column :model_orders, :quantity
    add_column :model_orders, :item_id, :integer
  end

  def down
    add_column :model_orders, :quantity, :integer
    remove_column :model_orders, :item_id
  end
end
