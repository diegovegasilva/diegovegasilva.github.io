(function(app) {
    'use strict'

    var config = {
        apiKey: "AIzaSyAmferqQ9L79uCyLfyFBP04qH7H_OCLFp0",
        authDomain: "push-notification-test-dfd1f.firebaseapp.com",
        databaseURL: "https://push-notification-test-dfd1f.firebaseio.com",
        projectId: "push-notification-test-dfd1f",
        storageBucket: "push-notification-test-dfd1f.appspot.com",
        messagingSenderId: "665202717158"
    };

    firebase.initializeApp(config);
    const messaging = firebase.messaging();


    messaging.usePublicVapidKey("BImFmvzyny5vYeR6_PlKHibuqQg5wgexzVfZGZiwbfA_Wce2qaWrBdci6OpXvxdD0Syv2vG5q5HKe6NmlqrwCIA");


    const tokenDivId = 'token_div';
    const permissionDivId = 'permission_div';
    // [START refresh_token]
    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(function() {
        messaging.getToken().then(function(refreshedToken) {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            setTokenSentToServer(false);
            // Send Instance ID token to app server.
            sendTokenToServer(refreshedToken);
            // [START_EXCLUDE]
            // Display new Instance ID token and clear UI of all previous messages.
            resetUI();
            // [END_EXCLUDE]
        }).catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
            showToken('Unable to retrieve refreshed token ', err);
        });
    });
    // [END refresh_token]
    // [START receive_message]
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage(function(payload) {
        console.log('Message received. ', payload);
        // [START_EXCLUDE]
        // Update the UI to include the received message.
        appendMessage(payload);
        // [END_EXCLUDE]
    });
    // [END receive_message]
    function resetUI() {
        clearMessages();
        showToken('loading...');
        // [START get_token]
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then(function(currentToken) {
            if (currentToken) {
                console.log(`current token => ${currentToken}`)
                sendTokenToServer(currentToken);
                updateUIForPushEnabled(currentToken);
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                updateUIForPushPermissionRequired();
                setTokenSentToServer(false);
            }
        }).catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
            showToken('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);
        });
        // [END get_token]
    }

    function showToken(currentToken) {
        // Show token in console and UI.
        var tokenElement = document.querySelector('#token');
        tokenElement.textContent = currentToken;
    }
    // Send the Instance ID token your application server, so that it can:
    // - send messages back to this app
    // - subscribe/unsubscribe the token from topics
    function sendTokenToServer(currentToken) {
        if (!isTokenSentToServer()) {
            console.log('Sending token to server...');
            // TODO(developer): Send the current token to your server.
            setTokenSentToServer(true);
        } else {
            console.log('Token already sent to server so won\'t send it again ' +
                'unless it changes');
        }
    }

    function isTokenSentToServer() {
        return window.localStorage.getItem('sentToServer') === '1';
    }

    function setTokenSentToServer(sent) {
        window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }

    function showHideDiv(divId, show) {
        const div = document.querySelector('#' + divId);
        if (show) {
            div.style = 'display: visible';
        } else {
            div.style = 'display: none';
        }
    }

    app.requestPermission = function() {
        console.log('Requesting permission...');
        // [START request_permission]
        var input = document.querySelector('#username');
        if(input.value && input.value !== ''){
            messaging.requestPermission().then(function() {
                console.log('Notification permission granted.');
                // TODO(developer): Retrieve an Instance ID token for use with FCM.
                // [START_EXCLUDE]
                messaging.getToken().then(function(currentToken) {
                    writeUserData(input.value, currentToken)
                    resetUI();
                })
                // In many cases once an app has been granted notification permission, it
                // should update its UI reflecting this.
                // [END_EXCLUDE]
            }).catch(function(err) {
                console.log('Unable to get permission to notify.', err);
            });
        } else{
            alert('debes introducir tu nombre')
        }
        // [END request_permission]
    }

    app.deleteToken = function() {
        // Delete Instance ID token.
        // [START delete_token]
        messaging.getToken().then(function(currentToken) {
            messaging.deleteToken(currentToken).then(function() {
                console.log('Token deleted.');
                setTokenSentToServer(false);
                // [START_EXCLUDE]
                // Once token is deleted update UI.
                resetUI();
                // [END_EXCLUDE]
            }).catch(function(err) {
                console.log('Unable to delete token. ', err);
            });
            // [END delete_token]
        }).catch(function(err) {
            console.log('Error retrieving Instance ID token. ', err);
            showToken('Error retrieving Instance ID token. ', err);
        });
    }
    // Add a message to the messages element.
    function appendMessage(payload) {
        const messagesElement = document.querySelector('#messages');
        const dataHeaderELement = document.createElement('h5');
        const dataElement = document.createElement('pre');
        dataElement.style = 'overflow-x:hidden;';
        dataHeaderELement.textContent = 'Received message:';
        dataElement.textContent = JSON.stringify(payload, null, 2);
        messagesElement.appendChild(dataHeaderELement);
        messagesElement.appendChild(dataElement);
    }
    // Clear the messages element of all children.
    function clearMessages() {
        const messagesElement = document.querySelector('#messages');
        while (messagesElement.hasChildNodes()) {
            messagesElement.removeChild(messagesElement.lastChild);
        }
    }

    function updateUIForPushEnabled(currentToken) {
        showHideDiv(tokenDivId, true);
        showHideDiv(permissionDivId, false);
        showToken(currentToken);
    }

    function updateUIForPushPermissionRequired() {
        showHideDiv(tokenDivId, false);
        showHideDiv(permissionDivId, true);
    }
    resetUI();


    if ("serviceWorker" in navigator) {
        if (navigator.serviceWorker.controller) {
            console.log("[PWA Builder] active service worker found, no need to register");
        } else {
            // Register the service worker
            navigator.serviceWorker
                .register("sw.js", {
                    scope: "./"
                })
                .then(function(reg) {
                    console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
                });
        }
    }


    const database = firebase.database();

    function writeUserData(name, token) {
        console.log('write')
        firebase.database().ref('users').push({
            username: name,
            token: token,
        });
    }

})(window)