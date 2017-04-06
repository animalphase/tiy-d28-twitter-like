export default function headerView(store) {
  let state = store.getState();

  //Create the HTML
  let $html = $(` <header class="app-header">
                    <h1 class="app-logo">bip</h1>
                    <div class="username">${store.getState().session.displayName}</div>
                    <nav class="main-nav"></nav>
                  </header>`);

  //Assign any event listeners
  $($html).find('h2').on('click', () => {
    store.dispatch(exampledsAsyncAction());
  });

  //Return the html
  return $html;
}
