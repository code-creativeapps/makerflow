json.cache! [project] do
    json.extract! project, :id, :name, :color, :colorBase, :colorShade, :created_at, :updated_at
    json.milestones do
        json.array! project.milestones, partial: "milestones/milestone", as: :milestone
    end
end
