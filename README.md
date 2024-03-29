Deployed to: https://garbage-people.github.io/roskisAppFront/

![QRcode to GitHub Pages deployment](https://github.com/Garbage-people/roskisAppFront/blob/main/public/images/QRcodeLink.png)

# Lähiroskikset application
This is the front end code of "Lähiroskikset"-application.

## Description
This application provides the user a map based on their location and shows the user icons of trashcans which can be found nearby. 

When clicking on a trashcan icon, you will be given the possibility to change it by choosing between three different icons. Each icon is used to showcase a status. 

The colours of the trashcans

A green trashcan is used to show if a trashcan is available.
A red trashcan shows if the trashcan is full.
A grey trashcan is used when a trashcan is out of service.

## Technologies used on this project
This application was was implemented by creating a React+Vite project. This part of the project receives the trashcans locations from the backend through REST-interface.

In addition to installing the application locally, it is necessary to run the command npm install. Before you are able to run the necessary command, you might need to install Node.js. In order to install Node.js please turn to its documentation.

After running the necessary command and also installing the backend of this application, run npm run dev to start the application. The port which will be called is localhost:5173.

## The map
This application utilizes a map by OpenStreetMap. The OSM(OpenStreetMap) uses a JavaScript library called React Leaflet. More information on React Leaflet and OSM can be found here: https://react-leaflet.js.org/ and https://www.openstreetmap.org/about.

## Authors
Jani
Aleksi
Eino
Aaron
Minea

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
