import headerView from './header_view.js';

export default function signingInView(store) {
  // let state = store.getState();

  //Create the HTML
  let $viewHtml = $(` <section class="page-wrapper chat-view"></section>`);

  let $contentWrapper = $(` <div class="view-content">
                              <h2>signing in</h2>
                            </div>`);
  $viewHtml.append($contentWrapper);

  // return html of view
  return $viewHtml;
}
