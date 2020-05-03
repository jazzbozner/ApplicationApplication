class TasksSerializer < ActiveModel::Serializer
  attributes :id, :title, :details, :priority, :status, :startdate, :duedate, :stage_id 

  belongs_to :stage 

end








