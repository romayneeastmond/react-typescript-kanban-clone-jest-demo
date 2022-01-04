# React TypeScript Demo Project with Jest Test Suites

This project shows the basic features associated with creating a vanilla React application using TypeScript. It is a Kanban task board that uses react-beautiful-dnd for drag and drop functionality; highly influenced by the GitHub project layout. Additionally uses testing with Jest and React Testing Library.

## How to Use

Run an npm install or update
```
npm i
```

Start the project by using the following
```
npm run start
```

Then navigate to the default React location http://localhost:3000

## How to Use Jest Test Suites

These suites can be run using either of the following
```
npm run test 
```

or
```
npm run test:watch
```

## Deploying to Azure

In the General settings tab within the Configuration blade, add the following Startup Command
```
pm2 serve /home/site/wwwroot --no-daemon --spa
```

Then deploy the build folder after running the following command
```
npm build
```

## Copyright and Ownership

All terms used are copyright to their original authors.

## Live Demo

Live demo hosted in Microsoft Azure [React TypeScript Demo Project](https://dev-react-typescript-demo-re01.azurewebsites.net/).