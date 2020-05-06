class Position < ApplicationRecord
  belongs_to :user
  has_many :stages
  has_many :notes, through: :stages
  has_many :tasks, through: :stages
end
