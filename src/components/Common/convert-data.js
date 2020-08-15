export const convertDate = (strDate, type, lang) => {
  const date = new Date(strDate)
  const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNamesVi = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
  let monthNames;
  if(lang === 'vi') {
    monthNames = monthNamesVi
  } else {
    monthNames =monthNamesEn
  }
  if(!type) return monthNames[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  else return monthNames[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear();
}

export const convertTime = (hours) => {
  return Math.floor(hours)+'h '+Math.floor((hours-Math.floor(hours))*60)+'m '
}