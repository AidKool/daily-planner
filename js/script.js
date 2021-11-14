$(window).on('load', () => {
  displayCurrentTime();

  loadPlanner();
  colourBlocks();
  loadFromLocalStorage();

  $('.saveBtn').on('click', (event) => {
    saveToLocalStorage(event);
  });
});

function displayCurrentTime() {
  let today = moment();
  $('#currentDay').text(today.format('dddd, Do MMMM YYYY'));
}

function loadPlanner() {
  const startTime = moment('08:00:00', 'hh:mm:ss');
  const endTime = moment('24:00:00', 'hh:mm:ss');
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
  $('.time-block').each((index, block) => {
    if (currentHour > block.dataset.hour) {
      $(block).addClass('past');
    } else if (currentHour == block.dataset.hour) {
      $(block).addClass('present');
    } else {
      $(block).addClass('future');
    }
  });
}

function saveToLocalStorage(event) {
  const hour = event.currentTarget.parentElement.dataset.hour;
  const text = event.currentTarget.previousElementSibling.value;
  localStorage.setItem(hour, text);
}

function loadFromLocalStorage() {
  $('.time-block').each((index, block) => {
    let hour = block.dataset.hour;
    let text = localStorage.getItem(hour);
    block.children[1].textContent = text;
  });
}
