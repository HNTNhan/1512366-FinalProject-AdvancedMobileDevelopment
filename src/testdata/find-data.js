export function findByKey(list, listFind) {
  let items=[];

  for(let i=0; i<listFind.length; i++) {
    items.push(list.find((item) => item.key===listFind[i]))
  }

  return items
}