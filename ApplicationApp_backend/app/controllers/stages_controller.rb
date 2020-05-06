class StagesController < ApplicationController
    before_action :set_stage, only: [:show, :update, :destroy]
    # 

    def show
        
        render json: @stage, include: ['position', 'notes', 'tasks']
    end 

    def create
        
        stage = Stage.new(stage_params)
        if stage.save
            render json:stage
        # else
        #     flash[:error_messages] = stage.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 

    def update
        
        if @stage.update(stage_params)
            render json:@stage
        # else
        #     flash[:error_messages] = @stage.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 
    
    def destroy 
        
        @stage.destroy
        # render json:"Stage Deleted"
    end 

    private 

    def set_stage
        @stage = Stage.find(params[:id])
    end

    def stage_params
        params.require(:stage).permit(:position_id, :title, :status, :startdate, :enddate)
    end

end
