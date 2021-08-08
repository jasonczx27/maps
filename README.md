# maps

SPA inReactjs with API in Node to utilize customer
developed on MacOS BigSur 11.1, 
node -v@16.4.0
npm -v@7.19.1

##features
 - able to look for closest office and focus upon retrieving user's location

## procedure
! Make sure you have node and npm installed, also with nodemon
clone this project https://github.com/jasonczx27/maps into your cloning environment
### api
0. Make sure port 8000 is not blocked by firewall or other security entities, in localhost.
1. navigate to api
2. run command npm install, if the installation wasn't successful, refer to {I see installation error while running npm install!} below
3. run 'nodemon app.js' or in Linux system, 'npx nodemon app.js' within the directory of api
4. as the databse is a free version, wait till you see the following ## database connected....database initiating successful
5. if it does not work, run rs at the same terminal you start the app, or kill process and rerun, as connection to database was slow

### web
0. make sure port 3000 is not blocked by firewall or other security entities, in localhost.
1. navigate to web
2. run command npm install, if the installation wasn't successful, refer to {I see installation error while running npm install!} below
3. run 'npm start'
4. You owuld be redirected to the map interface

## I see installation error while running npm install!
1. Check if package.json is present in first layer of the project module, 'api' and 'web', there should be 2 and in right place
2. You would like to remove the current node_modules, in shell script: 'rm -rf /node_modules' at the respective proejct module, run 'npm install'
3. Try to delete the package-lock.json as well if you're still stuck after steps 1-2, run 'npm install' after done so.
#Dependencies
MAP - google-map-react - https://www.npmjs.com/package/google-map-react
Geolocations - geolib - https://www.npmjs.com/package/geolib

## The map isn't working or isn't moving me to closest office as expected!
1. You may want to allow location permission on browser/system
2. If you encounter map issue, open the console interface from 'inspect elements', screenshot and provide to me


# Showcase
![image](https://user-images.githubusercontent.com/68674815/128631913-4ee21fa2-2f42-4fdc-b94b-cc4c86051e6d.png)
![image](https://user-images.githubusercontent.com/68674815/128632153-02a7d454-834f-4790-9f23-6b1add144940.png)






