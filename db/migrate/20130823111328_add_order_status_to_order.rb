class AddOrderStatusToOrder < ActiveRecord::Migration
  def up
    add_column :orders, :order_status, :string
  end
  
  def down
    remove_column  :orders, :order_status
  end
end
