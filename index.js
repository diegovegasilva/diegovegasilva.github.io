(function() {
    'use strict'

    const applicationServerPublicKey = 'BA28Y9GkYABWU7xCr1DLjp52dLAHG_K73R1AsYHRM_uGGZ2ir2nW3ZRzngtZPRV_47W5blSPsezp3AM0aMBBV20';



    class PushSubscription {


        constructor(publicKey) {
            this.publicKey = publicKey;
            this.vapidkeyArray = this.urlBase64ToUint8Array(this.publicKey);
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
                    reject(error);
                })
            })
        }

        pushSubscribe(registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.vapidKeyArray
            }).then(subscription => {
                const publicKey = this.generatePublicKey(subscription);
                const authKey = this.generateAuthKey(subscription);
                console.log(subscription.endpoint, publicKey, authKey);
                console.log('publicKey', publicKey);
                console.log('authKey', authKey);
            }).catch(error => {
                console.error('subscription error', error)
            })
        }

        urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        generateKey(keyName, subscription) {
            var rawKey;
            rawKey = subscription.getKey ? subscription.getKey(keyName) : '';
            return rawKey ?
                btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) :
                '';
        }

        generatePublicKey(subscription) {
            return this.generateKey('p256dh', subscription);
        }

        generateAuthKey(subscription) {
            return this.generateKey('auth', subscription);
        }
    }


    var Sub = new PushSubscription(applicationServerPublicKey)

    Sub.init()
})()