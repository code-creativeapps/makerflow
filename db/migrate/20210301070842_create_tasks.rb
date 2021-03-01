class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.integer :milestone_id
      t.string :name
      t.date :date
      t.boolean :completed, default: false
      t.boolean :recurring, default: false

      t.timestamps
    end
  end
end
