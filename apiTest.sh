#!/bin/bash
# A simple script to use curl to test rest apis with protected routes and jwt auth

baseUrl="http://localhost:5000"
email="email@example.com"
email2="email2@example.com"
password="12345678"


# Register user - Tested
# curl -s -H "Content-Type: application/json" -d '{"email":"'$email'","password":"'$password'","password2":"'$password'","username":"'Langston'"}' $baseUrl/api/users/register
# curl -s -H "Content-Type: application/json" -d '{"email":"'$email2'","password":"'$password'","password2":"'$password'","username":"'Hughes'"}' $baseUrl/api/users/register


# printf "\n"

#Login and save response - Tested
response=$(curl -s -H "Content-Type: application/json" -d '{"email":"'$email'","password":"'$password'"}' $baseUrl/api/users/login)


# printf "\n"

#Pull token out of response
authHeader="Authorization: Bearer $(echo "$response" | sed 's/^{"jwt":"//' | sed 's/"}$//')"


# Create a profile for current user - Tested
# curl -v -H "Content-Type: application/json" -H "$authHeader" -d '{"avatar":"http://test.com","bio":"Just me being me","interests":"coding, javascript, baseball, phillies, python"}' $baseUrl/api/profile

#Get current user's profile - Tested
# curl -s -H "Content-Type: application/json" -H "$authHeader" $baseUrl/api/profile

# Update current users profile - Tested
# curl -s -X PUT -H "Content-Type: application/json" -H "$authHeader" -d '{"avatar":"test2.com","bio":"Something insufferable", "interests":"javascript, webdev, phillies"}' $baseUrl/api/profile

# Delete Profile - Tested
# curl -s -X DELETE -H "Content-Type: application/json" -H "$authHeader" $baseUrl/api/profile

# printf "\n"

# Create Post - Tested
# curl -s -H "Content-Type: application/json" -H "$authHeader" -d '{"text":"this is my first post"}' $baseUrl/api/posts
# curl -s -H "Content-Type: application/json" -H "$authHeader" -d '{"text":"this is my second post"}' $baseUrl/api/posts
# curl -s -H "Content-Type: application/json" -H "$authHeader" -d '{"text":"this is my third post"}' $baseUrl/api/posts

# Get Most recent posts - Tested
# curl -s -H "Content-Type: application/json" $baseUrl/api/posts

# Get post by id - Tested
# curl -s -H "Content-Type: application/json" $baseUrl/api/posts/5d569eee42a9516e1f818475

# Like a post - Tested
# curl -s -X POST -H "Content-Type: application/json" -H "$authHeader" $baseUrl/api/posts/5d569eee42a9516e1f818475/like

# Reply to a post - Tested
# curl -s -H "Content-Type: application/json" -H "$authHeader" -d '{"text":"This is my first reply"}' $baseUrl/api/posts/5d569eee42a9516e1f818475/replies
# curl -s -H "Content-Type: application/json" -H "$authHeader" -d '{"text":"This is my second reply"}' $baseUrl/api/posts/5d569eee42a9516e1f818475/replies
# curl -s -H "Content-Type: application/json" -H "$authHeader" -d '{"text":"This is my third reply"}' $baseUrl/api/posts/5d569eee42a9516e1f818475/replies