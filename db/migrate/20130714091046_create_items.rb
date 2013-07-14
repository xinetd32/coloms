class CreateItems < ActiveRecord::Migration

  def change
    create_table :orders do |t|
      t.string :name
      t.string :description
      t.timestamps  
    end

    create_table :distributors do |t|
      t.string :name
      t.string :description
      t.timestamps  
    end

    create_table :vendors do |t|
      t.string :name
      t.string :description
      t.timestamps  
    end
    
    create_table :product_orders do |t|
      t.string :name
      t.string :description
      t.timestamps  
    end

    create_table :product_invoices do |t|
      t.string :name
      t.string :description
      t.timestamps  
    end

    create_table :items do |t|
      t.belongs_to :order
      t.belongs_to :distributor
      t.belongs_to :vendor
      t.belongs_to :product_order
      t.belongs_to :product_invoce
      t.string :description
      t.timestamps
    end
  end
end
