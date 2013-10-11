class AddConsumableToModel < ActiveRecord::Migration
  def change
    add_column :models, :consumable, :boolean, default: false
  end
end
