🎬 Flatdango

Flatdango is a basic movie ticket app for Flatiron Movie Theater.

Features

Show first movie details on page load

List all movies on the side menu

Buy tickets (until sold out)

Mark movies as sold out

Delete movies from the list and server

//How to Run

Install JSON Server (if not already):

npm install -g json-server


Start the server:

json-server --watch db.json


Open index.html in your browser

//API Endpoints

GET /films – get all movies

GET /films/:id – get one movie

PATCH /films/:id – update tickets sold

POST /tickets – log ticket purchase

DELETE /films/:id – delete a movie

//Notes

Available tickets = capacity - tickets_sold

Sold out movies show "Sold Out" and can’t be bought
