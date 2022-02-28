# CarOnSale Backend Challenge

This is a backend project as a challenge for the company CarOnSale.

## Project Structure
- The project was designed to make HTTP requests for the CarOnSale API. For this purpose I used `axios` lib, doing a implementation for the interface `IHTTPClient`. This is one of the main advantages of using interfaces, it is possible to change the implementation, in this case we could change the HTTP client framework to any other and be able to run our project, since it only expect the interface functions.

### Main Folders
```
services - Business services folder
utils - Utils folder with generic services
```
- Each service are divided in three subfolders:
    1. `interface` - it is where the interface file are. With its specific functions.
    2. `classes` - it is where the implementations of the interface are.
    3. `domains` - it is the 'objects' folder. Where I define some interfaces with some attributes to be used in the project.

## Prerequisites
- Node.js v12.x or greater

## To Run
1. Run `npm install` from this repository to get the required libs.
1. Run `npm start` to run the project and see the result of challenge.

## Testing
- The testing is the project was designed to the test the `ICarOnSaleClient` and its functions (`authenticate` and `getRunningAuctions`). The testing was entired thing of based on Car On Sale Challenge.

### To Run Tests
 - Run `npm test` to run scenarios of unit tests for the `ICarOnSaleClient`.

 ## Notes
  - This was the first time I used `inversifyjs`, so probably it was not so could because I do not know all its main functionalities.
  - I could have made more scenarios of testing for the `ICarOnSaleClient`, specially for the `getRunningAuctions` function.
  - The implementation of the `ILogger` can be better. It could check log levels by an environment variable and show the related ones.
