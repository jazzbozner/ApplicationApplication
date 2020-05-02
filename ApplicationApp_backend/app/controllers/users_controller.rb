class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
    # before_action :user_params

    def show
        render json: @user 
    end 

    def create
        user = User.create(user_params)
        render json:user
    end 

    def update
        @user.update(user_params)
    end 
    
    def destroy 
    end 

    private 

    def set_user 
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :password)
    end

end
