export default {
  date: {
    "%Y%m%d": /^\d{8}$/, // %Y%m%d => 20071119 Calendar date (basic)
    "%F": /^\d{4}-\d{2}-\d{2}$/, // %F => 2007-11-19 Calendar date (extended)
  },
  phone: {
    "(+00) 000 000 00 00 00": /^\(\+\d\d\) \d\d\d \d\d\d \d\d \d\d \d\d$/,
    "(+00) 000-000-00-00": /^\(\+\d\d\) \d\d\d-\d\d\d-\d\d-\d\d$/,
  },
  name: /^[A-Za-z0-9_-]*$/,
};
