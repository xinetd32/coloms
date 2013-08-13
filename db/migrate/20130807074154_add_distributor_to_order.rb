class AddDistributorToOrder < ActiveRecord::Migration
  def up
    add_column :orders, :distributor_id, :integer
  end

  def down
    remove_column :orders, :distributor_id
  end
end
