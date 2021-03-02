FactoryBot.define do
	factory :task do
	milestone_id {1 }
	name {"New Task" }
	date {Date.tomorrow }
	completed {true }
	recurring {true }
	end
end