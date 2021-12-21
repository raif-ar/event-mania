# eventMania

Bringing you all your favorite events in one place!

## Getting started

This project is built using Vue 3 with vue cli.
This application is dependent on the Ticketmaster Discovery API v2.

To run it on your local machines, follow the below steps:

### 1. Clone it on your local machines

Clone it using git. The repository url is https://github.com/raifofcl/event-mania.git

### 2. Install the dependencies

Run the following command inside the project folder to install the dependencies -

```
npm install
```

### 3. Run it locally

Run the following command to bootstrap the application locally -

```
npm run serve
```

## Note

1. The following libraries used are not stable for production. These version were used because only the preleases supported Vue 3 -

- v-calendar (3.0.0-alpha.6)
- vue-select (4.0.0-beta.1)

** Please take caution and understand the consequences before using them in your production application **

2. The API key is hardcoded in the axios instance configuration. It will be rendered invalid by me very soon.
** DO NOT USE IT IN ANY OF YOUR APPLICATIONS **
