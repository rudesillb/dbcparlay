class CreateBets < ActiveRecord::Migration
  def change
    create_table :bets do |t|
      t.float :bet_amount, default: 0
      t.references :friendship
      t.datetime :end, default: '01-01-2020'
      t.string :status, default: 'inactive'
      t.string :description
      t.string :user_vote
      t.string :friend_vote
      t.string :winner


      t.timestamps null: false
    end
  end
end
