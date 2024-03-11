import moment from 'moment';

export function formatDate(date) {
  return moment(date).format('MMM D, YYYY h:mm A');
}
