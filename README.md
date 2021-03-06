# Barefeed
A simple feed reader web app for podcasts. No registration. No cookies.

This is the frontend application using Vue.js.
For the corresponding REST API, see [this repository](https://github.com/cdrcqnts/barefeed-rest).

### Demo
For a working demo [CLICK HERE](https://musing-borg-502f37.netlify.com/).

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
// Serves the project at localhost:1234
yarn serve 
```

### TODO
- Button Tooltips
- Feed crawling fo given domain

#### License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/cdrcqnts/barefeed/blob/master/LICENSE) file for details.