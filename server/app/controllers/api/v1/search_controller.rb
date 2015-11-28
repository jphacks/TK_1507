module Api
  module V1

    class SearchController < ApplicationController
      def index
        render :json => "success!"
      end  
    end
    
  end
end
