class AddPowerConsumptionToModel < ActiveRecord::Migration
  def up
    add_column :models, :power, :integer
  end
  
  def down
    remove_column  :models, :power
  end
end
