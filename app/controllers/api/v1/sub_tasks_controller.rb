class Api::V1::SubTasksController < Api::BaseController
  before_action :set_sub_task, only: [:update, :destroy]
  before_action :set_task, only: [:create]

  # POST /tasks
  def create
    @sub_task = @task.sub_tasks.build(sub_task_params)

    if @sub_task.save
      return_current_state @task
    else
      render json: {errors: @sub_task.errors}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sub_tasks/1
  def update
    @task = @sub_task.task
    if @sub_task.update(sub_task_params)
      return_current_state @task
    else
      render json: {errors: @task.errors}, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task = @sub_task.task
    if @sub_task.destroy
      return_current_state @task
    else
      render json: {errors: @sub_task.errors}, status: :unprocessable_entity
    end
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:task_id])
  end

  def set_sub_task
    @sub_task = current_user.sub_tasks.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def sub_task_params
    params.require(:sub_task).permit(:name, :completed, :task_id)
  end
end
