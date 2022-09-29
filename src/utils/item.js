export function getItemData (itemData, id) {
  return itemData.find(i => i.id === id)
}