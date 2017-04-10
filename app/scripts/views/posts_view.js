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
  store.getState().posts.forEach( (post) => {
    $postWrapper.append(new postView(store, post));
  });

  $contentWrapper.append($postWrapper);


  $postForm.find('.btn-new-post').on('click', (e) => {
    e.preventDefault();
    let newPostBody = $postForm.find('.input-new-post').val();
    if(newPostBody !== '' && newPostBody !== undefined) {
      let newPostInfo = {
        authorId:           state.session.user.id,
        authorUserName:     state.session.user.userName,
        authorDisplayName:  state.session.user.displayName || '',
        authorAvatar:       state.session.user.avatar || '',
        body:               newPostBody
      };
      $postForm.find('.input-new-post').val('');
      store.dispatch({
        type: 'NEW_POST',
        postInfo: newPostInfo
      });
    } else {
      console.log('new post field empty');
    }

  });


  // return html of view
  return $viewHtml;
}
