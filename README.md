# Barefeed
A most simple feed reader web app for podcasts. No registration. No cookies.

### How it works
A random unique key is generated when the user adds a feed.
The key is mapped as a parameter to the url. All further feeds added by the user are linked with the same key.
Barefeed therefore does not require any personal user data. 
No cookies are stored, the data is queried exclusively on the basis of the URL parameter key.

### Install
```
yarn install
```

### Run
```
// serves the project at localhost:1234
yarn serve 
```

This is the Vue.js frontend application which connects to the corresponding REST API, see:
https://github.com/cdrcqnts/barefeed-rest

#### License
This project is licensed under the MIT License. See the LICENSE file for details.