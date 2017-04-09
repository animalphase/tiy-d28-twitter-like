export default function exampleView(store) {
  let state = store.getState();

  //Create the HTML
  let $html = $(`<section><h2>Hi!</h2></section>`);

  //Assign any event listeners
  $($html).find('h2').on('click', () => {
    store.dispatch(exampledsAsyncAction());
  });

  // return html of view
  return $html;
}
