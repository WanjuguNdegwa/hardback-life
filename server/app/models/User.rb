class User < ActiveRecord::Base
  include BCrypt
  validates :email, uniqueness: true
  # attr_accessor :email, :password_hash, :token
  has_many :reviews
  has_many :books, through: :reviews

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(password)
    self.password_hash = BCrypt::Password.create(password)
  end

  def generate_token!
    self.token = "Bearer #{SecureRandom.urlsafe_base64(64)}"
    self.save! #persist
  end
end