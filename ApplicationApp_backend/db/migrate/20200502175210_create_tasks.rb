class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :details
      t.integer :priority
      t.string :status
      t.date :startdate
      t.date :duedate
      t.references :stage, null: false, foreign_key: true

      t.timestamps
    end
  end
end
