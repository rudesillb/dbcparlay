class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :access_token
      t.string :venmo_id

      t.timestamps null: false
    end
  end
end
