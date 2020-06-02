export function findByKey(list, listFind) {
  let items=[];

  for(let i=0; i<listFind.length; i++) {
    items.push(list.find((item) => item.key===listFind[i]))
  }

  return items
}

export function findAuthorByName(list, listFind) {
  let items=[];

  for(let i=0; i<listFind.length; i++) {
    items.push(list.find((item) => item.detail.name===listFind[i]))
  }

  return items
}

export function findSkillByName(list, listFind) {
  let items=[];

  for(let i=0; i<listFind.length; i++) {
    items.push(list.find((item) => item.title===listFind[i]))
  }

  return items
}