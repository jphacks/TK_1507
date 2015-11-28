# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

con = ActiveRecord::Base.connection

records = []
File.open("tmp/link.tsv").read.split(/\n/).each_with_index do |line, index|
  puts index
  elems = line.scrub("").gsub(/\'/, "").chomp.split(/\t/).uniq
  records += elems
  if records.size >= 3000
    begin
      con.execute "INSERT INTO tmp_nodes(word) VALUES('#{records.join("'), ('")}')".scrub("")
    rescue
    end
    records = []
  end
end
if records.size >= 1
  begin
    con.execute "INSERT INTO tmp_nodes(word) VALUES('#{records.join("'), ('")}')".scrub("")
  rescue
  end
end

records = []
File.open("tmp/relative_link.tsv").read.split(/\n/).each_with_index do |line, index|
  puts index
  elems = line.scrub("").chomp.split(/\t/).uniq
  records += elems
  if records.size >= 3000
    begin
      con.execute "INSERT INTO tmp_nodes(word) VALUES('#{records.join("'), ('")}')".scrub("")
    rescue
    end
    records = []
  end
end
if records.size >= 1
  begin
    con.execute "INSERT INTO tmp_nodes(word) VALUES('#{records.join("'), ('")}')".scrub("")
  rescue
  end
end

res = con.execute "select distinct word from tmp_nodes;"
res.each_with_index do |item, index|
  WikipediaNode.create({"word": item[0]})
  puts index
end

dict = {}
WikipediaNode.all.each do |node|
  dict[node.word] = node.id
end

File.open("tmp/link.tsv").read.split(/\n/).each do |line|
  elems = line.split(/\t/)
  begin
    from_id = dict[elems[0]]
  rescue
    next
  end
  elems[1..-1].each do |to|
    begin
      to_id = dict[to]
      WikipediaEdge.create({"from_id": from_id, "to_id": to_id})
    end
  end
end

File.open("tmp/relative_link.tsv").read.split(/\n/).each_with_index do |line, index|
  puts index
  elems = line.split(/\t/)
  begin
    from_id = dict[elems[0]]
  rescue
    next
  end
  elems[1..-1].each do |to|
    begin
      to_id = dict[to]
      WikipediaEdge.create({"from_id": from_id, "to_id": to_id})
    end
  end
end

