class UserSerializer < ActiveModel::Serializer
  
  attributes :id, :username, :firstname, :lastname, :password

  has_many :positions
  # accepts_nested_attributes_for :positions

  # has_many :stages, through: :positions
end
