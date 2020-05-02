class CreateStages < ActiveRecord::Migration[6.0]
  def change
    create_table :stages do |t|
      t.string :title
      t.string :status
      t.date :startdate
      t.date :enddate
      t.references :position, null: false, foreign_key: true

      t.timestamps
    end
  end
end
