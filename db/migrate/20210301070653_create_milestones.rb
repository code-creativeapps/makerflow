class CreateMilestones < ActiveRecord::Migration[6.1]
  def change
    create_table :milestones do |t|
      t.integer :project_id
      t.string :name
      t.boolean :expanded, default: true

      t.timestamps
    end
  end
end
