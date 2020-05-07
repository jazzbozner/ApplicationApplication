class User < ApplicationRecord
    has_many :positions
    has_many :stages, through: :positions

    validates :username, uniqueness: true
end
