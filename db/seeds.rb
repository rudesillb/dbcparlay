# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(username: "grant", first_name: "grant", last_name: "grant", email: "grant@grant.com")
User.create(username: "joji", first_name: "joji", last_name: "joji", email: "joji@joji.com")
User.create(username: "drew", first_name: "drew", last_name: "drew", email: "drew@drew.com")

Friendship.create(user_id: 1, friend_id: 2)
Friendship.create(user_id: 1, friend_id: 3)
Friendship.create(user_id: 2, friend_id: 1)


Bet.create(bet_amount: 8.00, friendship_id: 1, description: "Daniel is secretly a girl")
Bet.create(bet_amount: 10.00, friendship_id: 1, description: "Si Cheng is secretly a little girl")
Bet.create(bet_amount: 12.00, friendship_id: 2, description: "Tony is a sleeper-cell")
Bet.create(bet_amount: 14.00, friendship_id: 1, description: "Tony is a sleeper-cell", status: 'active')
Bet.create(bet_amount: 16.00, friendship_id: 1, description: "Brady is an alien", status: 'active')
Bet.create(bet_amount: 16.00, friendship_id: 1, description: "Brady is an alien", status: 'outstanding')
Bet.create(bet_amount: 26.00, friendship_id: 3, description: "Brady is an alien", status: 'inactive')
Bet.create(bet_amount: 13.00, friendship_id: 3, description: "Brady is an alien", status: 'active')
Bet.create(bet_amount: 23.00, friendship_id: 3, description: "Brady is an alien", status: 'active')
Bet.create(bet_amount: 73.00, friendship_id: 3, description: "Brady is an alien", status: 'outstanding')

