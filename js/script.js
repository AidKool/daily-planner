$(window).on('load', () => {
  displayCurrentTime();

  loadPlanner();
  colourBlocks();
  loadFromLocalStorage();

  $('.saveBtn').on('click', saveToLocalStorage);
});

function displayCurrentTime() {
  let today = moment();
  $('#currentDay').text(today.format('dddd, Do MMMM YYYY'));
}

function loadPlanner() {
  const startTime = moment('09:00:00', 'hh:mm:ss');
  const endTime = moment('18:00:00', 'hh:mm:ss');
  const diff = endTime.diff(startTime, 'hours');
  let blockTime = startTime.clone();
  const timeblocks = [...Array(diff)]
    .map((block) => {
      block = `
        <div class="row time-block" data-hour="${blockTime.format('HH')}">
          <div class="col-1 hour">${blockTime.format('HH:mm')}</div>
          <textarea class="col-10 description"></textarea>
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

function colourBlocks() {
  const currentHour = moment().hours();
  $('.time-block').each(function () {
    if (currentHour > $(this).data('hour')) {
      $($(this)).addClass('past');
    } else if (currentHour == $(this).data('hour')) {
      $($(this)).addClass('present');
    } else {
      $($(this)).addClass('future');
    }
  });
}

function saveToLocalStorage() {
  const hour = $(this).parent().data('hour');
  const text = $(this).siblings('.description').val();
  localStorage.setItem(hour, text);
}

function loadFromLocalStorage() {
  $('.time-block').each(function () {
    let hour = $(this).data('hour');
    let text = localStorage.getItem(hour);
    $(this).children('.description').text(text);
  });
}
