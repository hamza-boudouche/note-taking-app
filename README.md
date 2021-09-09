# note-taking-app

- [note-taking-app](#note-taking-app)
	- [Description](#description)
	- [Setup](#setup)
		- [Database](#database)
		- [Server](#server)
	- [Usage](#usage)
	- [Used stack and libraries](#used-stack-and-libraries)
		- [Frontend](#frontend)
		- [Backend](#backend)
	- [Impovements](#impovements)

## Description

This is a browser based note taking app written in HTML5, CSS3, and Typescript on the frontend, and node.js with Typescript and MongoDB on the backend.

## Setup

### Database

Setting up the MongoDB database can be done in 2 ways:

- With a local database: [Install](https://docs.mongodb.com/manual/installation/) MongoDb on your machine and set an environment variable as follows:

      URI=mongodb://localhost:27017/notes

- With a remote database running on MongoDB Atlas, for which you will [get the connection string](https://docs.mongodb.com/manual/reference/connection-string/) and set it as an environnement variable on your systeme named URI.

### Server

After [cloning](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) this repository, you can host the server on your local machine by opening the terminal, changing the working directory to where you just cloned the project, and running the following commands :

```
npm install
npm run build
npm run start
```

This will run developpement mode. The production ready code will be available soon (after the removale of certain debugging middleware).

Another script is available for a more suitable development environnement that reloads the server automatically everytime a change is made to the source files (ending in a `.ts` extension), and can be fired up with the following command:

```
npm run dev
```

This implies that you have already executed the `npm install` command to install the required dependencies.

## Usage

After setting up the server, you can go to the url `http://localhost:3000` in you browser of choice (tests have been conducted on Firefox and Chrome).

The app offers multiple functionalities:

- Separating the notes into multiple categories, each having a title describing the category and a subject to which it belongs.
- The title of each category can be changed by hovering over it and clicking the pen icon.
- Categories can be deleted by hovering over them and clicking the trash icon.
- Clicking on a category makes only the notes that belong to that category render on the screen.
- Each note has to belong to a category, and has to have a title, and an optionnal body.
- Each note's title and body can be changed by clicking on it and editing the two fields (note title and note body).
- Notes can be deleted by hovering over them and clicking the trash icon.
- A search functionality is available through the `search` bar in the top middle of the screen and can be used to search for notes that contain the keywords given in the search bar.
- Showing all the available notes and categories by clicking on the button with the stack icon in the top right of the screen.
- Adding a new note by clicking on the button with the add file icon in the top right of the screen.

## Used stack and libraries

### Frontend

- Languages:
  - HTML
  - CSS
  - Typescript
- Libraries:
  - Sweetalert2

### Backend

- Languages/environnements:
  - Node.js (with Typescript)
- Libraries:
  - Express.js
  - Mongoose
  - Morgan (for development)
  - Nodemon (for development)
  - Dotenv (for development)

## Impovements

- Adding authentification and authourization.
- Adding optionnal sub-categories for more flexibility.
- Adding the option the change a note's category.
