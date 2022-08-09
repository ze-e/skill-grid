export const data = {
  levels: [
    {
      quests: [
        {
          id: 'c950b2e3-8b9d-4e6b-9bea-bd677779d7ae',
          name: 'A hero is born!',
          skills: ['Created a Scratch account'],
          parents: [],
          descendants: ['0166b45e-9b46-413e-951c-e4a8b0932c59']
        }
      ]
    },
    {
      quests: [
        {
          id: '0166b45e-9b46-413e-951c-e4a8b0932c59',
          name: 'Hello CodeQuest!',
          skills: [
            'Show/Hide',
            'Backdrops'
          ],
          parents: ['c950b2e3-8b9d-4e6b-9bea-bd677779d7ae'],
          descendants: ['3acc1285-a613-475c-9626-5880b561efb4', '80c8be0e-e682-49f7-ab9a-5b939923c0b2']
        }
      ]
    },
    {
      // id goes here
      quests: [
        {
          id: '3acc1285-a613-475c-9626-5880b561efb4',
          name: 'Movie Night!',
          skills: ['Using costume',
            'Using graphic effects',
            'Using "slide to point"',
            'Using the message event',
            'Using "wait"'
          ],
          parents: ['0166b45e-9b46-413e-951c-e4a8b0932c59'],
          descendants: []
          // color goes here
        },
        {
          id: '80c8be0e-e682-49f7-ab9a-5b939923c0b2',
          name: 'Maze Game',
          skills: [
            'Using coordinates',
            'The direction property',
            'Creating animation loops',
            'Using variables',
            'Collisions'
          ],
          parents: ['0166b45e-9b46-413e-951c-e4a8b0932c59'],
          descendants: ['e74ded8c-029b-4799-89fe-283e1611e361', 'bdb072ee-c06d-4810-8038-7b57217530dc']
          // color goes here
        }
      ]
    },
    {
      quests: [
        {
          id: 'e74ded8c-029b-4799-89fe-283e1611e361',
          name: 'Defender',
          skills: [
            'Using step movement',
            'Using clones',
            'Using buffers'
          ],
          parents: ['80c8be0e-e682-49f7-ab9a-5b939923c0b2'],
          descendants: []
        },
        {
          id: 'bdb072ee-c06d-4810-8038-7b57217530dc',
          name: 'Text Adventure',
          skills: [
            'Using ask/answer',
            'Using blocks',
            'List variables',
            'Using join',
            'Advanced messages',
            'Advanced backdrops'
          ],
          parents: ['80c8be0e-e682-49f7-ab9a-5b939923c0b2'],
          descendants: []
        }
      ]
    }
  ]
}
