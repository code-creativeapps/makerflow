# == Schema Information
#
# Table name: sub_tasks
#
#  id         :bigint           not null, primary key
#  completed  :boolean          default(FALSE)
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  task_id    :integer
#
class SubTask < ApplicationRecord
    belongs_to :task
end
