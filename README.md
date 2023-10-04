# Posts List Application

This is a simple React Native application showcasing a list of posts. The application has features such as pagination, searching, and sorting. It uses Redux for state management and provides a user-friendly interface for browsing posts.

## Features:

1. **Search**: Allows users to search through posts by their title or body.
2. **Sort**: Users can sort the posts based on their ID, title, or body.
3. **Pagination**: Posts are paginated for a better viewing experience.
4. **Error Handling**: Displays an error message in case of any loading failures.
5. **Loading Indicator**: Shows an activity indicator while the posts are being fetched.

## Expo Installation:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` or `yarn` to install the dependencies.
4. Start the application using `npm run start` or `yarn start`.
5. Scan the qr code with the [Expo Go](https://expo.dev/client) app or run it in an android emulator or ios simulator.

## Usage:

1. Once the application is running, you will be presented with a search bar at the top.
2. Below the search bar, there are buttons to sort the list of posts.
3. As you scroll down, you'll see the list of posts.
4. At the bottom, pagination buttons allow you to navigate between different pages of posts.

## Dependencies:

- @reduxjs/toolkit
- axios
- expo
- expo-status-bar
- react
- react-native
- react-redux

## License:

[MIT](https://choosealicense.com/licenses/mit/)