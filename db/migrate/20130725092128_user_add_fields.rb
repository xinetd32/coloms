class UserAddFields < ActiveRecord::Migration
  def up
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone, :string
    add_column :users, :dob, :timestamp
  end

  def down
    remove_column :users, :first_name
    remove_column :users, :last_name
    remove_column :users, :phone
    remove_column :users, :dob   
  end
end
