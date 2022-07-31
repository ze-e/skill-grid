export const itemData = [
  {
    id: 'c950b2e3-8b9d-4e6b-9bea-bd677779d7ae',
    column: 1, // note that columns and position start at 1, not 0
    name: 'A hero is born!',
    xp: 20,
    parents: [],
    descendants: ['0166b45e-9b46-413e-951c-e4a8b0932c59']
  },
  {
    id: '0166b45e-9b46-413e-951c-e4a8b0932c59',
    column: 2,
    name: 'Hello CodeQuest!',
    xp: 20,
    parents: ['c950b2e3-8b9d-4e6b-9bea-bd677779d7ae'],
    descendants: ['3acc1285-a613-475c-9626-5880b561efb4', '80c8be0e-e682-49f7-ab9a-5b939923c0b2']
  },
  {
    id: '3acc1285-a613-475c-9626-5880b561efb4',
    column: 3,
    name: 'Movie Night!',
    xp: 50,
    parents: ['0166b45e-9b46-413e-951c-e4a8b0932c59'],
    descendants: []
  },
  {
    id: '80c8be0e-e682-49f7-ab9a-5b939923c0b2',
    column: 3,
    name: 'Maze Game',
    xp: 50,
    parents: ['0166b45e-9b46-413e-951c-e4a8b0932c59'],
    descendants: ['e74ded8c-029b-4799-89fe-283e1611e361', 'bdb072ee-c06d-4810-8038-7b57217530dc']
  },
  {
    id: 'e74ded8c-029b-4799-89fe-283e1611e361',
    column: 4,
    name: 'Defender',
    xp: 30,
    parents: ['80c8be0e-e682-49f7-ab9a-5b939923c0b2'],
    descendants: []
  },
  {
    id: 'bdb072ee-c06d-4810-8038-7b57217530dc',
    column: 4,
    name: 'Text Adventure',
    xp: 60,
    parents: ['80c8be0e-e682-49f7-ab9a-5b939923c0b2'],
    descendants: []
  }
]

export const columnData = [
  {
    id: 1,
    color: '#C51D34'
  },
  {
    id: 2,
    color: '#2A6478'
  },
  {
    id: 3,
    color: '#C7B446'
  },
  {
    id: 4,
    color: '#BDECB6'
  }
]
