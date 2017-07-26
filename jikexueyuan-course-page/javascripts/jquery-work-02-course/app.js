requirejs.config({
    "baseUrl": "../../javascripts/jquery-work-02-course/lib",
    "paths": {
      "app": "../app"
    }
});

// Load the main app module to start the app
requirejs(["app/course"]);