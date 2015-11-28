module Api
  module V1

    class ResultsController < ApplicationController
      def index
        render :json => "['success','index(GET api/v1/results)','method!']"
      end
      
      def show
        render :json => "['success','show(GET api/v1/results/:results_id)','method!']"
      end

   end

  end
end


