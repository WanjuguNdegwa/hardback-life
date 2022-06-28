class Book < ActiveRecord::Base
  has_many :reviews
  has_many :users, through: :reviews

  def average_rating
    self.reviews.average(:rating).round(2)
  end
end