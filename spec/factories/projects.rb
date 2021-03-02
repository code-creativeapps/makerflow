FactoryBot.define do
    factory :project do
      user_id { 1 }
      name { "New Project" }
      color  { "pink-600" }
    end
  end