CCM Provider React App
======================

This web application main purpose serves to act as a portal in to interface with a Provider API.  Users are able to search, display, and filter results from the CCM Provider database.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Gettin 'er goin
---------------

There are just a few steps in order to get this beauty of an application up and running locally.

1) Ensure that you have both NPM and NodeJS installed on your machine.  You can check this by running both commands below to see if a version number is returned to you.

    ```npm -v``` + ```node -v```

2) If you don't have either installed, you can download and install both of them at through Node's installer available on [NodeJS's website](https://nodejs.org/en/download/).

3) Ensure that you have git installed by running the following command.

    ```git -v```

4) If you don't have git installed, you can download it by following the directions available on [Git's website.](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

5) Now to the good part!  Clone this repo to your machine with the following command: 

    ```git clone https://github.com/mischlecht/ccm-react-app.git```

6) Enter into the directory that was just created:
    
    ```cd ccm-react-app```

7) Install all of the necessary node modules needed to run the app:
    
    ```npm install```

8) Once all dependencies are installed, you can fire up the application by running the following command:

    ```npm start```

9) This will build the project, start up a local node server to serve the app, and open your default browser to [localhost:3000](http://localhost:3000) where you can see the patent pending <b>CCM Provider Search Service™</b> at work!

&nbsp;

### TODO:
- Center Google Maps on zip code searched on
- Figure out Google Maps funny business happening in the browser console
- moar tests