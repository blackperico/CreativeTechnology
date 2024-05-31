# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# CreativeTechnology
Is IT-oriented website acting as an online store for pc games. Having bright colors and displaying items to the client where both conditions are satisfied: readability of the content displayed and modern style approaches with attention to details ensuring smooth navigation through what website has to offer. Each element present in this project that has some kind of functionality(expand/shrink, copy, link, ...) attached to it is 'marked' by special styles of which every is unique depending on event to be fired. Beside serving a functional purpose, the transitions and animations are thoughtfully implemented in fluid and modern manners. Each transition is carefully designed to ensure smooth and catchy motions.

This project reflects my level of structuring, styling, coding and adapting an element to page. Before starting to implement elements and their JS code great attention is paid to every aspect of that element. Possible 'conflicts' inside code are noted at the 'planning phase' where everything is taken into account.
1)HTML
Picking up best approach to structure easy-to-understand HTML tree where everything is logically organized with carefully chosen names corresponding to the context displayed in it. My goal was to build HTML tree in logical and intuitive manner, ensuring that each component's purpose is clear and easily identifiable.
Positions of layout components are chosen on the page after which composite components are inserted, and lastly filled up with atomic components representing an article or product. Each level of component present in an HTML tree is responsive and named with consistency to reflect context of that element.
2)CSS
Overall look of a website is colorful, modern and clean with responsive designs. Each element is styled uniquely but providing clean and readable sight with smooth and catchy indications of possible interactivity. If an element has an event attached to it ready to be fired(click, expand, link, open, change picture, ...) it will have unique styles applied to it serving as indication that it is interactive. So everything interactive on website is 'marked' by unique styles applied by either CSS or JS. To ensure smooth, fluid and catchy motions, some transitions/animations are even separated in multiple steps(logical units). Styles to be applied to interactive elements are chosen depending on type of functionality they have.
One part of website's responsiveness is done in CSS, often regarding layout and composite components. Other part of responsiveness is done in JavaScript due to the fact that certain elements require new calculations and values when resized in order to function as intended.
3)JSON
Having no database expertise yet, JSON is used to store certain data and act as an DB.
Properties and their values are defined inside an object representing each product/article inside JSON. Those JSON objects are done accordingly to the html structure so they are organized in most readable and easy-to-use way. JSON file is structured having in mind the future use of these objects inside React so they are organized in an clean and intuitive logical unit so these properties and possible nested objects are easily looped through and used.
4)React
