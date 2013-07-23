class CreateModels < ActiveRecord::Migration
  def change
    create_table :models do |t|
      t.string :name
      t.string :description
      t.belongs_to :vendor
      t.belongs_to :product_type
      t.timestamps
    end
  end
end
