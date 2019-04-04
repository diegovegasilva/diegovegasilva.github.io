import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  messaging: any;
  database: any;

  constructor() {}

  init() {
    const config = {
      apiKey: 'AIzaSyAmferqQ9L79uCyLfyFBP04qH7H_OCLFp0',
      authDomain: 'push-notification-test-dfd1f.firebaseapp.com',
      databaseURL: 'https://push-notification-test-dfd1f.firebaseio.com',
      projectId: 'push-notification-test-dfd1f',
      storageBucket: 'push-notification-test-dfd1f.appspot.com',
      messagingSenderId: '665202717158'
    };
    firebase.initializeApp(config);
    this.messaging = firebase.messaging();
    this.database = firebase.database();
    this.messaging.usePublicVapidKey(
      'BImFmvzyny5vYeR6_PlKHibuqQg5wgexzVfZGZiwbfA_Wce2qaWrBdci6OpXvxdD0Syv2vG5q5HKe6NmlqrwCIA'
    );
  }

  requestPermission(): Promise<any> {
    return this.messaging.requestPermission();
  }

  getToken(): Promise<any> {
    return this.messaging
      .getToken()
      .then(token => token)
      .catch(e => e);
  }

  deleteToken(token): Promise<any> {
    return this.messaging.deleteToken(token);
  }
}
