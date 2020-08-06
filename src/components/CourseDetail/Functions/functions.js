export const extractData = (data) => {
  let temp = {...data}
  const  overview = {
    numberOrder: 0,
    name: 'Course Overview',
    sumHours: 0,
    data: [
      {
        videoUrl: temp.promoVidUrl,
        numberOrder: 0
      }
    ]
  }
  for(let i=0; i<temp.section.length; i++) {
    temp.section[i]['data'] = temp.section[i]['lesson']
    delete temp.section[i]['lesson']
  }
  temp.section.unshift(overview)
  return temp
}
