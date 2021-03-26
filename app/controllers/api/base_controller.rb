class Api::BaseController < ApplicationController
  config.cache_store = :null_store
  skip_before_action :verify_authenticity_token
  before_action :authenticate_api_token!

  private

  def authenticate_api_token!
    if (user = user_from_token)
      sign_in user, store: false
    else
      head :unauthorized
    end
  end

  def token_from_header
    request.headers.fetch("Authorization", "").split(" ").last
  end

  def api_token
    @_api_token ||= ApiToken.find_by(token: token_from_header)
  end

  def user_from_token
    if api_token.present?
      api_token.touch(:last_used_at)
      api_token.user
    end
  end

  def return_current_state task=nil
    @projects = current_user.projects.order(created_at: :asc)
    @planning = current_user.tasks.where.not(date: nil).map(&:date).uniq
    @task = task
    render "projects/index"
  end
end
