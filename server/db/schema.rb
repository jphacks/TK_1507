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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151128133111) do

  create_table "result_items", force: :cascade do |t|
    t.integer  "result_id",  limit: 4
    t.integer  "node_id",    limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "result_items", ["result_id"], name: "index_result_items_on_result_id", using: :btree

  create_table "results", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tmp_nodes", force: :cascade do |t|
    t.text "word", limit: 65535
  end

  create_table "wikipedia_edges", force: :cascade do |t|
    t.integer  "from_id",    limit: 4
    t.integer  "to_id",      limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "wikipedia_nodes", force: :cascade do |t|
    t.text     "word",       limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

end
