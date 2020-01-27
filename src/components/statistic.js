import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Color = {
  YELLOW: `yellow`,
};

const ColorValue = {
  [Color.YELLOW]: `#ffe125`,
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getFilmsByDateRange = (films, dateTo, dateFrom) => {
  return films.filter((film) => {
    const dueDate = film.watchingDate;
    // Даты надо приводить в один формат
    return dueDate >= dateFrom && dueDate <= dateTo;
  });
};

const calcCountFilmsStyle = (films, style) => {
  return films.filter((it) => it.style === style).length;
};

const renderColorsChart = (colorsCtx, films) => {
  const styles = films
    .map((film) => film.style)
    .filter(getUniqItems);


  return new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: styles,
      datasets: [{
        data: styles.map((style) => calcCountFilmsStyle(films, style)),
        backgroundColor: 'orange',
      }]
    },
    options: {
      plugins: {
        datalabels: {
          anchor: 'start',
          color: `white`,
        },
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            display:false,
          }
        }],
        yAxes: [{
          ticks: {
            fontStyle: `bold`,
            fontColor: `white`,
            padding: 25,
          },
        }],
      },
    }
  });

  /*return new window.Chart(colorsCtx, {
    type: 'bar',
    data: data,
    options: options
  });*/
};


const createStatTemplate = (films, dateTo, dateFrom) => {
  const filmsCount = getFilmsByDateRange(films, dateTo, dateFrom).length;
  const filmsCountIsWatched = films.filter((it) => it.addToHistory).length;
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let timeLength = 0;
  films.filter((it) => it.addToHistory).map((it) => timeLength += it.duration);
  console.log(timeLength);
  const hours = Math.floor(timeLength / 60);
  const minutes = timeLength % 60;

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filmsCountIsWatched} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
};

export class StatisticComponent extends AbstractSmartComponent {
  constructor(films, dateTo, dateFrom) {
    super();

    this._films = films;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;

    this._filmsChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatTemplate(this._films.getFilms(), this._dateTo, this._dateFrom);
  }

  rerender(films, dateFrom, dateTo) {
    this._films = films;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const filmsCtx = element.querySelector(`.statistic__chart`);
    this._resetCharts();
    this._filmsChart = renderColorsChart(filmsCtx, this._films.getFilms());
  }

  _resetCharts() {
    if (this._filmsChart) {
      this._filmsChart.destroy();
      this._filmsChart = null;
    }
  }

  recoveryListeners() {}

  show() {
    super.show();
    this.rerender(this._films, this._dateFrom, this._dateTo);
  }
}
