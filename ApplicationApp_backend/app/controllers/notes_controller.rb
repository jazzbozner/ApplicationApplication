class NotesController < ApplicationController
    before_action :set_note, only: [:show, :update, :destroy]
    
    def show
        render json: @note, include: ['user','stages', 'notes', 'tasks'] 
    end 

    def create
        note = note.new(note_params)
        if note.save
            render json:note
        # else
        #     flash[:error_messages] = note.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 

    def update
        if @note.update(note_params)
            render json:@note
        # else
        #     flash[:error_messages] = @note.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 
    
    def destroy 
        @note.destroy
        render json:"note Deleted"
    end 

    private 

    def set_note
        @note = note.find(params[:id])
    end

    def note_params
        params.require(:note).permit(:id, :title, :detials, :stage_id )
    end

end
