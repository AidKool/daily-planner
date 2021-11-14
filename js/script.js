$(window).on('load', () => {
  displayCurrentTime();

  loadPlanner();
});

function displayCurrentTime() {
  let today = moment();
  $('#currentDay').text(today.format('dddd, Do MMMM YYYY'));
}

function loadPlanner() {
  const start = moment('08:00:00', 'hh:mm:ss');
  const end = moment('23:00:00', 'hh:mm:ss');
  const diff = end.diff(start, 'hours');
  let timeblocks = [...Array(diff)];
  console.log('length:', timeblocks.length);

  const hour = moment('08:00:00', 'hh:mm:ss').format('hh:mm');

  timeblocks = timeblocks
    .map((block) => {
      return `
        <div class="row time-block">
          <div class="col-1 hour">${hour}</div>
          <textarea class="col-10">some text</textarea>
          <button class="saveBtn col-1">
            <i class="fas fa-save"></i>
          </button>
        </div>
      `;
    })
    .join('');

  $('.jumbotron + .container').append(timeblocks);
  console.log($('.jumbotron + .container'));
}
