json.cache! [task] do
    json.extract! task, :id, :name, :completed, :recurring, :created_at, :updated_at
    json.date task.date&.to_date&.strftime("%d/%m/%Y")
    json.project task.project.attributes.merge(colorBase: task.project.colorBase, colorShade: task.project.colorShade)
end
