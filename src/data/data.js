export default {
  data: {
    username: 'Anonymous',
    boards: [
      {
        id: 01,
        name: 'First Board',
        'starred': true,
        cards: [
          {
            id: 01,
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
}