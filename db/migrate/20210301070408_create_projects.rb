class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.integer :user_id
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
