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
require 'rails_helper'

RSpec.describe SubTask, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
