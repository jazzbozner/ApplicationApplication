class Stage < ApplicationRecord
  belongs_to :position
  # delegate :user, :to => :position  #possibly needs to be to: :position
  has_many :notes
  has_many :tasks
end
