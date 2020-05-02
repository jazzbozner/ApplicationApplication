class Task < ApplicationRecord
  belongs_to :stage
  delegate :position, to: :stage
end
