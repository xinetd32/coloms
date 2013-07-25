class CreateExtComponentItems < ActiveRecord::Migration
  def change
    create_table :ext_component_items do |t|
      belongs_to :ext_component
      t.timestamps
    end
  end
end
