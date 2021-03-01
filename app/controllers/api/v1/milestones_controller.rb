class Api::V1::MilestonesController < Api::BaseController
  before_action :set_milestone, only: [:update, :destroy]
  before_action :authenticate_user, :all
  # POST /milestones
  def create
    @milestone = Milestone.new(milestone_params)

    if @milestone.save
      redirect_to @milestone, notice: "Milestone was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /milestones/1
  def update
    if @milestone.update(milestone_params)
      redirect_to @milestone, notice: "Milestone was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /milestones/1
  def destroy
    @milestone.destroy
    redirect_to milestones_url, notice: "Milestone was successfully destroyed."
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_milestone
    @milestone = Milestone.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def milestone_params
    params.require(:milestone).permit(:name, :expanded)
  end
end
