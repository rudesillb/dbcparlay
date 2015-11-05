class Friendship < ActiveRecord::Base
  validates_uniqueness_of [:user_id,:friend_id], :scope => [:friend_id, :user_id]
  # validates_uniqueness_of :friend_id, :scope => :user_id
  belongs_to :user
  belongs_to :friend, :class_name => 'User'
  has_many :bets
end
