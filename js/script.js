$(window).on('load', () => {
  let today = moment();
  $('#currentDay').text(today.format('dddd, Do MMMM YYYY'));
});
