// Formats float value to hour/minute value (1.25 = 1h15m)
export default (timeValue: number) => {
  const hours = Math.floor(timeValue);
  const minutes = (timeValue % 1) * 60;
  const hoursString = `${hours}${minutes ? 'h' : ' Hours'}`;
  const minutesString = minutes ? `${minutes}min` : '';
  return `${hoursString} ${minutesString}`;
}