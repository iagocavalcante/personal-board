export default {
  username: window.localStorage.getItem('username') ? window.localStorage.getItem('username') : 'Anonymous',
  boards: window.localStorage.getItem('boards') ? JSON.parse(window.localStorage.getItem('boards')) : [
    {
      id: 1,
      name: 'First Board',
      description: 'First board test',
      'starred': true,
      cards: [
        {
          id: 1,
          title: 'TO DO',
          tasks: [
            {
              title: 'GO ROCK',
              description: 'It\'s just an example',
              placeholder: false
            },
            {
              title: 'GO ROCK 1',
              description: 'It\'s just an example 1',
              placeholder: false
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Second Board',
      description: 'Second board test',
      'starred': true,
      cards: [
        {
          id: 1,
          title: 'TO DO',
          tasks: [
            {
              title: 'GO ROCK',
              description: 'It\'s just an example',
              placeholder: false
            },
            {
              title: 'GO ROCK 1',
              description: 'It\'s just an example 1',
              placeholder: false
            }
          ]
        }
      ]
    }
  ]
}