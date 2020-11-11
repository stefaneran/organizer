import { formatDateBasic } from '@core/utils/dateUtils';

export default (store) => () => {
  const downloadData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store));
  const dlAnchorElem = document.getElementById('downloadData');
  dlAnchorElem.setAttribute("href", downloadData);
  dlAnchorElem.setAttribute("download", `${formatDateBasic(Date.now())}.json`);
  dlAnchorElem.click();
}