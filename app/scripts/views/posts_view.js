import headerView from './header_view.js';

export default function postsView(store) {
  let state = store.getState();

  //Create the HTML
  let $html = $(` <section class="page-wrapper chat-view">
                    <div class="view-content"><h2>chat view</h2></div>
                    <a href="#">test-link</a>
                    <button>test-button</button>
                  </section>`);

  $html.prepend(headerView(store));


  //Assign any event listeners
  $($html).find('h2').on('click', () => {
    store.dispatch(exampledsAsyncAction());
  });

  //Return the html
  return $html;
}
