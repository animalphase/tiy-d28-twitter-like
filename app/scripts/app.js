import { createStore, applyMiddleware } from 'redux';
import thunk from './middleware/thunk.js';
import logger from './middleware/logger.js';

import exampleView from './views/example_view.js';
import chatView from './views/chat_view.js';

export default function app() {

    let userInfo = {
      userName: 'ripley',
      displayName: 'Ripley Jupiter',
      avatar: 'https://pbs.twimg.com/profile_images/836400561348030464/8uPbdcWG.jpg'
    };

    const initialState = {
      session: userInfo,
      view: chatView
    };

    const reducer = function (state, action) {
        if (state === undefined) {
          return initialState;
        }

        switch (action.type) {
            case "START":
                return state;

            default:
                console.debug(`Unhandled Action: ${action.type}!`);
                return state;
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
