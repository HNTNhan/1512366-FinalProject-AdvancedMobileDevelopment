export const usersData = [
  {
    name: 'admin',
    continueLearning: ['C00000', 'C00001', 'C00002'],
    paths: ['P00000', 'P00001'],
    bookmarks: ['C00001', 'C00007', 'C00008'],
    channels: [
      {
        title: 'react',
        user: 'admin',
        type: 'Private',
        member: 1,
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
      {
        title: 'js',
        user: 'admin',
        type: 'Private',
        member: 1,
        progress: 10,
        items: [
          {
            typeItem: 'course',
            data: [],
          },
          {
            typeItem: 'path',
            data: ['P00001'],
          },
        ]
      },
    ]
  },
  {
    name: 'user',
    continueLearning: ['C00000', 'C00002'],
    paths: ['P00000', 'P00001'],
    bookmarks: ['C00001', 'C00008'],
    channels: [
      {
        titleChannel: 'react',
        user: 'admin',
        type: 'Private',
        member: 1,
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
      {
        titleChannel: 'react',
        user: 'admin',
        type: 'Private',
        member: 1,
        progress: 10,
        items: [
          {
            typeItem: 'course',
            data: [],
          },
          {
            typeItem: 'path',
            data: ['P00001'],
          },
        ]
      },
    ]
  }
]