json.cache! [date] do
    json.name date.strftime("%A")
    json.day date.wday
    json.date date.strftime("%d/%m/%Y")
    json.tasks do
        json.array! current_user.tasks.where(date: date).joins(:project), partial: "tasks/task", as: :task
    end
end
