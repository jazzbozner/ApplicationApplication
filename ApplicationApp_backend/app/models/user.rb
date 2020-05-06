class User < ApplicationRecord
    has_many :positions
    has_many :stages, through: :positions
end
