from pymongo import MongoClient

uri = 'mongodb://localhost:27017/'

client = MongoClient(uri)
db = client["test"]

user = db["user"]
posts = db["posts"]

post1 = {
    "title": "Hello World",
    "author": "Beginner"
} 

post2 = {
    "title": "Classes and Objects",
    "author": "Expert"
}

# user.insert_one({
#     "name": "Donald",
#     "email": "don@gmail.com"
# })
# posts.insert_many([post1, post2])

# user.update_one({"name": "Donald"}, {"$set":{"name": "Alvis"}})

res = user.find_one({"name": "Donald"})
print(res)