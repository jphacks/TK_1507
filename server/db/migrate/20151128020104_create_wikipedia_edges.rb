class CreateWikipediaEdges < ActiveRecord::Migration
  def change
    create_table :wikipedia_edges do |t|
      t.integer :from_id
      t.integer :to_id

      t.timestamps null: false
    end
  end
end
