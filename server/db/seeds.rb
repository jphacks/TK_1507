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

File.open("tmp/links_scraped_test.tsv").read.split(/\n/).each_with_index do |line, index|
  elems = line.chomp.split(/\t/).uniq
  elems_edge[elems[0]] = elems[1..-1]
  unless elems.empty?
    elems_all += elems
  end
end

elems_all.uniq!
puts "finish loading tsv"

elems_all.each_with_index do |word, index|
  records.push(WikipediaNode.new({"word": word}))
end

puts "finish creating WikipediaNode instances"

WikipediaNode.import records

puts "finish importint records into WikipediaNode"

wiki_node_dict = {}

WikipediaNode.all.each_with_index do |record, index|
  wiki_node_dict[record.word] = record.id
end

puts "finish getting edges"

records = []

elems_edge.each_with_index do |(from, to), index|
  if from && to
    to.map{|to_word| wiki_node_dict[to_word]}.each do |to_id|
      records.push(WikipediaEdge.new({"from_id": wiki_node_dict[from], "to_id": to_id}))
    end
  end
end

puts "finish creating WikipediaEdge instances"

WikipediaEdge.import records

puts "finish importing records into WikipediaEdge"
