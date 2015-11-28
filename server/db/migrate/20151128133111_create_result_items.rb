class CreateResultItems < ActiveRecord::Migration
  def change
    create_table :result_items do |t|
      t.references :result, index: true
      t.integer :node_id
      t.timestamps null: false
    end
  end
end
