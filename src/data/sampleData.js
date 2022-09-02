import defaultAvatar from '../assets/elf-avi.jpg'

export const levelData = {
  levels: [
    {
      id: '599eea97-457d-4de8-bced-226ad64066c0',
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
      id: '6f8dbae7-d180-460a-8856-c677a39c744f',
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
      id: '51f164b5-f68b-4c06-aa24-8cbd30e1cb77',
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

export const userData = [
  {
    data: {
      name: 'Rex',
      img: {
        src: defaultAvatar,
        name: 'elf hacker'
      },
      level: 10,
      xp: 80,
      gold: 800,
      epiphet: 'the l33t',
      type: 'elf',
      job: 'hacker',
      hometown: 'fullerton',
      birthday: '1989-08-16T06:00:00.000Z',
      color: 'red',
      food: 'sushi',
      description: 'An elite elf hacker, Rex surfs the cyberworld looking for new vulnerabilities to exploit'
    },
    admin: {
      userName: 'rex',
      password: 'password123',
      email: 'zrexrodriguez@gmail.com',
      userType: 'teacher',
      completedQuests: ['c950b2e3-8b9d-4e6b-9bea-bd677779d7ae', '6f8dbae7-d180-460a-8856-c677a39c744f', '3acc1285-a613-475c-9626-5880b561efb4', '80c8be0e-e682-49f7-ab9a-5b939923c0b2'],
      currentQuest: '',
      submitted: []
    },
    gear: {
      head: '60b1788e-1b34-419d-a970-89312ac10e0c',
      LHand: '60b1788e-1b34-419d-a970-89312ac10e0d',
      RHand: '',
      LShldr: '60b1788e-1b34-419d-a970-89312ac10e0e',
      RShldr: '',
      accessory: '',
      body: '',
      pants: '',
      legs: ''
    },
    inventory: ['60b1788e-1b34-419d-a970-89312ac10e0c', '60b1788e-1b34-419d-a970-89312ac10e0d', '60b1788e-1b34-419d-a970-89312ac10e0e']
  },
  {
    data: {
      name: 'Hunter',
      img: {
        src: defaultAvatar,
        name: 'elf wizard'
      },
      level: 10,
      xp: 30,
      gold: 100,
      epiphet: 'the fearless',
      type: 'elf',
      job: 'wizard',
      hometown: 'brookyln',
      birthday: '1992-08-10T06:00:00.000Z',
      color: 'blue',
      food: 'fois gras',
      description: 'An elf wizard who excels at cooking'
    },
    admin: {
      userName: 'hunter',
      password: 'password123',
      email: 'jhunterrodriguez@gmail.com',
      userType: 'student',
      completedQuests: ['c950b2e3-8b9d-4e6b-9bea-bd677779d7ae', '0166b45e-9b46-413e-951c-e4a8b0932c59', '3acc1285-a613-475c-9626-5880b561efb4'],
      currentQuest: '',
      submitted: []
    },
    gear: {
      head: '60b1788e-1b34-419d-a970-89312ac10e0c',
      LHand: '',
      RHand: '',
      LShldr: '',
      RShldr: '60b1788e-1b34-419d-a970-89312ac10e0e',
      accessory: '',
      body: '',
      pants: '',
      legs: ''
    },
    inventory: ['60b1788e-1b34-419d-a970-89312ac10e0c', '60b1788e-1b34-419d-a970-89312ac10e0e']
  }
]

export const itemData = [
  {
    id: '60b1788e-1b34-419d-a970-89312ac10e0c',
    name: 'iron helm',
    location: 'head'
  },
  {
    id: '60b1788e-1b34-419d-a970-89312ac10e0d',
    name: 'cyber glove',
    location: 'LHand'
  },
  {
    id: '60b1788e-1b34-419d-a970-89312ac10e0e',
    name: 'shldr spikes',
    location: 'LShldr'
  }
]
