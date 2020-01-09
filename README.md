# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|int||
|email|string|null: false|
|name|string|null: false|
|password|string|null: false|
|groups_id|integer|null: false, foreign_key: true|
|messages_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|int||
|name|string|null: false|
|users_id|integer|null: false, foreign_key: true|
### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|int||
|body|text|null: false|
|image|string||
|users_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
