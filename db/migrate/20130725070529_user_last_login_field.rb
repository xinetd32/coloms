class UserLastLoginField < ActiveRecord::Migration
  def up
    add_column :users, :last_login, :timestamp
  end

  def down
    remove_column :users, :last_login
  end
end
