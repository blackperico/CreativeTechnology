# CreativeTechnology
Is IT-oriented website acting as an online store for pc games. Having bright colors and displaying items to the client where both conditions are satisfied: readability of the content displayed and modern style approaches with attention to details ensuring smooth navigation through what website has to offer. Each element present in this project that has some kind of functionality(expand/shrink, copy, link, ...) attached to it is 'marked' by special styles of which every is unique depending on event to be fired. Beside serving a functional purpose, the transitions and animations are thoughtfully implemented in fluid and modern manners. Each transition is carefully designed to ensure smooth and catchy motions.

This project reflects my level of structuring, styling, coding and adapting an element to page. Before starting to implement elements and their JS code great attention is paid to every aspect of that element. Possible 'conflicts' inside code are noted at the 'planning phase' where everything is taken into account.
## 1)HTML
Picking up best approach to structure easy-to-understand HTML tree where everything is logically organized with carefully chosen names corresponding to the context displayed in it. My goal was to build HTML tree in logical and intuitive manner, ensuring that each component's purpose is clear and easily identifiable.
Positions of layout components are chosen on the page after which composite components are inserted, and lastly filled up with atomic components representing an article or product. Each level of component present in an HTML tree is responsive and named with consistency to reflect context of that element.
## 2)CSS
Overall look of a website is colorful, modern and clean with responsive designs. Each element is styled uniquely but providing clean and readable sight with smooth and catchy indications of possible interactivity. If an element has an event attached to it ready to be fired(click, expand, link, open, change picture, ...) it will have unique styles applied to it serving as indication that it is interactive. So everything interactive on website is 'marked' by unique styles applied by either CSS or JS. To ensure smooth, fluid and catchy motions, some transitions/animations are even separated in multiple steps(logical units). Styles to be applied to interactive elements are chosen depending on type of functionality they have.
One part of website's responsiveness is done in CSS, often regarding layout and composite components. Other part of responsiveness is done in JavaScript due to the fact that certain elements require new calculations and values when resized in order to function as intended.
## 3)JSON
Having no database expertise yet, JSON is used to store certain data and act as an DB.
Properties and their values are defined inside an object representing each product/article inside JSON. Those JSON objects are done accordingly to the html structure so they are organized in most readable and easy-to-use way. JSON file is structured having in mind the future use of these objects inside React so they are organized in an clean and intuitive logical unit so these properties and possible nested objects are easily looped through and used.
## 4)React
### index.js
Main file rendering layout components and holding export constant that indicates whether user is using touch-screen device or not, which is later used in components where functionalities require certain input events(objects returned from mouse and touch events differ). It also has a log-in state. When user logs in, account data is stored using Storage API so inside index.js is a function looping through sessionStorage to see if user is logged in or not. State's value and function are passed as props to Header component as it is responsable for account operations(log in, create account, reset password). BrowserRouter is used for navigation through website's pages wrapped around Layout (header and footer).
### Header
This component is composed of 2 parts, upper one showing social media links, logo serving as link to home page and email and phone number. Upon clicking on email or phone icon, email address/phone number that is displayed inside html or contained inside element's attribute is being copied using Navigator.clipboard API (if it's available) and text is now ready to be pasted. If Navigator.clipboard API is not supported by user's device then code that manually selects>copies>unselects is ran, using document.selectRange and window.getSelection methods.
Lower part of Header is a navigation unordered list of links. When user scrolls the page value of scroll is picked and compared to upper header's height ensuring that navigation element is always fixed to the top as user scrolls. When nav element is fixed it changes background-image so only part of nav element that has content (links) is being colored differently than the rest of element that has neutral colors. This is achieved by using getBoundingClientRect method that checks for first element's left position and last element's right position on page depending on which colors are moved corresponding to the content.
If user is logged in, instead of 'Log in' link there will be displayed account's picture that opens profile's element for additional 'settings'. Header imports log-in state from index.js it's function to change value as it offers option to log out.
### Footer
In order to ensure maximum responsiveness and make it fit on every screen nicely, footer's responsiveness isn't based on CSS properties only but it renders one of two possible JSX structures depending on screen's width. For wider screens it will have in line: h1 element, page navigation links, social media links and underneath it few 'boxes' containing links. While for smaller screens first line is going vertically (column) and those 'boxes' are now column elements displaying links group's name and arrow indicating it can be expanded/shrinked, upon click it flips the arrow and shows/hides links.
### Home page
Home page is very simple, it has 3 containers sorted in a row of which 1 is main, used to display main content (products), and other 2 are side containers inserted with components that render expandable fixed elements for articles/news. Home.js imports components which are then rendered using objects derived from JSON files as props. One of these components is FunkyBox. Home.js holds an array of objects where each entity represents an FunkyBox and has properties: multiple colors, title, and json (property whose value is name of json to be looped). For each instance of this array FunkyBox is rendered and these instances are passed as props so each FunkyBox has its own colors.
### FunkyBox
FunkyBox is component that renders container with title and unique colors to each element present. It has smooth transitions and styles for hovering, letting the user know it can be closed/opened. In order to render an FunkyBox all that is left to do is to modify array of objects inside Home.js, give it colors, title, and name of json file holding the products to be displayed in this container. FunkyBox.js renders this container and within it calls another component passing it products variable derived from json file.
### FunkyContainer
Is an atomic component that returns container to be displayed within FunkyBox. This container is filled with elements and data as it loops through 'products' (prop) and for each product it creates an element as it follows: Wrap, upper part of wrap is main image and at its bottom array of other images that can be clicked and displayed instead of current main image, in which case an svg icon is displayed ('x') that is used to 'close' the current image and display original main img. If this array of images is wider than its container, an indication will be shown in the form of a background color. Depending on clients device, whether it is touch-screen or mouse and keyboard, event listeners are applied that allow both cases to drag this array of images. Implementing different functions and styles I have made it that in case of user over-dragging there will be an element indicating that, element moves corresponding to mouse/touch both vertical and horizontal movements. Lower part of each product's container is title, left part used for tags, right for buy button, price, possible discount % and new price, and an text 'Reviews'. I organized JSON files corresponding to my needs so properties are easily logically looped through and rendered elements' attributes and inner texts are filled.
### Articles
Is an component that loads JSON filled with IT-related articles where each entity has properties such as: title, author, date, image and array of paragraphs. For each instance in JSON file, component Articles calls an function and renders new article within itself. Depending on amount of HTML elements (articles) inserted, and their total height, scroll functionality is implemented. Path for scroll indicator is inserted and scroll bar within it, scrolling Articles is covered for: mouse click and drag movements, wheel scrolling and touch scrolling. Scrolling functionality works in a way where heights of scroll path and all articles' wrapper are compared and equivalent of 1px of articles' wrap is calculated to scroll path, ensuring that scroll bar will move according to wrapper movement. This way scrolling is working fine without worrying about articles' wrapper height as it will work for every value just as fine. If amount of articles to be inserted is not many (low heights) scrolling functionality will not be rendered. Window.innerheight is used instead of outerheight in order to accomplish comfort for phone users when scrolling, so it doesn't go behind phone's UI.
Depending on scroll value (window's scroll) element Articles can be either of normal page's flow or position fixed. As position fixed removes element from normal document flow I still managed to achieve it manually if possible, depending on screen's width. So when expanding/closing the Articles element rest of element's will move according to its transition animation's motion.
Element Articles appears as an box-icon on page which can be clicked and expanded. Expanding/shrinking transitions are done in 2 phases, respectively. These 4 phases are contained within an object for easier usage. Code tracks current state of element, as each phase of transition runs it applies new current phase to an variable, which is used when deciding which styles should be applied upon clicking. This also allows for cancelation of current transition and rolling back to previous state when clicked during animation, so element responds to every click. Animations transitions are done in an smooth and catchy motion.
When clicked, it runs function that is the first phase of expanding/closing where either height or width is first changed, and second phase is ran by event listener for transitions. Within even listener function I set conditions questioning whether transition that just ended is of property 'height' or 'width' depending on which second phase is called and applied to element.
### Main-right

### Account Operations
Link to 'Log in' is placed inside navigation menu. It opens page with container serving as log in form that has links to 'Reset password' and 'Create account'. As I have no expertise yet in SQL and back-end only working functionality of these 3 is Log in, also this is covered by JSON. JSON file contains array of objects where each object represents an account defined by properties: email, username, password, id and image. Images are placed in dedicated folder that is search for certain name-image property's value. Log in functionality is centralized over an function that is used for finding possible errors and outputting response message corresponding to errors found. If no errors are returned, it loops over JSON's response comparing credentials of input data with those present in JSON. If credentials filled in form fit those in JSON, user is logged in, account id value is picked from JSON's object and stored inside localStorage then user's url is set to home page of website. When user is logged in, instead of 'Log in' link in navigation menu there is now his image (image property's value) upon whose click it opens an container offering certain 'account settings'. Among these settings is a 'Log out' link, only working 'setting' of these that removes data from localStorage about account and refreshes the page leaving the user logged out. All 3 containers of these functionalities are covered by same CSS file for easier maintenance. When user submits his inputs function is purposely delayed using setTimeout and loading animation is fired inside submit button mimicking loading process.