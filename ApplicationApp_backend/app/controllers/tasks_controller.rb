class TasksController < ApplicationController
    before_action :set_task, only: [:show, :update, :destroy]
    # 

    def show
        render json: @task 
    end 

    def create
        task = Task.new(task_params)
        if task.save
            render json:task
        # else
        #     flash[:error_messages] = task.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 

    def update
        if @task.update(task_params)
            render json:@task
        # else
        #     flash[:error_messages] = @task.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 
    
    def destroy 
        @task.destroy
        render json:"Task Deleted"
    end 

    private 

    def set_task
        @task = Task.find(params[:id])
    end

    def task_params
        params.require(:task).permit(:stage_id, :title, :details, :priority, :status, :startdate, :duedate)
    end

end
