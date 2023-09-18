
# Ryanair Automated Testing

This project utilizes the Selenium WebDriver to automate a workflow of booking a flight on the Ryanair website. The project follows the Page Object Model (POM) pattern to organize the code in a way that separates the page logic from the test scripts, making the codebase more maintainable and scalable. The project uses node.js with javascript. Unit testing is preformed with the mocha framework. 

## Project Structure

- **pageObjects**: Contains classes that represent individual pages of the Ryanair website.
- **utils**: Houses utility classes and methods that can be reused across different tests.
- **Resources**: Includes a file where all the selectors used in the project are defined.
- **Tests**: Each class in this directory represents a set of related tests, often corresponding to a specific page or workflow on the Ryanair website.
- **Main Test File**: ryanairTest.js - All tests are called and ran in this file.


## Prerequisites

- [Node.js](https://nodejs.org/) - 16.4.1
- [Selenium WebDriver](https://www.selenium.dev/) - 4.12.0
- [Mocha](https://mochajs.org/) - JavaScript test framework - 10.2.0

- **Optional Not Required** 
- [Docker](https://www.docker.com/) - 24.0.6
- [Docker Compose](https://www.docker.com/) - 2.21.0




## Getting Started

Clone the repository from GitHub/Bitbucket to your local machine.

```sh
git clone https://github.com/ConnalATU/RyanairTest_Node
```

Navigate to the project directory and install the necessary npm packages:

```sh
cd <project_directory>
npm install
```

## Running the Tests

### Using Mocha

Run the Mocha tests using the following command:

```sh
mocha ryanairtest.js
```

This will execute all the tests defined in the `ryanairtest.js` file.

### Using Docker

1. Ensure you have Docker and Docker Compose installed on your system. You can download them from [Docker's official website](https://www.docker.com/).
   
2. Create a `Dockerfile` in your project directory with the necessary configurations to set up the environment for your Node.js application. Here is a example of what your `Dockerfile` might look like: Note : All dockerfiles have been uploaded to the github repo. Skip steps 2 and 3 if downloaded from repo.

   ```dockerfile
   # Use the official Node.js 16.4.1 image
FROM node:16.4.1

# Set the working directory
WORKDIR /usr/src/app

# Copy package* files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy local code to the container
COPY . .

# Expose port 80
EXPOSE 80

# Run the command to start your application
CMD [ "npm", "test" ]

   ```

3. Next, create a `docker-compose.yml` file in your project directory with the following content:
 Note: Change The image name if using a new image/directory
   
 ```yamal
   version: '3.8'
   
   services:
     app:
       build: .
       volumes:
         - .:/usr/src/app
       environment:
         - NODE_ENV=development
    ```

4. Open a terminal and navigate to your project directory (the directory where the `docker-compose.yml` file is located).

5. Run the following command to build your Docker image:

   ```sh
   docker-compose build
   ```

6. After building the image, you can start the application with:

   ```sh
   docker-compose up
   ```

7. The tests should now run inside a Docker container. 


**Note**: Before running the tests with Docker, remove the comment from the Selenium server line in the `ryanairtest.js` file:

```javascript
// const seleniumServer = "http://selenium:4444/wd/hub";
```

**Docker Image**: The Docker image can be pulled and ran from this Docker Hub Repo Command - 

```
docker pull connalreilly/new
```


## Test Workflow

The automated test script follows these steps with corresponding assertions:

1. Navigate to the [Ryanair home page](https://www.ryanair.com/) and confirm it is loaded.
2. Conduct a flight search with specified parameters (e.g., departure and return dates, number of persons) and validate the results page with the correct details.
3. Select suggested flights (e.g., “Regular” option) and verify the visibility of the "Log in to myRyanair" and "Passengers" sections.
4. Opt to "Log in later" and assert that the "Passengers" section becomes active.
5. Fill in valid details in the "Passengers" section, proceed, and confirm the navigation to the seat selection page for the first flight.
6. Select seats for the outbound flight, move to the next flight, and affirm the seat selection page for the return flight is displayed.
7. Choose seats for the return flight and proceed to validate that the baggage selection page is loaded.

**Video of Working Test with Mocha Framework**

[![Alternate Text](https://img.youtube.com/vi/NZMK8TiMSVg/0.jpg)](https://www.youtube.com/watch?v=NZMK8TiMSVg)


**Video of Working Test with Mocha Framework in Docker**

[![Alternate Text](https://img.youtube.com/vi/dWCWvD0nRVA/0.jpg)](https://www.youtube.com/watch?v=dWCWvD0nRVA)




