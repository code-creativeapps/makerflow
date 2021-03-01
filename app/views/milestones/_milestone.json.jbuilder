json.cache! [milestone] do
    json.extract! milestone, :id, :name, :expanded, :created_at, :updated_at
    json.milestones do
        json.array! milestone.tasks, partial: "tasks/tasks", as: :task
    end
end
  