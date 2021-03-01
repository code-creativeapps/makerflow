json.cache! [task] do
    json.extract! task, :id, :name, :date, :completed, :recurring, :project, :created_at, :updated_at
end
