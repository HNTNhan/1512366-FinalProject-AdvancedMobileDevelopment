export const pathsData = [
  {
    key: 'P00000',
    detail: {
      title: 'React',
      noCourses: '4 Courses',
      duration: '15 Hours',
      description: 'React is a Javascript library, developed in 2013 by Jordan Walke of Facebook. You’ll find React is ' +
        'both very popular (it’s the 5th most starred JS library on GitHub) and used on major sites including on Facebook, ' +
        'Netflix, and Khan Academy. You’ll love the flexibility of using React with your favorite web technologies ' +
        '(except for jQuery!), and this path will take you from the fundamentals all the way up to ' +
        'building full apps with custom styling.',
    },
    progress: 25,
    type: 0,
    listCourses: [
      {
        titleCourse: 'Beginner',
        data: ['C00000', 'C00001'],
      },
      {
        titleCourse: 'Intermediate',
        data: ['C00002']
      },
      {
        titleCourse: 'Advanced',
        data: ['C00003']
      }
    ]
  },
  {
    key: 'P00001',
    detail: {
      title: 'JavaScript Core Language',
      noCourses: '3 Courses',
      duration: '7 Hours',
      description: 'JavaScript is an interpreted programming language that conforms to the ECMAScript specification. JavaScript is high-level, often ' +
        'just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class ' +
        'functions. In this path you will learn the basics of JavaScript as well as more advanced topics such as promises, asynchronous programming, ' +
        'proxies and reflection.',
    },
    progress: 0,
    type: 1,
    listCourses: [
      {
        titleCourse: 'JavaScript Core Language',
        data: ['C00004', 'C00005', 'C00006'],
      },
    ]
  },
  {
    key: 'P00002',
    detail: {
      title: 'Web Application Security',
      noCourses: '3 Courses',
      duration: '7 Hours',
      description: 'Web application security encompasses the security methods applied to websites, web applications, and web services. In this series ' +
        'you’ll learn how to develop and maintain secure web applications by applying security principles and techniques. This series includes secure ' +
        'coding best practices with coverage of the 2017 OWASP Top 10 web application risks.',
    },
    progress: 0,
    type: 0,
    listCourses: [
      {
        titleCourse: 'Beginner',
        data: ['C00007', 'C00008'],
      },
      {
        titleCourse: 'Intermediate',
        data: ['C00009']
      },
      {
        titleCourse: 'Advanced',
        data: []
      }
    ]
  }
];