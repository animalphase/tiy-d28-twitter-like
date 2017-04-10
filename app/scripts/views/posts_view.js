import headerView from './header_view.js';
import postView from './post_view.js';

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

  let $postWrapper = $('<section class="posts-wrapper"><h3>all posts</h3></section>');
  console.log('postView > posts in state', store.getState().posts);
  store.getState().posts.forEach( (post) => {
    console.log(posts);
    $postWrapper.append(new postView(store, post));
  });

  $contentWrapper.append($postWrapper);


  // return html of view
  return $viewHtml;
}
