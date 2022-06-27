class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  get '/books' do
    Book.order(created_at: :asc).to_json
  end

  get '/books/:id' do
    book = Book.find(params[:id])
    book.to_json
  end
  
  post '/books' do
    book = Book.create(
      author: params[:author],
      title: params[:title],
      genre: params[:genre],
      description: params[:description]
    )
    book.to_json
  end

  patch '/book/:id' do
    book = Book.find(params[:id])
    book.update(params)
    book.to_json
  end

  delete '/books/:id' do
    book = Book.find(params[:id])
    book.destroy
    book.to_json
  end
end
