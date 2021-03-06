class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :encrypted_access_token
      t.string :encrypted_access_token_salt
      t.string :encrypted_access_token_iv
      t.string :venmo_id
      t.string :large_image
      t.string :small_image

      t.timestamps null: false
    end
  end
end
