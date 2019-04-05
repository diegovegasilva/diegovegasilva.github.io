import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  messaging: any;
  database: any;
  savedToDb: boolean;
  username: string;
  token: string;

  constructor() {
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
    this.savedToDb = localStorage.getItem('tokenStored') === 'true';
    this.onTokenRefresh();
    
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload)
    })

  }

  requestPermission(username): Promise<any> {
    this.username = username;
    return this.messaging.requestPermission().then(() => {
      return this.getToken(username);
    });
  }

  getToken(username): Promise<any> {
    return this.messaging
      .getToken()
      .then(token => {
        if (!this.savedToDb) {
          this.saveTokenToDb(username, token);
        }
        this.token = token;
        return token;
      })
      .catch(e => e);
  }

  deleteToken(token): Promise<any> {
    this.token = undefined;
    this.deleteTokenFromDb(token);
    return this.messaging.deleteToken(token);
  }

  private saveTokenToDb(name, token) {
    console.log('save token to db')
    this.savedToDb = true;
    localStorage.setItem('tokenStored', 'true');
    localStorage.setItem('username', name);
    this.database.ref('users')
      .push({
        username: name,
        token: token
      });
  }

  private deleteTokenFromDb(token) {
    this.savedToDb = false;
    localStorage.removeItem('tokenStored');
    localStorage.removeItem('username');
  }

  private onTokenRefresh() {
    this.messaging.onTokenRefresh(() => {
      console.log('refresh token')
      this.savedToDb = false;
      this.deleteToken(this.token).then(() =>
        this.getToken(this.username)
      );
    })
  }
}
