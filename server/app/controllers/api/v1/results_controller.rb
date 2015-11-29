class Api::V1::ResultsController < ApplicationController
  protect_from_forgery except: [:index, :create, :show]

  def index
    hs = Result.all
    render :json => hs
  end

  def create
    params.require(:result).permit(:from, :to)

    from = params["result"]["from"]
    to = params["result"]["to"]

    from_id = WikipediaNode.find_by(word: from).id
    to_id = WikipediaNode.find_by(word: to).id

    if path = bfs(open_list=[from_id], check_list=[], to_id, edges=[])
      chains = [[to_id, WikipediaNode.find(to_id).id]]

      while to_id
        to_id = path[to_id]
        word_title = WikipediaNode.find(to_id).id
        chains.push([to_id, word_title])
      end
    end

    result = Result.new
    if result.save
      chains.each do |node|
        result_item = ResultItem.new result_id: result.id, node_id: node
        result_item.save
      end
      render json: result
    else
      render json: result
    end
  end

  def show
    ri = ResultItem.where(result_id: params['id'])
    render :json => ri
  end

  private
  def bfs(open_list, check_list=[], to_id, edges)

    from_id = open_list.shift
    # puts "searching...#{from_id}"

    records = WikipediaEdge.where(from_id: from_id)
    .map{|record| record.to_id}
    .select{|item| !item.nil?}
    # records = client.query("select to_id from wikipedia_edges where from_id = '#{from_id}'")
    # .to_a.map{|record| record['to_id']}

    edges += records.map{|to_id| [from_id, to_id]}

    check_list.push from_id
    open_list += records

    # puts "open_list={#{open_list}}"

    if records.include? to_id
      return edges.map{|edge| edge.reverse}.to_h
    else
      return bfs(open_list, check_list, to_id, edges)
    end
  end
end
