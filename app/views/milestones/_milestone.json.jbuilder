json.cache! [milestone] do
    json.extract! milestone, :id, :name, :expanded, :created_at, :updated_at
    json.tasks do
        json.array! milestone.tasks, partial: "tasks/task", as: :task
    end
end
  