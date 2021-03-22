# == Schema Information
#
# Table name: projects
#
#  id         :bigint           not null, primary key
#  color      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
FactoryBot.define do
    factory :project do
      user_id { 1 }
      name { "New Project" }
      color  { "pink-600" }
    end
  end
