class CreateWikipediaNodes < ActiveRecord::Migration
  def change
    create_table :wikipedia_nodes do |t|
      t.text :word

      t.timestamps null: false
    end
  end
end
