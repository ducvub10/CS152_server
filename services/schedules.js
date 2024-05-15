const {
  getAllSchedules,
  getPaginatedSchedules,
  getPaginationInfo,
} = require("../daos/schedules");

async function querySchedules(page, limit, course) {
  const data = await getPaginatedSchedules(page, limit, course);
  if (data.length === 0) {
    return {
      data,
      pagination: null,
    };
  }
  const total_pages = await getPaginationInfo(limit, course);
  return {
    data,
    pagination: { start: 1, end: total_pages },
  };
}

module.exports = { querySchedules };
