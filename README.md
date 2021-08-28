## Movie app displayed using pagination
1. The component should make a request to the movie api and build a pagination component
2. The design should be fully responsive
3. The first and last buttons should be disabled as long as we are not in the last and first page available.
4. The next and previous buttons should be disabled as long as we are not in the last and first page available.
5. If the user click twice on the same page, the results should be cached so there are few requests to the database.
6. The pagination should show 10 elements per page

## Assumptions

*TODO: [ASSUMPTIONS_MADE_HERE]*

## Proposed Solution

- Create a HomePage component where we will display the list of movies
  - Inside the HomePage component create a movie interface for the movie object returned by the API
  - Create a List component which will render every single movie 
- Create a Pagination component to use it inside the HomePage component

## Screenshots
![alt text](https://github.com/CodeWithDragos/frontend-interview-pagination-AlexZahar/blob/master/pagination_task/example.png?raw=true)

## Libraries / Tools Used

- React.js
- Create React App for project setup
- TypeScript
- React Router and React Router Dom
- StyledComponents
- Cypress for end to end testing
  

## Setup

To install the dependencies run:

`npm install`

And to run the app:

`npm start`


### Running the tests

#### Unit Tests

You can run the unit tests using:

`npm test`

#### Integration Tests

To run Cypress in interactive mode run:

`npm run cy:start`

## SOLID Principles

The SOLID concepts are

The Single-responsibility principle: "There should never be more than one reason for a class to change."[5] In other words, every class should have only one responsibility.[6]
The Open–closed principle: "Software entities ... should be open for extension, but closed for modification."[7]
The Liskov substitution principle: "Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it."[8] See also design by contract.[8]
The Interface segregation principle: "Many client-specific interfaces are better than one general-purpose interface."[9][4]
The Dependency inversion principle: "Depend upon abstractions, [not] concretions."[10][4]

## DRY 

- Dont repeat youself