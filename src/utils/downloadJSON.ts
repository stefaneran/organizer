import { formatDataBasic } from '@logic/date.logic';

export default (store) => () => {
  const { profiles, currentProfile } = store;
  const { categories } = profiles[currentProfile];
  const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(categories));
  const dlAnchorElem = document.getElementById('downloadData');
  dlAnchorElem.setAttribute("href", data);
  dlAnchorElem.setAttribute("download", `${formatDataBasic(Date.now())}.json`);
  dlAnchorElem.click();
}