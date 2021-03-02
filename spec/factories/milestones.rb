FactoryBot.define do
    factory :milestone do
      project_id { 1 }
      name{"New Milestone"}
      expanded {true}
    end
  end