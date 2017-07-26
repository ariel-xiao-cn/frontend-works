requirejs.config({
    "baseUrl": "../js/mobile/lib",
    "paths": {
        "app": "../app",
        "jquery": "jquery",
        "bootstrap": "bootstrap.min",
    },
    "shim": {
        "bootstrap.min": {
            deps: ['jquery']
        }
    }
});

// Load the main app module to start the app
requirejs(["app/mobilemain"]);
