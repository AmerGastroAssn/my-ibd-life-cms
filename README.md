![MyIBDLife](https://firebasestorage.googleapis.com/v0/b/my-ibd-life-dev.appspot.com/o/images%2F2019%2F1551821388572_my_ibd_life_logo_500.png?alt=media&token=7fe237dc-fe29-42fc-8031-210e0db40b52)

# MyIBD Life ~ DolphinCMS

<div style="float:left;">
<img src="https://firebasestorage.googleapis.com/v0/b/my-ibd-life-dev.appspot.com/o/images%2F2020%2F1583362664573_dolphin-3d_260x260.png?alt=media&token=7931f5a2-0f12-4daa-8455-b8c212cd0fb5" alt="DolphinCMS Logo" style="width:100px; float:left;"/>
<p>Customized version of DolphinCMS for the "MyIBD Life" headless website.</p>
<p>Dolphin is Built with Angular 9, Firebase (AngularFire 5), Bootstrap 4+, ngx-bootstrap and Angular Material Design.</p>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

---

### To use:

Open up your terminal and clone the project:

    git clone git@github.com:AmerGastroAssn/my-ibd-life-cms.git


Rename project to whatever you want:

    mv my-ibd-life-cms new-project-name


Change/Move into project directory:

    cd new-project-name

Delete Git Files:

	rm -rf ~/.git

Reinstall Git:

	git init



Install dependencies:

    npm install

---

#### Add environment files:
From the root of the project run:


    mkdir src/environments && touch src/environments/environment.prod.ts && touch src/environments/environment.ts

*The above command creates files in:*

`/src/environments/environment.prod.ts`  and  `/src/environments/environment.ts`

---
Add your firebase web-app variables to those files:

It should be something like this (with your own values):

```typescript
export const environment = {
    production: false, // false for regular folder, true for .prod folder
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

Change Logos in:

`logo-watermark.component.ts`

`sidenav-component.ts`


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



