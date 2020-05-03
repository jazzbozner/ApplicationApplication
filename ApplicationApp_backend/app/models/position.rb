class Position < ApplicationRecord
  belongs_to :user
  has_many :stages
  has_many :notes, through: :stages
  has_many :tasks, through: :stages
  accepts_nested_attributes_for :stages

end
