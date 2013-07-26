class CreatePermissions < ActiveRecord::Migration
  def change
    create_table :permissions do |t|
      t.string :name
      t.belongs_to :role
      t.string :module
      t.string :element

      t.timestamps
    end
    add_index :permissions, :role_id
  end
end
