class CreateSubTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :sub_tasks do |t|
      t.integer :task_id
      t.string :name
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
