# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131011084811) do

  create_table "audits", :force => true do |t|
    t.integer  "auditable_id"
    t.string   "auditable_type"
    t.integer  "associated_id"
    t.string   "associated_type"
    t.integer  "user_id"
    t.string   "user_type"
    t.string   "username"
    t.string   "action"
    t.text     "audited_changes"
    t.integer  "version",         :default => 0
    t.string   "comment"
    t.string   "remote_address"
    t.datetime "created_at"
  end

  add_index "audits", ["associated_id", "associated_type"], :name => "associated_index"
  add_index "audits", ["auditable_id", "auditable_type"], :name => "auditable_index"
  add_index "audits", ["created_at"], :name => "index_audits_on_created_at"
  add_index "audits", ["user_id", "user_type"], :name => "user_index"

  create_table "distributors", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "email"
    t.string   "phone"
    t.string   "address"
  end

  create_table "equipments", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "items", :force => true do |t|
    t.string   "description"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.string   "condition"
    t.integer  "guaranty"
    t.string   "guaranty_service"
    t.string   "status"
    t.integer  "location_id"
    t.integer  "order_id"
    t.integer  "vendor_id"
    t.integer  "product_type_id"
    t.integer  "model_id"
    t.float    "price"
    t.integer  "old_id"
  end

  create_table "model_orders", :force => true do |t|
    t.integer "model_id"
    t.integer "order_id"
    t.integer "item_id"
  end

  add_index "model_orders", ["model_id", "order_id"], :name => "index_model_orders_on_model_id_and_order_id"
  add_index "model_orders", ["model_id"], :name => "index_model_orders_on_model_id"

  create_table "models", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "vendor_id"
    t.integer  "product_type_id"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.integer  "power"
    t.boolean  "consumable",      :default => false
  end

  create_table "network_devices", :force => true do |t|
    t.integer  "equipment_id"
    t.string   "mgmt_ip_address"
    t.string   "snmp_community"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "status"
  end

  add_index "network_devices", ["equipment_id"], :name => "index_network_devices_on_equipment_id"

  create_table "network_interfaces", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "device_id"
    t.integer  "snmp_index"
    t.integer  "interface_type"
    t.integer  "status"
    t.integer  "interface_id"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "network_interfaces", ["device_id"], :name => "index_network_interfaces_on_device_id"
  add_index "network_interfaces", ["interface_id"], :name => "index_network_interfaces_on_interface_id"

  create_table "orders", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.integer  "user_id"
    t.integer  "distributor_id"
    t.string   "dis_offer"
    t.string   "dis_order"
    t.string   "dis_invoce"
    t.string   "order_status"
  end

  create_table "permissions", :force => true do |t|
    t.string   "name"
    t.integer  "role_id"
    t.string   "module"
    t.string   "element"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "permissions", ["role_id"], :name => "index_permissions_on_role_id"

  create_table "product_invoices", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "product_orders", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "product_types", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "roles", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "password_hash"
    t.string   "password_salt"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.string   "roles",         :default => "--- []"
    t.datetime "last_login"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone"
    t.datetime "dob"
  end

  create_table "vendors", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

end
