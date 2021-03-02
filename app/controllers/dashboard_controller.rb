class DashboardController < ApplicationController
  before_action :authenticate_user!, only: [:show]
  def show
    @current_user = current_user
    # @projects = @current_user.projects.as_json() Give projects to view to save initial front-end call 
  end
end
