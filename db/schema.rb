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

ActiveRecord::Schema.define(version: 20151030184303) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bets", force: :cascade do |t|
    t.float    "bet_amount",    default: 0.0
    t.integer  "friendship_id"
    t.datetime "end",           default: '2020-01-01 00:00:00'
    t.string   "status",        default: "inactive"
    t.string   "description"
    t.string   "creator"
    t.string   "reciever"
    t.string   "user_vote"
    t.string   "friend_vote"
    t.string   "winner"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
  end

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "friend_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "encrypted_access_token"
    t.string   "encrypted_access_token_salt"
    t.string   "encrypted_access_token_iv"
    t.string   "venmo_id"
    t.string   "large_image"
    t.string   "small_image"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

end
