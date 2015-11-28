module Api
  module V1

    class SearchController < ApplicationController
      def index
        render :json => "['a','b','c']"
      end  
    end
    
  end
end
