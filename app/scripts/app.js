import { createStore, applyMiddleware } from 'redux';
import thunk from './middleware/thunk.js';
import logger from './middleware/logger.js';

import User from './models/user_model.js';

import exampleView from './views/example_view.js';
import postsView from './views/posts_view.js';

export default function app() {

    let testUser = new User({
      userName: 'ripley',
      displayName: 'Ripley Jupiter',
      avatar: 'https://i.imgur.com/FXMdJ9o.jpg',
      bio: 'hard worker',
      website: 'https://typesetinthefuture.com/2014/12/01/alien/'
    });

    const initialState = {
      session: {
        user: testUser,
        authToken: ''
      },
      view: postsView
    };

    const reducer = function (currentState, action) {
        if (currentState === undefined) {
          return initialState;
        }

        switch (action.type) {
          case "START":
            return currentState;

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
      $('#app').html(state.view(store));
    };

    store.subscribe(render);
    store.dispatch({ type: "START" });

}
