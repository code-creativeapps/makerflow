FactoryBot.define do
  factory :user, class: 'User' do
   email { Faker::Internet.email }
   password { "password" }
   name { Faker::Movies::Lebowski.character }
   terms_of_service { true }
   time_zone { "America/Chicago" }
  end
end