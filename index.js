(function() {
    'use strict'

    const applicationServerPublicKey = 'BDSY9OtPoOFFq8XpQNhnX_c2ZVRH_OZSaG5Ku9NPwagPYKylVxKs9QQSV5iIQ6jpHzcYYccoSrt-ZW7Yo6vVxDg';



    class PushSubscription {


        constructor(publicKey) {
            this.publicKey = publicKey;
        }


        init() {
            this.swRegistration().then(registration => {
                console.log('Service Worker is registered', registration);
                this.pushSubscribe(registration)
            }).catch(function(error) {});
        }

        swRegistration() {
            return new Promise((resolve, reject) => {
                navigator.serviceWorker.register('sw.js').then(registration => {
                    resolve(registration);
                }).catch(error => {
                    reject(error)
                })
            })
        }

        pushSubscribe(registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                /* applicationServerKey: this.applicationServerKey */
            }).then(subscription => {
              registration.showNotification('Hola Mundo');
                console.log(subscription.endpoint);
            }).catch(error => {
                console.error('subscription error', error)
            })
        }
    }


    var Sub = new PushSubscription(applicationServerPublicKey)

    Sub.init()
})()