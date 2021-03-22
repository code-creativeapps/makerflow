class AddNotesToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :notes, :text
  end
end
