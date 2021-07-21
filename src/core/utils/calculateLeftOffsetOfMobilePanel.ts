// TODO unit test
// Calculates the offset of a certain panel at a certain state
const calculateLeftOffsetOfMobilePanel = (
  // The panel we are getting the offset for (not necessarily the currently open one)
  panelIndex: number,
  // The current open panel
  currentOpenPanel: number
): string => {
  let offset = 0;
  if (panelIndex !== currentOpenPanel) {
    offset = (panelIndex - currentOpenPanel) * 100;
  }
  return `${offset}%`;
}

export default calculateLeftOffsetOfMobilePanel;