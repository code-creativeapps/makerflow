json.cache! [task] do
    json.extract! task, :id, :name, :notes, :completed, :recurring, :created_at, :updated_at
    json.date task.date&.to_date&.strftime("%d/%m/%Y")
    json.project task.project.attributes.merge(colorBase: task.project.colorBase, colorShade: task.project.colorShade)
    json.milestone task.milestone
    json.sub_tasks task.sub_tasks
end
