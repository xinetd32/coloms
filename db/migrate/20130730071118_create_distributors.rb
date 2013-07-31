class CreateDistributors < ActiveRecord::Migration

  def self.up
    add_column :distributors, :email, :string
    add_column :distributors, :phone, :string
    add_column :distributors, :address, :string
  end

  def self.down
    remove_column :distributors, :email
    remove_column :distributors, :phone
    remove_column :distributors, :address
  end  
  
end
