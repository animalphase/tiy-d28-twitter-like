import headerView from './header_view.js';

export default function postsView(store, post) {
  let state = store.getState();
  //Create the HTML
  let $viewHtml = $(` <div class="post" data-author-id="${post.authorId}" data-post-id="${post.postId}">
                        <div class="author-avatar"><img src="${post.authorAvatar}"></div>
                        <div class="post-block">
                          <div class="post-meta">
                            <span class="author-display-name">${post.authorDisplayName} </span>
                            <span class="author-user-name">@${post.authorUserName} </span>
                            <span class="post-timestamp">| ${post.timePosted.toDateString()}</span>
                          </div>
                          <p class="post-body">${post.body}</p>
                        </div>
                      </div>`);

  if ( state.session.user.id === post.authorId) {
    let $btnDelete = $('<a class="btn-delete" href="#">❌</a>');
    $viewHtml.find('.post-meta').append($btnDelete);
    $btnDelete.on('click', (e) => {
      e.preventDefault();
      $.ajax({
        url: 'https://api.backendless.com/v1/data/posts/' + post.postId,
        type: 'DELETE',
        dataType: 'JSON',
        headers: {
          "application-id": '5BFDD67D-CA10-A400-FFBE-1D2BCCD31700',
          "secret-key": '3F7A8F8E-5D59-F118-FFE0-2828C89C6600',
          "user-token": state.session.userToken,
          "Content-Type": "application/json",
          "application-type": "REST"
        }
      }).then( () => {
        store.dispatch({
          type: "LOAD_POSTS"
        });
      });
    });
  }

  // return html of view
  return $viewHtml;
}
