const getPagination = (page, size) => {
  const limit = size ? +size : 9;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItem, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItem / limit);

  return { totalItem, rows, totalPages, currentPage };
};

export default {
  getPagination,
  getPagingData,
};
