export default {
  username: window.localStorage.getItem('username') ? window.localStorage.getItem('username') : 'Anonymous',
  boards: window.localStorage.getItem('boards') ? JSON.parse(window.localStorage.getItem('boards')) : [
    {
      id: 1,
      title: 'First Board',
      description: 'First board test',
      starred: true,
      lists: [
        {
          id: 1,
          title: 'TO DO',
          tasks: [
            {
              id: 1,
              title: 'GO ROCK',
              description: 'It\'s just an example'
            },
            {
              id: 2,
              title: 'GO ROCK 1',
              description: 'It\'s just an example 1'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Second Board',
      description: 'Second board test',
      starred: true,
      lists: [
        {
          id: 1,
          title: 'TO DO',
          tasks: [
            {
              id: 1,
              title: 'GO ROCK',
              description: 'It\'s just an example'
            },
            {
              id: 2,
              title: 'GO ROCK 1',
              description: 'It\'s just an example 1'
            }
          ]
        }
      ]
    }
  ]
}
