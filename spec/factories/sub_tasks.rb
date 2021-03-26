# == Schema Information
#
# Table name: sub_tasks
#
#  id         :bigint           not null, primary key
#  completed  :boolean          default(FALSE)
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  task_id    :integer
#
FactoryBot.define do
  factory :sub_task do
    task_id { "" }
    name { "MyString" }
    completed { false }
  end
end
