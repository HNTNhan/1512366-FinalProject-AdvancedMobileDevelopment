export const convertDate = (strDate, type) => {
  const date = new Date(strDate)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if(!type) return monthNames[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  else return monthNames[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear();
}

export const convertTime = (hours) => {
  return Math.floor(hours)+'h '+Math.floor((hours-Math.floor(hours))*60)+'m '
}