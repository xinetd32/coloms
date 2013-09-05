class AddOldIdToItem < ActiveRecord::Migration
  def up
    add_column :items, :old_id, :integer
  end
  
  def down
    remove_column  :items, :old_id
  end
end
