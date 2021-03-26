# == Schema Information
#
# Table name: tasks
#
#  id           :bigint           not null, primary key
#  completed    :boolean          default(FALSE)
#  date         :date
#  name         :string
#  notes        :text
#  recurring    :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  milestone_id :integer
#
class Task < ApplicationRecord
    default_scope { order(created_at: :asc) }

    belongs_to :milestone
    has_one :project, through: :milestone

    has_many :sub_tasks

    validates :name, presence: true
end
