class CreatePositions < ActiveRecord::Migration[6.0]
  def change
    create_table :positions do |t|
      t.string :title
      t.string :company
      t.string :requirements
      t.string :details
      t.date :postdate
      t.date :closingdate
      t.integer :salary
      t.string :contact
      t.string :website
      t.string :rating
      t.string :procon
      t.string :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
