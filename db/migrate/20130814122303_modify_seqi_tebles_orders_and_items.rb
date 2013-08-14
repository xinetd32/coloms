class ModifySeqiTeblesOrdersAndItems < ActiveRecord::Migration
  def up
    execute "UPDATE SQLITE_SEQUENCE SET seq = 1000 WHERE name = 'orders'"
    execute "UPDATE SQLITE_SEQUENCE SET seq = 3000 WHERE name = 'items'"
  end
end
