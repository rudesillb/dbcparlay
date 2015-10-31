class User < ActiveRecord::Base
  attr_encrypted :access_token, key: ENV["HASH_KEY"], :mode => :per_attribute_iv_and_salt
  has_many :bets, through: :friendships
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user
end
