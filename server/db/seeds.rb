puts "🌱 Seeding books..."

# Make 50 games
20.times do
  # create a game with random data
  game = Book.create(
    title: Faker::Book.title,
    genre: Faker::Book.genre,
    author: Faker::Book.author,
  )
  
  # # create between 1 and 5 reviews for each game
  # rand(1..5).times do
  #   # get a random user for every review
  #   # https://stackoverflow.com/a/25577054
  #   user = User.order('RANDOM()').first

  #   # A review belongs to a game and a user, so we must provide those foreign keys
  #   Review.create(
  #     score: rand(1..10),
  #     comment: Faker::Lorem.sentence,
  #     game_id: game.id,
  #     user_id: user.id
  #   )
  # end
end

puts "✅ Done seeding!"
