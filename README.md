


# TO RUN:

1. Install docker

2. To install and start the app run the following in the project root:

```docker-compose up --build -d```

There seems to be some sort of timing issue and spring fails to create the mysql connection pool because mysql hasn't started - you might need to run the above command again

3. Open the following URL in your browser:

```http://localhost:3000/```


To run locally:

* Install mysql
* Install maven
* Install npm
* Run server 
* Run client

To run server locally:

* cd server
* mvn  clean -Dmaven.test.skip=true
* mvn  compile -Dmaven.test.skip=true
* mvn  package -Dmaven.test.skip=true
* java -Dspring.datasource.url=jdbc:mysql://localhost:3306/backend -Dspring.datasource.username=root -Dspring.datasource.password=******* -jar ./target/Backend-0.0.1-SNAPSHOT.jar

To run client locally:

* cd client
* npm install
* npm run start

# TODO:

* Auto scroll satellite list to the satellite that is hovered over on the map.
* A slider to control the animation speed
* Slider controls for entry of latitude / longitude (and an toggle to switch to manual entry)
* Ability to click and drag on a satellite on the map to set it's bearing and speed according to the angle and distance the mouse cursor is moved from the satellite
* Ability to persist bearing and speed data separately to satellite data (not persisted at present)
* Click on a satellite in the map to open the existing edit form
* Display a satellite using an icon of a satellite
* Highlight any satellites that come too close to each other 
* Reposition tooltip dynamically / or display details elsewhere
* Optionally store satellite data in the browser data store
