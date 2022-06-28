require 'pry'

class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  post '/login' do
    user = User.find_by(email: params[:email])
    if user.password == params[:password]
      user.generate_token!
      {token: user.token}.to_json 
    else
      halt 401
    end
  end

  post '/signup' do
    user = User.new
    user.email = params[:email]
    user.password = params[:password]
    user.generate_token!
    user.save

    status 201
    {token: user.token}.to_json 
  end

  def authenticate!
    token = request.env["HTTP_AUTHORIZATION"]
    user = User.find_by_token(token)
    if user.nil? 
      halt 403 
    end
  end

  get "/protected" do
    authenticate!
    { message: "success" }.to_json
  end
  
  get '/books' do
    Book.order(created_at: :asc).to_json
  end

  get '/books/:id' do
    book = Book.find(params[:id])
    book.to_json
  end
  
  post '/books' do
    authenticate!
    
    book = Book.create(
      author: params[:author],
      title: params[:title],
      genre: params[:genre],
      description: params[:description]
    )
    status 201
    book.to_json
  end

  patch '/book/:id' do
    authenticate!

    book = Book.find(params[:id])
    book.update(params)
    book.to_json
  end

  delete '/books/:id' do
    authenticate!

    book = Book.find(params[:id])
    book.destroy
    book.to_json
  end
end
