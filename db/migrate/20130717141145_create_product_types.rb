class CreateProductTypes < ActiveRecord::Migration
  def change
    create_table :product_types do |t|
      t.string :name
      t.string :description
      t.timestamps
    end

    add_column :items, :product_type_id, :integer    
 
  end
end
