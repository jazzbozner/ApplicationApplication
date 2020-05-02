class Note < ApplicationRecord
  belongs_to :stage
  delegate :position, to: :stage
  
end
