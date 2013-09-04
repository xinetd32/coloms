class AddPriceToItem < ActiveRecord::Migration
  def up
    add_column :items, :price, :float
  end
  
  def down
    remove_column  :items, :price
  end
end
