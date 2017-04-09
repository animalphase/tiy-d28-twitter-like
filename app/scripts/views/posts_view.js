import headerView from './header_view.js';

export default function postsView(store) {
  let state = store.getState();

  //Create the HTML
  let $viewHtml = $(` <section class="page-wrapper chat-view"></section>`);

  $viewHtml.prepend(headerView(store));

  let $contentWrapper = $('<div class="view-content">');
  $viewHtml.append($contentWrapper);

  let $postForm = $(` <form class="form-new-post">
                        <input class="input-new-post" type="text" name="new post" placeholder="new post…">
                        <button class="btn btn-new-post" type="submit" name="new post button">+</button>
                      </form>`);
  $contentWrapper.append($postForm);



  //Assign any event listeners
  $($viewHtml).find('h2').on('click', () => {
    store.dispatch(exampledsAsyncAction());
  });

  //Return the html
  return $viewHtml;
}
