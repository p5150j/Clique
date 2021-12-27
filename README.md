## Clique app
![Screen Shot 2021-12-21 at 7 16 57 PM](https://user-images.githubusercontent.com/444888/147024082-7dae8d8c-63f3-41a3-91b9-e69318307803.png)


## Setup dev env

### Global-tools
```
npm i expo -g
npm i firebase-tools -g
npm i expo-cli -g
install xocde 
install android studio

```

### Project setup

#### Mobile 
```
cd frontend
npm i
edit the firebase.initializeApp to add the config details here https://github.com/p5150j/tick-tok-rn/blob/main/frontend/App.js#L21 (ping @p5150j for configs)
expo start
```
#### Backend 
```
cd backend
cd functions 
npm i
firebase deploy
```

#### Web 
```
cd web
npm i
npm start 
```

#### Configs and deploy
```
touch .env

REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STOARGE_BUCKET=
REACT_APP_MSG_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MESURE_ID=
```

README @TODO
- do ci/cd actions for web deploys to Netlify
- build piplines for iOS and Android 
