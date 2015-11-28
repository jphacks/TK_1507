class JsonApiController < ApplicationController
  
  def search
    @data = Product.all
    render json: @data
  end
  
end
