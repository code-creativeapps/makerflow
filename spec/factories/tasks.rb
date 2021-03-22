# == Schema Information
#
# Table name: tasks
#
#  id           :bigint           not null, primary key
#  completed    :boolean          default(FALSE)
#  date         :date
#  name         :string
#  notes        :text
#  recurring    :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  milestone_id :integer
#
FactoryBot.define do
	factory :task do
	milestone_id {1 }
	name {"New Task" }
	date {Date.tomorrow }
	completed {true }
	recurring {true }
	end
end
