(function() {
    'use strict'

    const applicationServerPublicKey = 'AIzaSyAmferqQ9L79uCyLfyFBP04qH7H_OCLFp0';



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
                applicationServerKey: this.applicationServerKey
            }).then(subscription => {
                console.log(subscription);
            }).catch(error => {
                console.error('subscription error', error)
            })
        }
    }


    var Sub = new PushSubscription(applicationServerPublicKey)

    Sub.init()
})()