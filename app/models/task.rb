# == Schema Information
#
# Table name: tasks
#
#  id           :bigint           not null, primary key
#  completed    :boolean          default(FALSE)
#  date         :date
#  name         :string
#  recurring    :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  milestone_id :integer
#
class Task < ApplicationRecord
    belongs_to :milestone
    has_one :project, through: :milestone

    validates :name, presence: true
end
