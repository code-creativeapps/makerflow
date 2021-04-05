# == Schema Information
#
# Table name: projects
#
#  id         :bigint           not null, primary key
#  color      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
class Project < ApplicationRecord
    belongs_to :user
    has_many :milestones, dependent: :destroy
    has_many :tasks, through: :milestones, dependent: :destroy 

    validates :name, presence: true
    before_validation :init
    
    def init
        self.color = self.user.unused_colors.sample if self.color.nil?  
    end

    def colorBase
        self.color.split('-')[0] if self.color
    end

    def colorShade
        self.color.split('-')[1].to_i if self.color
    end
end
