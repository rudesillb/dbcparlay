class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.references :friend
      t.references :user

      t.timestamps null: false
    end
  end
end
