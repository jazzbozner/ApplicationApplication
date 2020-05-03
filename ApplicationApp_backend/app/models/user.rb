class User < ApplicationRecord
    has_many :positions
    has_many :stages, through: :positions
    accepts_nested_attributes_for :positions

    
end
