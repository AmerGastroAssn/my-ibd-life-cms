![MyIBDLife](https://firebasestorage.googleapis.com/v0/b/my-ibd-life-dev.appspot.com/o/images%2F2019%2F1551821388572_my_ibd_life_logo_500.png?alt=media&token=7fe237dc-fe29-42fc-8031-210e0db40b52)
# CMS

Custom built CMS

Built with Angular 7, Firebase (AngularFire 4), Bootstrap 4, ngx-bootstrap and Angular Material Design.

**To Use:**

Open up your terminal and clone the project:

    git clone git@github.com:AmerGastroAssn/my-ibd-life-cms.git


Change/Move into project directory:

    cd my-ibd-life-cms

Install dependencies:

    npm install

Create environment files:

`/src/environments/environment.prod.ts`

and

`/src/environments/environment.ts`

By running:


    mkdir src/environments && touch src/environments/environment.prod.ts && touch src/environments/environment.ts


Add your firebase web-app variables to those files:

It should be something like this (with your own values):

```typescript
export const environment = {
    production: false,
    firebase: {
        apiKey: 'key',
        authDomain: 'app-name.firebaseapp.com',
        databaseURL: 'https://app-name.firebaseio.com',
        projectId: 'app-name',
        storageBucket: 'app-name.appspot.com',
        messagingSenderId: 'senderIDNumber'
    }
};
```

**Setup/install Firebase Function dependencies**

Install the [Firebase command line tools](https://firebase.google.com/docs/cli/). It will walk you through a handful of questions. ([Follow instructions](https://firebase.google.com/docs/cli/) and/or search [youtube](https://www.youtube.com/watch?v=9kRgVxULbag) for more info to do that):

    npm install -g firebase-tools

Change directory into Firebase functions to install those dependencies:

    cd functions

Install Firebase Functions dependencies:

    npm install

Back out to main working directory:

    cd ..

Start Angular Server:

    ng serve

Open browser to [http://localhost:4200](http://localhost:4200)

