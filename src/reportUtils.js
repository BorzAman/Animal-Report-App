export const isOlderThanOneDay = (timestamp) => {
  if (!timestamp) return false;

  const createdAtMs = timestamp.toMillis
    ? timestamp.toMillis()
    : new Date(timestamp).getTime();

  return Date.now() - createdAtMs > 24 * 60 * 60 * 1000;
};
