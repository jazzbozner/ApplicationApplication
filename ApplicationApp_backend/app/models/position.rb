class Position < ApplicationRecord
  belongs_to :user
  has_many :stages, dependent: :destroy
  has_many :notes, through: :stages
  has_many :tasks, through: :stages
end
