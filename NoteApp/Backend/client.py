import requests
import json
# endpoint = 'https://dummyjson.com/products/1'
# json_mylist = json.dumps(
#     {"content": "This is modified from client side"}, separators=(',', ':'))
endpoint = 'http://127.0.0.1:8000/note/createNote'
response = requests.post(
    endpoint, json={
        'title':"this is title",
        'body':'my name is mahmudul hasan mahi'

    }, headers={'Content-Type': 'application/json'})

print(response.json())
