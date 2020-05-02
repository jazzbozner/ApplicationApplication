# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_02_175210) do

  create_table "notes", force: :cascade do |t|
    t.string "title"
    t.string "details"
    t.integer "stage_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["stage_id"], name: "index_notes_on_stage_id"
  end

  create_table "positions", force: :cascade do |t|
    t.string "title"
    t.string "company"
    t.string "requirements"
    t.string "details"
    t.date "postdate"
    t.date "closingdate"
    t.integer "salary"
    t.string "contact"
    t.string "website"
    t.string "rating"
    t.string "procon"
    t.string "status"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_positions_on_user_id"
  end

  create_table "stages", force: :cascade do |t|
    t.string "title"
    t.string "status"
    t.date "startdate"
    t.date "enddate"
    t.integer "position_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["position_id"], name: "index_stages_on_position_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "title"
    t.string "details"
    t.integer "priority"
    t.string "status"
    t.date "startdate"
    t.date "duedate"
    t.integer "stage_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["stage_id"], name: "index_tasks_on_stage_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "firstname"
    t.string "lastname"
    t.string "password"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "notes", "stages"
  add_foreign_key "positions", "users"
  add_foreign_key "stages", "positions"
  add_foreign_key "tasks", "stages"
end
