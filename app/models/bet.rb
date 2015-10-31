class Bet < ActiveRecord::Base
  validates :description, length: { maximum: 140 }
  belongs_to :user
  belongs_to :friendship
end
