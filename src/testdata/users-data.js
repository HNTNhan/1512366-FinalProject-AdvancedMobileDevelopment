export const usersData = [
  {
    name: 'admin',
    skills: ['React', 'JavaScript', 'Python'],
    continueLearning: ['C00000', 'C00001', 'C00002'],
    paths: ['P00000', 'P00001'],
    bookmarks: ['C00001', 'C00007', 'C00008'],
    channels: [
      {
        detail: {
          title: 'react',
          user: 'admin',
          type: 'Private',
          member: 1,
        },
        progress: 25,
        items: [
          {
            typeItem: 'path',
            data: ['P00000'],
          },
          {
            typeItem: 'course',
            data: ['C00005'],
          },
          {
            typeItem: 'course',
            data: ['C00008'],
          },
        ]
      },
      {
        detail: {
          title: 'js',
          user: 'admin',
          type: 'Private',
          member: 1,
        },
        progress: 10,
        items: [
          {
            typeItem: 'path',
            data: ['P00001'],
          },
          {
            typeItem: 'course',
            data: [],
          },
        ]
      },
    ],
    downloads: ['C00007', 'C00008', 'C00009'],
  },
  {
    name: 'user',
    skills: ['React', 'JavaScript', 'Python'],
    continueLearning: ['C00000', 'C00002'],
    paths: ['P00000', 'P00001'],
    bookmarks: ['C00001', 'C00008'],
    channels: [
      {
        detail: {
          titleChannel: 'react',
          user: 'user',
          type: 'Private',
          member: 1,
        },
        progress: 10,
        items: [
          {
            typeItem: 'course',
            data: ['C00005', 'C00008'],
          },
          {
            typeItem: 'path',
            data: ['P00000'],
          },
        ]
      },
    ],
    downloads: ['C00001', 'C00002'],
  }
]