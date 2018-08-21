const data = [
  {
    id: 123,
    title: 'S.A.C 2nd GIG',
    purchased: false,
    category: 'tv',
    genre: [
      'fiction',
      'network',
      'action'
    ],
  },
  {
    id: 234,
    title: 'Cowboy Bebop',
    purchased: true,
    category: 'tv',
    genre: [
      'action',
      'unit play',
      'gun'
    ]
  },
  {
    id: 456,
    title: 'Negima!?',
    purchased: false,
    category: 'tv',
    genre: [
      'humour',
      'unit play',
      'art'
    ]
  },
  {
    id: 567,
    title: 'Kingsman',
    purchased: true,
    category: 'movie',
    genre: [
      'fiction',
      'humour',
      'gun'
    ]
  }
];

const fetchData = () => new Promise(resolve => {
  count += 1;
  setTimeout(() => {
    resolve(data);
  }, Math.random() * 1000);
});

let count = 0;

const getCount = () => count;

export default data;
export {
  fetchData,
  getCount,
};
