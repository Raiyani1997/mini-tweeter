# mini-tweeter

#to install node
1. sudo apt-get install node # install node 8.x


#for database configuration
1. create databse "mini-tweeter" using postgres
2. add username and password into server/.env file for database configuration


#for server setup
1. to install required packges goto server package and type "npm i" in terminal.
2. after that type "node server" to start the server.


NOTE:
1. there is no any registration page added, so that use this api using postman to create user.

http://localhost:3001/auth/signup
POST request with request payload is 
{
	"firstname": "firstname",
	"lastname": "lastname",
	"email": "user@gmail.com",
	"contact": "9834565423",
	"password": "1234"
}
