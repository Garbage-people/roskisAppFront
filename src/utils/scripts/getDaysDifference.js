function getDaysDifference(date1, date2) {
  const timeDifference = Math.abs(date1.getTime() - date2.getTime());
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

export default getDaysDifference;