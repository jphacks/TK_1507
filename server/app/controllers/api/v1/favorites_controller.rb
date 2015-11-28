module Api
  module V1
    
    class FavoritesController < ApplicationController
      def index
        render :json => "['success','index(GET api/v1/favorites)','method!']"
      end
      
      def show
        render :json => "['success','show(GET api/v1/favorites/:favorites_id)','method!']"
      end      
      
      def create
        render :json => "['success','create(POST api/v1/favorites)','method!']"
      end
      
    end
    
  end
end

