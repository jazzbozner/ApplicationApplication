class PositionsController < ApplicationController
    before_action :set_position, only: [:show, :update, :destroy]
    # 

    def show
        render json: @position, include: ['user','stages', 'notes', 'tasks'] 
    end 

    def create
        position = Position.new(position_params)
        if position.save
            render json:position
        # else
        #     flash[:error_messages] = position.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 

    def update
        if @position.update(position_params)
            render json:@position
        # else
        #     flash[:error_messages] = @position.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 
    
    def destroy 
        @position.destroy
        render json:"Position Deleted"
    end 

    private 

    def set_position
        @position = Position.find(params[:id])
    end

    def position_params
        params.require(:position).permit(:id, :title, :user_id, :company, :requirements, :details, :postdate, :closingdate, :salary, :contact, :website, :rating, :procon, :status )
    end

end
