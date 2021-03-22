class Api::V1::TasksController < Api::BaseController
  before_action :set_task, only: [:update, :destroy]
  before_action :set_milestone, only: [:create]

  # POST /tasks
  def create
    @task = @milestone.tasks.build(task_params)

    if @task.save
      return_current_state
    else
      render json: {errors: @task.errors}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      return_current_state @task
    else
      render json: {errors: @task.errors}, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    if @task.destroy
      return_current_state
    else
      render json: {errors: @task.errors}, status: :unprocessable_entity
    end
  end

  private

  def set_milestone
    @milestone = current_user.milestones.find(params[:milestone_id])
  end

  def set_task
    @task = current_user.tasks.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def task_params
    params.require(:task).permit(:name, :notes, :date, :completed, :recurring, :milestone_id)
  end
end
