class StagesSerializer < ActiveModel::Serializer
  attributes :id, :position_id, :status, :startdate, :enddate

  belongs_to :position 

  has_many :notes
end






