class CreateEquipments < ActiveRecord::Migration
  def change
    create_table :equipments do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
    execute "Insert into equipments (id,name, description, created_at, updated_at) values (0,'<empty>','empty', 'Thu, 29 Aug 2013 12:26:26 EEST +03:00', 'Thu, 29 Aug 2013 12:26:26 EEST +03:00')"
  end
end
