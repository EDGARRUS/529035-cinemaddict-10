import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);

};

export const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = (time % 60 === 0) ? `00` : time % 60;
  return `${hours}h:${minutes}m`;
};
