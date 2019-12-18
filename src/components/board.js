const createFilmBoardTemplate = () => {
  return (
    `<section class="films">

</section>`
  );
};

const createFilmListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">    
</div>
</section>
`
  );
};

const createFilmSectionTemplate = (title, id) => {
  return (
    `<section id="${id}" class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">
</div>
</section>`
  );
};

export {createFilmBoardTemplate, createFilmListTemplate, createFilmSectionTemplate};
