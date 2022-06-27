class User < ActiveRecord::Base
  include BCrypt
  # attr_accessor :email, :password_hash, :token

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