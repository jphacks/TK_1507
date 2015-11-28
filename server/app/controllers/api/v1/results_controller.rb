class Api::V1::ResultsController < ApplicationController
  protect_from_forgery except: [:index, :create, :show]

  def index
    hs = Result.all
    render :json => hs
  end

  def create
    param = searchParams

    # ids = client.query("select id, word from wikipedia_nodes where word = '#{params[:from]}' or word = '#{params[:to]}'").to_a.map{|record| record['id']}

    # from_id = ids[0]
    # to_id = ids[1]

    chains = Array.new
    ########################
    # chains = awesomeMethod params[:from], params[:to]
    # => [@node, @node, @node]
    chains = [1, 2, 3, 4, 5]
    ########################

    # chains.push(from_id)
    # chains.push(bfs(client, [], [], from_id, to_id))
    # chains.push(to_id)

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
    p params
    ri = ResultItem.where(result_id: params['id'])
    render :json => ri
  end

  private
  def searchParams
    params.require(:result).permit(:from, :to)
  end

  private
  def bfs(client, open_list=[], check_list=[], from_id, to_id)
    records = client.query("select to_id from wikipedia_edges where from_id = '#{from_id}' limit 100").to_a.map{|record| record['to_id']}
    check_list.push from_id
    open_list.concat records

    return true if records.include? to_id

    records.each do |next_from_id|
      unless check_list.include? next_from_id
        bfs(client, open_list, check_list, next_from_id, to_id)
      end
    end
    return 0
  end

end
