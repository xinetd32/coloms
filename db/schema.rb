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

ActiveRecord::Schema.define(:version => 20130815080930) do

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
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

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
