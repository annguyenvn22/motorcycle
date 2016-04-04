create database motorcycle
use motorcycle

create table customer(
	username varchar(20) not null unique,
	password varchar(20) not null,
	fullname nvarchar(50),
	address nvarchar(100),
	role varchar(10),
	constraint users_pk primary key (username),
	constraint users_role check (role in('user', 'admin'))
) 

create table motorcycle(
	id int not null identity,
	name nvarchar(100),
	color nvarchar(10),
	price int,
	type nvarchar(10),
	supplier nvarchar(20),
	is_sold bit,
	is_reserved bit default 0,
	img_url nvarchar(500),
	constraint motorcycle_pk primary key (id),
	constraint motorcycle_type check (type in ('scooter', 'motor')),

) 

create table invoice(
	id int not null identity,
	customer varchar(20) not null,
	total_price decimal,
	date_created date default getdate(),
	is_resolved bit default 0,
	constraint invoice_pk primary key (id),
	constraint invoice_customer_fk foreign key (customer) references customer(username)
) 

create table invoice_detail(
	invoice_id int,
	motorcycle_id int,
	price decimal,
	constraint invoice_detail_pk primary key (invoice_id, motorcycle_id),
	constraint invoice_detail_invoice_fk foreign key (invoice_id) references invoice (id),
	constraint invoice_detail_motorcycle foreign key (motorcycle_id) references motorcycle (id),
) 

