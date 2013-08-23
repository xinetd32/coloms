# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
r = Role.create(name: 'admin', description: 'Administrator')
r = Role.create(name: 'guest', description: 'Guest')
u = User.new(email: 'os@colobridge.net', password: "123", first_name: 'Oleg', last_name: 'Sobyna')
u.add_role('admin')
u.save

u = User.new(email: 'km@colobridge.net', password: "12345678", first_name: 'Kirill', last_name: 'Marchenko')
u.add_role('admin')
u.save

u = User.new(email: 'a.zhaurov@colobridge.net', password: "12345678", first_name: 'Alexey', last_name: 'Zhaurov')
u.add_role('admin')
u.save

u = User.new(email: 'guest@guest.com', password: "123456", first_name: 'Guest', last_name: '')
u.add_role('guest')
u.save

v=Vendor.create(name: 'Cisco', description: 'Cisco Inc.')
p=ProductType.create(name: 'Router')
m=Model.create(name: '2811/K9', description: 'Security bundle')
m.vendor = v
m.product_type = p
m.save

v=Vendor.create(name: 'HP', description: 'HP')
p=ProductType.create(name: 'Switch')
m=Model.create(name: 'ProCurve 2650', description: '28 10/100 ports + 4 SFP')
m.vendor = v
m.product_type = p
m.save

d=Distributor.create(name: 'Computeruniverse')
