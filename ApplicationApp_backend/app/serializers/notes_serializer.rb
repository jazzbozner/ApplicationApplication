class NotesSerializer < ActiveModel::Serializer
  attributes :id, :stage_id, :title, :details

  belongs_to :stage 
end











