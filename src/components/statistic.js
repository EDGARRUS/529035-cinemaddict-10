import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import {UserRatingTitle} from "../utils/util";

const getFilmsByDateRange = (films, dateFrom) => {

  const data = films.filter((film) => {
    const dueDate = film.watchingDate;

    if (dateFrom) {
      return moment(dueDate).isBetween(dateFrom, new Date());
    } else {
      return true;
    }
  });

  return data;
};

const calcCountFilmsStyle = (films, style) => {
  return films.filter((it) => it.style.includes(style)).length;
};

const renderColorsChart = (colorsCtx, films) => {
  if (!films) {
    return ``;
  }
  const allStyles = [];
  films.forEach((film) => film.style.forEach((item) => {
    if (!allStyles.includes(item)) {
      allStyles.push(item);
    }
  }));

  return new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: allStyles,
      datasets: [{
        data: allStyles.map((style) => calcCountFilmsStyle(films, style)),
        backgroundColor: `orange`,
        datalabels: {
          anchor: `start`,
          color: `white`,
          align: `end`,
          offset: -20,
        },
      }],
    },
    options: {
      plugins: {
        datalabels: {
          anchor: `start`,
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
            display: false,
            suggestedMin: 0,
          },
        }],
        yAxes: [{
          ticks: {
            fontStyle: `bold`,
            fontColor: `white`,
            padding: 25,
          },
        }],
      },
    },
  });
};


const createStatTemplate = (films, dateTo, dateFrom) => {
  let userTitle = ``;
  if (films.length >= UserRatingTitle.MOVIEBUFF) {
    userTitle = `movie buff`;
  } else if (films.length >= UserRatingTitle.FAN) {
    userTitle = `fan`;
  } else if (films.length >= UserRatingTitle.NOVICE) {
    userTitle = `novice`;
  }

  const allStyles = [];
  films.forEach((film) => film.style.forEach((item) => {
    if (!allStyles.includes(item)) {
      allStyles.push(item);
    }
  }));

  const result = {};
  const values = allStyles.map((style) => calcCountFilmsStyle(films, style));
  allStyles.forEach((key, i) => {
    result[key] = values[i];
  });
  const maxValue = Math.max.apply(null, values);
  const topGenre = Object.keys(result).find((key) => result[key] === maxValue);

  const filmsCountIsWatched = getFilmsByDateRange(films, dateFrom);
  let timeLength = 0;
  filmsCountIsWatched.map((it) => {
    timeLength += it.duration;
  });
  const hours = Math.floor(timeLength / 60);
  const minutes = timeLength % 60;

  // moment.utc(moment.duration(4500, "seconds").asMilliseconds()).format("HH:mm")

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userTitle}</span>
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
        <p class="statistic__item-text">${filmsCountIsWatched.length}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours ? hours : `00`} <span class="statistic__item-description">h</span> ${minutes ? minutes : `00`} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre ? topGenre : `-`}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

const filterTime = {
  'all-time': null,
  'today': moment().startOf(`day`).format(),
  'week': moment().subtract(7, `days`).format(),
  'month': moment().subtract(1, `months`).format(),
  'year': moment().subtract(1, `years`).format(),
};


export class StatisticComponent extends AbstractSmartComponent {
  constructor(films, dateTo, dateFrom) {
    super();

    this._films = films;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;

    this._filmsChart = null;
    this._filter = filterTime[`all-time`];

    this._renderCharts();
  }

  getTemplate() {
    return createStatTemplate(this._films.getFilms().filter((film) => film.watchingDate), this._dateTo, this._dateFrom);
  }

  rerender(films, dateTo, dateFrom) {
    this._films = films;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;

    super.rerender();
    this.recoveryListeners();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const filmsCtx = element.querySelector(`.statistic__chart`);
    this._resetCharts();

    this._filmsChart = renderColorsChart(filmsCtx, getFilmsByDateRange(this._films.getFilms().filter((film) => film.watchingDate), this._dateFrom));
  }

  _resetCharts() {
    if (this._filmsChart) {
      this._filmsChart.destroy();
      this._filmsChart = null;
    }
  }

  recoveryListeners() {
    this.setFilterChangeHandler();
  }

  show() {
    super.show();
    this.rerender(this._films, this._dateTo, this._dateFrom);
  }

  setActiveItem(filterItem) {
    const item = this.getElement().querySelector(`#statistic-${filterItem}`);

    if (item) {
      item.checked = true;
    }
  }

  setFilterChangeHandler() {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = evt.target.value;
      this._filter = filterTime[filterName];
      this.rerender(this._films, new Date(), this._filter);
      this.setActiveItem(filterName);
    });
  }
}
