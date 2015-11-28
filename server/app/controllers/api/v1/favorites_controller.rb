class Api::V1::FavoritesController < ApplicationController
  protect_from_forgery except: [:create, :show]

  def create
    favorite = Favorite.new result_id: params['result_id']

    if favorite.save
      render json: favorite
    else
      render json: favorite
    end
  end

  def show
    favorite = Favorite.where(result_id: params['id'])
    render json: favorite.size
  end
end
