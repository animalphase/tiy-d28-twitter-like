import headerView from './header_view.js';

export default function signinView(store) {
  let state = store.getState();

  //Create the HTML
  let $viewHtml = $(` <section class="page-wrapper chat-view"></section>`);

  let $contentWrapper = $(` <div class="view-content">
                              <h1>bip!</h1>
                              <h2>sign in</h2>
                            </div>`);
  $viewHtml.append($contentWrapper);

  let $postForm = $(` <form class="form-signin">
                        <input class="input-username" type="text" name="username" placeholder="username…">
                        <input class="input-password" type="password" name="password" placeholder="password…">
                        <button class="btn btn-signin" type="submit" name="sign in button">sign in</button>
                      </form>`);
  $contentWrapper.append($postForm);



  //Assign any event listeners
  $($viewHtml).find('h2').on('click', () => {
    store.dispatch(exampledsAsyncAction());
  });

  //Return the html
  return $viewHtml;
}
