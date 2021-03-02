class Api::V1::ProjectsController < Api::BaseController
  before_action :set_project, only: [:show, :update, :destroy]

  # GET /projects
  def index
    @projects = current_user.projects
    render "projects/index"
  end


  # POST /projects
  def create
    @project = current_user.projects.build(project_params)

    if @project.save
      render partial: "projects/project", locals: {project: @project}
    else
      render json: {errors: @project.errors}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      render partial: "projects/project", locals: {project: @project}
    else
      render json: {errors: @project.errors}, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    if @project.destroy
      render json: {}, status: :ok
    else
      render json: {errors: @project.errors}, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = current_user.projects.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def project_params
    params.require(:project).permit(:name, :color)
  end
end
