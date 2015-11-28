# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


elems_edge = {}

elems_all = []
records = []

File.foreach("tmp/links_scraped.tsv") do |line|
  elems = line.chomp.split(/\t/).uniq
  elems_edge[elems[0]] = elems[1..-1]
  if elems.size > 1
    elems_all += elems
    elems_all.uniq!
  end
end

elems_all.each do |word|
  records <<  WikipediaNode.new({"word": word})
end

WikipediaNode.import records

wiki_node_dict = {}

WikipediaNode.all.each do |record|
  wiki_node_dict[record.word] = record.id
end

records = []

elems_edge.each do |from, to|
  if from && to
    to.map{|to_word| wiki_node_dict[to_word]}.each do |to_id|
      records << WikipediaEdge.new({"from_id": wiki_node_dict[from], "to_id": to_id})
    end
  end
end

WikipediaEdge.import records
