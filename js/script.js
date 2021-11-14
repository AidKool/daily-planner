$(window).on('load', () => {
  displayCurrentTime();

  loadPlanner();
});

function displayCurrentTime() {
  let today = moment();
  $('#currentDay').text(today.format('dddd, Do MMMM YYYY'));
}

function loadPlanner() {
  const startTime = moment('08:00:00', 'hh:mm:ss');
  const endTime = moment('23:00:00', 'hh:mm:ss');
  const diff = endTime.diff(startTime, 'hours');
  let blockTime = startTime.clone();
  const timeblocks = [...Array(diff)]
    .map((block) => {
      block = `
        <div class="row time-block">
          <div class="col-1 hour">${blockTime.format('HH:mm')}</div>
          <textarea class="col-10">some text</textarea>
          <button class="saveBtn col-1">
            <i class="fas fa-save"></i>
          </button>
        </div>
      `;
      blockTime = blockTime.add(1, 'hours');
      return block;
    })
    .join('');

  $('.jumbotron + .container').append(timeblocks);
}
