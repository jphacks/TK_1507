class Api::V1::ResultsController < ApplicationController
  protect_from_forgery except: [:index, :create, :show]

  def index
    hs = Result.all
    render :json => hs
  end

  def create
    param = searchParams

    ########################
    # chains = awesomeMethod params[:from], params[:to]
    # => [@node, @node, @node]
    chains = [1, 2, 3, 4, 5]
    ########################

    result = Result.new

    if result.save
      chains.each do |node_id|
        result_item = ResultItem.new result_id: result.id, node_id: node_id
        result_item.save
      end
      render json: result
    else
      render json: result
    end
  end

  def show
    ri = ResultItem.where(result_id: params['results_id'])
    render :json => ri
  end

  private
  def searchParams
    params.require(:result).permit(:from, :to)
  end
end
