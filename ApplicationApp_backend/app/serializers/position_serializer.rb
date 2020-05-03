class PositionSerializer < ActiveModel::Serializer
  
  attributes :id, :title, :user_id, :company, :requirements, :details, :postdate, :closingdate, :salary, :contact, :website, :rating, :procon, :status 

  belongs_to :user 
  has_many :stages 
  has_many :notes, through: :stages
  has_many :tasks, through: :stages

  # accepts_nested_attributes_for :stages

end


