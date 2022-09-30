// import { debug } from './debug'

export function getItemData (itemData, id) {
  return itemData.find(i => i.id === id)
}

export function canBuyItem (item, gold) {
  return gold - item.cost >= 0
}
