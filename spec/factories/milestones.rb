# == Schema Information
#
# Table name: milestones
#
#  id         :bigint           not null, primary key
#  expanded   :boolean          default(TRUE)
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :integer
#
FactoryBot.define do
    factory :milestone do
      project_id { 1 }
      name{"New Milestone"}
      expanded {true}
    end
  end
