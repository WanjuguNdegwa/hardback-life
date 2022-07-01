class Book < ActiveRecord::Base
  has_many :reviews
  has_many :users, through: :reviews

  def average_rating
    if reviews.count > 0
      self.reviews.average(:rating).round(2)
    else
      0
    end
  end
end
