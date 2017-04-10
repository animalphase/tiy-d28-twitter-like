/* jshint -W138 */
/* jshint -W004 */

import { createStore, applyMiddleware } from 'redux';
import thunk from './middleware/thunk.js';
import logger from './middleware/logger.js';

import User from './models/user_model.js';
import Post from './models/post_model.js';

import exampleView from './views/example_view.js';
import signingInView from './views/signing_in_view.js';
import signinView from './views/signin_view.js';
import loadingPostsView from './views/loading_posts_view.js';
import postsView from './views/posts_view.js';

export default function app() {

    const urls = {
      posts: 'https://api.backendless.com/v1/data/posts',
      users: 'https://api.backendless.com/v1/users/login'
    };
    const applicationId = '5BFDD67D-CA10-A400-FFBE-1D2BCCD31700';
    const secretKey = '3F7A8F8E-5D59-F118-FFE0-2828C89C6600';

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
      view: signinView,
      posts: [],
      users: []
    };

    // TODO: split actions into the separate module fuctions


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
              url: urls.users,
              dataType: 'JSON',
              headers: {
                "application-id": applicationId,
                "secret-key": secretKey,
                "Content-Type": "application/json",
                "application-type": "REST"
              },
              data: JSON.stringify({
                login: action.login,
                password: action.password
              })
            }).then( (data, status, xhr) => {
              retrievedUserToken = data['user-token'];
              store.dispatch({
                type: "LOAD_POSTS",
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


          case "LOAD_POSTS":
            var newState = {
              session: {
                user: action.user,
                userToken: action.userToken
              },
              view: loadingPostsView
            };

            $.ajax({
              url: urls.posts,
              method: "GET",
              headers: {
                "application-id": applicationId,
                "secret-key": secretKey,
                "user-token": newState.session.userToken
              }
            }).then( (postsData, status, xhr) => {
              console.log('>> returned post data: ', postsData);
              let postObjects = postsData.data.map( (post) => {
                console.log(post);
                return new Post({
                  authorId:           post.authorId,
                  authorUserName:     post.authorUserName,
                  authorDisplayName:  post.authorDisplayName,
                  authorAvatar:       post.authorAvatar,
                  body:               post.body,
                  timePosted:         post.created
                });
              });
              console.log('>> put into Post objects: ', postObjects);
              store.dispatch({
                type: "VIEW_POSTS",
                posts: postObjects
              });
            });

            return Object.assign({}, currentState, newState);


          case 'VIEW_POSTS':
          var newState = {
            view: postsView,
            posts: action.posts
          };
          return Object.assign({}, currentState, newState);


          case 'NEW_POST':
            console.log('!! POSTING !!');
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
