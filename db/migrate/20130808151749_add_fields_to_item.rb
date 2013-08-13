class AddFieldsToItem < ActiveRecord::Migration
  def up
    add_column :items, :condition, :string
    add_column :items, :guaranty, :integer
    add_column :items, :guaranty_service, :string
    add_column :items, :status, :string
    add_column :items, :location_id, :integer
  end

  def down
    remove_column :items, :condition, :string
    remove_column :items, :guaranty, :int
    remove_column :items, :guaranty_service, :string
    remove_column :items, :status, :string
    remove_column :items, :location_id
  end
end
