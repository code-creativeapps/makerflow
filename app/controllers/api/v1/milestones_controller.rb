class Api::V1::MilestonesController < Api::BaseController
  before_action :set_project, only: [:create]
  before_action :set_milestone, only: [:update, :destroy]
  # POST /milestones
  def create
    @milestone = @project.milestones.build(milestone_params)

    if @milestone.save
      render partial: "milestones/milestone", locals: {milestone: @milestone}
    else
      render json: {errors: @milestone.errors}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /milestones/1
  def update
    if @milestone.update(milestone_params)
      render partial: "milestones/milestone", locals: {milestone: @milestone}
    else
      render json: {errors: @milestone.errors}, status: :unprocessable_entity
    end
  end

  # DELETE /milestones/1
  def destroy
    if @milestone.destroy
      render json: {}, status: :ok
    else
      render json: {errors: @milestone.errors}, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = current_user.projects.find(params[:project_id])
  end

  def set_milestone
    set_project
    @milestone = @project.milestones.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def milestone_params
    params.require(:milestone).permit(:name, :expanded)
  end
end
