import headerView from './header_view.js';

export default function postsView(store, post) {
  let state = store.getState();

  //Create the HTML
  let $viewHtml = $(` <div class="post">${post.body}</div>`);





  // return html of view
  return $viewHtml;
}
