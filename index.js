(function() {
    'use strict'

    const applicationServerPublicKey = 'BDSY9OtPoOFFq8XpQNhnX_c2ZVRH_OZSaG5Ku9NPwagPYKylVxKs9QQSV5iIQ6jpHzcYYccoSrt-ZW7Yo6vVxDg';

    let swRegistration;

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');
      
        navigator.serviceWorker.register('sw.js')
        .then(function(swReg) {
          console.log('Service Worker is registered', swReg);
      
          swRegistration = swReg;
        })
        .catch(function(error) {
          console.error('Service Worker Error', error);
        });
      } else {
        console.warn('Push messaging is not supported');
        pushButton.textContent = 'Push Not Supported';
      }
})()