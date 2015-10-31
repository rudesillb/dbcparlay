class Friendship < ActiveRecord::Base
  validates :user_id, uniqueness: {scope: :friend_id}
  # validates :friend_id, uniqueness: {scope: :user_id}
  belongs_to :user
  belongs_to :friend, :class_name => 'User'
  has_many :bets
end
