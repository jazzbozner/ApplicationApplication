class Note < ApplicationRecord
  belongs_to :stage
  delegate :position, to: :stage
  # delegate :user, to: :stage

end
