class CreateBets < ActiveRecord::Migration
  def change
    create_table :bets do |t|
      t.float :bet_amount, default: 0
      t.references :user
      t.integer :friend_id
      t.datetime :end, default: '01-01-2020'
      t.string :status, default: 'inactive'
      t.string :description

      t.timestamps null: false
    end
  end
end
