/* jshint -W138 */
/* jshint -W004 */

import { createStore, applyMiddleware } from 'redux';
import thunk from './middleware/thunk.js';
import logger from './middleware/logger.js';

import User from './models/user_model.js';

import exampleView from './views/example_view.js';
import signingInView from './views/signing_in_view.js';
import signinView from './views/signin_view.js';
import postsView from './views/posts_view.js';

export default function app() {

    const urls = {
      users: 'https://api.backendless.com/v1/data/Users'
    };

    let testUser = new User({
      userName: 'ripley',
      displayName: 'Ripley Jupiter',
      avatar: 'https://i.imgur.com/FXMdJ9o.jpg',
      bio: 'hard worker',
      website: 'https://typesetinthefuture.com/2014/12/01/alien/'
    });

    const initialState = {
      session: {
        user: {},
        userToken: ''
      },
      view: signinView
    };

    //TODO: get sign-in working

    const reducer = function (currentState, action) {
        if (currentState === undefined) {
          return initialState;
        }


        switch (action.type) {


          case "START":
            return currentState;


          case 'SIGNIN':
            var newState = {
              view: signingInView
            };

            let retrievedUserToken;

            $.ajax({
              type: 'POST',
              url: 'https://api.backendless.com/v1/users/login',
              dataType: 'JSON',
              headers: {
                "application-id": "5BFDD67D-CA10-A400-FFBE-1D2BCCD31700",
                "secret-key": "3F7A8F8E-5D59-F118-FFE0-2828C89C6600",
                "Content-Type": "application/json",
                "application-type": "REST"
              },
              data: JSON.stringify({
                login: action.login,
                password: action.password
              })
            }).then( (data, status, xhr) => {
              console.log('data :: ', data);
              retrievedUserToken = data['user-token'];
              console.log(retrievedUserToken);
              store.dispatch({
                type: "SIGNED_IN",
                user: new User({
                    id : data.objectId,
                  userName : data.userName,
                  displayName : data.displayName,
                  bio : data.bio ||'',
                  avatar : data.avatar
                }),
                userToken: data['user-token']
              });
            });

            return Object.assign({}, currentState, newState);


          case "SIGNED_IN":
            var newState = {
              session: {
                user: action.user,
                userToken: action.userToken
              },
              view: postsView
            };
            console.log(newState);
            return Object.assign({}, currentState, newState);


          case "VIEW_POSTS":
            return currentState;


          default:
            console.debug(`Unhandled Action: ${action.type}!`);
            return currentState;
        }
    };

    const store = createStore(
        reducer,
        applyMiddleware(
            thunk,
            logger
        )
    );

    const render = function () {
      let state = store.getState();
      // console.log('rednering | store', store);
      // console.log('rendering | state', state);
      $('#app').html(state.view(store));
    };

    store.subscribe(render);
    store.dispatch({ type: "START" });

}
