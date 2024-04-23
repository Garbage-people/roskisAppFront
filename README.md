Deployed to: https://roskisappfront-frontend-garbagepeople.rahtiapp.fi/

![QRcode to CSC Rahti deployment](https://github.com/Garbage-people/roskisAppFront/blob/main/public/images/frontend_qrkoodi_rahti.png)

<!--LOGO -->
<br/>
<p align="center">
    <a href="https://github.com/Garbage-people/roskisAppFront">
    <img src="public/images/LähiroskiksetLogo.png" alt="Header">
    </a>
</p>

# Lähiroskikset application
This is the front end code of "Lähiroskikset"-application.

## Description
This application provides the user a map based on their location and shows the user icons of trashcans which can be found nearby. 

## The colours of the trashcans

A green trashcan is used to showcase if a trashcan is available.

A red trashcan shows if the trashcan is full.

A grey trashcan with black cross over it, is used when a trashcan is out of service.

## Functionalities in the app

The idea in the app is that users can update the trashcans statuses. 

When clicking on a trashcans icon, you will be given the possibility to change it by choosing between three different icons. Each icon is used to showcase a status. 

It is possible to find three different buttons on the page.

The button with the icon "i" contains information about the trash can icons.

It is also possible for the user to add trash can's on to the map. When adding a trash can the user will be met with a confirmation window.

## Technologies used on this project
This application was was implemented by creating a React+Vite project. This part of the project receives the trashcans locations from the backend through REST-interface.

In addition to installing the application locally, it is necessary to run the command:
```
 npm install. 
```

Before you are able to run the necessary command, you might need to install Node.js. In order to install Node.js please turn to its documentation.

After running the necessary command and also installing the backend of this application, run the command down below. It will start the application. The port which is used when running locally is localhost:5173.

```
 npm run dev 
```

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
