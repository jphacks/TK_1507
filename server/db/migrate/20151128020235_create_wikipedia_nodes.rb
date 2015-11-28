class CreateWikipediaNodes < ActiveRecord::Migration
  def change
    create_table :wikipedia_nodes do |t|
      t.string :word

      t.timestamps null: false
    end
  end
end
