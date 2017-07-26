requirejs.config({
    "baseUrl": "../js/lib",
    "paths": {
        "app": "../app",
        "jquery": "jquery",
        "bootstrap": "bootstrap.min",
    },
    "shim": {
        "utils": {
            deps: ['Chart.bundle']
        },
        "bootstrap.min": {
            deps: ['jquery']
        }
    }
});

// Load the main app module to start the app
requirejs(["app/backend"]);
