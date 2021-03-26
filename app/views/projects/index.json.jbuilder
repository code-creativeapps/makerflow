json.projects @projects, partial: "projects/project", as: :project
json.planning @planning, partial: "planning/date", as: :date
json.task @task.as_json(include: [:project, :milestone, :sub_tasks]) if @task