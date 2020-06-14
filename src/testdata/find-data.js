//find by key
export function findByKey(list, listFind) {
  let items=[];

  for(let i=0; i<listFind.length; i++) {
    items.push(list.find((item) => item.key===listFind[i]))
  }

  return items
}

//find by name
export function findAuthorByName(list, listFind) {
  let items=[];
  for(let i=0; i<listFind.length; i++) {
    items = items.concat(list.filter((item) => item.detail.name===listFind[i]))
  }
  return [...new Set(items)];
}

export function findSkillByName(list, listFind) {
  let items=[];

  for(let i=0; i<listFind.length; i++) {
    items.push(list.find((item) => item.title===listFind[i]))
  }

  return items
}

export function findCategoryByName(list, listFind) {
  let items=[];

  for(let i=0; i<listFind.length; i++) {
    items.push(list.find((item) => item.title===listFind[i]))
  }

  return items
}

//find keySearch in name
export function findCoursesThroughName(list, key) {
  const items = list.filter((item) => item.title.toLowerCase().search(key.toLowerCase())!==-1)
  return items || [];
}

export function findPathsThroughName(list, key) {
  const items = list.filter((item) => item.detail.title.toLowerCase().search(key.toLowerCase())!==-1)
  return items || [];
}

export function findAuthorsThroughName(list, key) {
  const items = list.filter((item) => item.detail.name.toLowerCase().search(key.toLowerCase())!==-1)
  return items || [];
}