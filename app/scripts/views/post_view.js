import headerView from './header_view.js';

export default function postsView(store, post) {
  let state = store.getState();
  //Create the HTML
  let $viewHtml = $(` <div class="post" data-author-id=${post.authorId}>
                        <div class="author-avatar"><img src="${post.authorAvatar}"></div>
                        <div class="post-block">
                          <div class="post-meta">
                            <span class="author-display-name">${post.authorDisplayName} </span>
                            <span class="author-user-name">@${post.authorUserName}</span>
                          </div>
                          <p class="post-body">${post.body}</p>
                        </div>
                      </div>`);


  console.log('info check', state.session.user.id, post.authorId);
  if ( state.session.user.id === post.authorId) {
    let $btnEdit = $('<a class="btn-edit" href="#">⚙️</a>');
    $viewHtml.find('.post-meta').append($btnEdit);
    $btnEdit.on('click', (e) => { e.preventDefault(); });
  }

  // return html of view
  return $viewHtml;
}
