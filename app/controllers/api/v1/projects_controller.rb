class Api::V1::ProjectsController < Api::BaseController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, only: [:index, :create, :update, :destroy]

  # GET /projects
  def index
    @projects = current_user.projects
    render "projects/index"
  end


  # POST /projects
  def create
    @project = current_user.projects.build(project_params)

    if @project.save
      redirect_to @project, notice: "Project was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      redirect_to @project, notice: "Project was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    redirect_to projects_url, notice: "Project was successfully destroyed."
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = current_user.projects.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def project_params
    params.require(:project).permit(:user_id, :name, :color)
  end
end
