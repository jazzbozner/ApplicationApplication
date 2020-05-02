# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'date'

User.destroy_all
Position.destroy_all
Stage.destroy_all
Note.destroy_all
Task.destroy_all

#add users
user = User.create(username: "tacocat", firstname: "Joe", lastname: "Schmoe", password:"password")

#add positions
position = Position.create(title: "Dev", company: "Google", requirements: "Stuff", details:"Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Google’s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.", postdate:Date.today, closingdate:Date.today+1, salary:1000, contact: "mike@google.com", website: "www.google.com", rating: 5, procon: "yes", status: "in progress", user_id: user.id )

#add stages
stage = Stage.create(title:"Written Application", status: "pending", startdate: Date.today, enddate: Date.today+1, position: position.id)

#add notes
note = Note.create(title: "Got stuff to do!!", details: "do all the stuff to prepare for this", stage_id: stage.id)

#add tasks
task = Task.create(title: "Haircute", details: "supercuts", priority: 4, status: "incomplete", startdate: Date.today, duedate: Date.today+1, stage_id: stage.id)