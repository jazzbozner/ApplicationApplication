class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
    # All Controllers are working, not sure how to handle errors -> instance will only have errors if we have validations on models --> could also put validations on the front end so all requests have clean/valid data as inputs 

    def show
        render json: @user, include: ['positions.stages.notes']
    end 

    def create
        user = User.new(user_params)
        if user.save
            render json:user
        # else
        #     flash[:error_messages] = user.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 

    def update
        if @user.update(user_params)
            render json:@user
        # else
        #     flash[:error_messages] = @user.errors.full_messages  
        #     render json: flash[:error_messages] 
        end 
        
    end 
    
    def destroy 
        byebug
        @user.destroy
        render json:"User Deleted"
    end 

    private 

    def set_user 
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :password)
    end

end
