class DestParametersToOrder < ActiveRecord::Migration
  def up
    add_column :orders, :dis_offer, :string
    add_column :orders, :dis_order, :string
    add_column :orders, :dis_invoce, :string
  end

  def down
    remove_column :orders, :dis_offer
    remove_column :orders, :dis_order
    remove_column :orders, :dis_invoce
  end
end
