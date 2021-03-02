# == Schema Information
#
# Table name: milestones
#
#  id         :bigint           not null, primary key
#  expanded   :boolean          default(TRUE)
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :integer
#
class Milestone < ApplicationRecord
    belongs_to :project
    has_many :tasks

    validates :name, presence: true
end
