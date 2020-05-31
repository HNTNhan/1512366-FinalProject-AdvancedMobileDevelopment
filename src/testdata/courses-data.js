export const coursesData = [
  {
    key: 'C00000',
    title: 'React: The Big Picture',
    author: ['Cory House'],
    level: 'Beginner',
    released: 'May 11, 2020',
    duration: '1h 10m',
    description: 'You ve heard of React, but is it right for you? In this course, React: The Big Picture, you will first learn why React has become so popular. Next, you will learn the tradeoffs inherent in React\'s design. Finally, you will explore some drawbacks to consider. After watching this course, you\'ll have a clear understanding of React\'s core use cases, advantages, and drawbacks so you can make an educated decision on whether React is right for you.',
    transcript: '',
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '1:26',
        data: [
          {
            name: 'Course Overview',
            duration: '1:26',
          }
        ]
      },
      {
        title: 'Why React?',
        totalDuration: '25:37',
        data: [
          {
            name: 'Intro',
            duration: '0:53',
          },
          {
            name: 'History',
            duration: '2:00',
          },
          {
            name: 'Why React?',
            duration: '0:27',
          },
          {
            name: 'Reason 1: Flexibility',
            duration: '3:30',
          },
          {
            name: 'Reason 2: Developer Experience',
            duration: '4:50',
          },
        ]
      },
      {
        title: 'Tradeoffs',
        totalDuration: '23:31',
        data: [
          {
            name: 'Intro',
            duration: '0:31',
          },
          {
            name: 'Tradeoff 1: Framework vs. Library',
            duration: '2:36',
          },
          {
            name: 'Tradeoff 2: Concise vs. Explicit',
            duration: '2:21',
          },
          {
            name: 'Tradeoff 3: Template-centric vs. JavaScript-centric',
            duration: '6:09',
          },
        ]
      },
    ]
  },
  {
    key: 'C00001',
    title: 'React: Getting Started',
    author: ['Samer Buna'],
    level: 'Beginner',
    released: 'Apr 20, 2020',
    duration: '4h 2m',
    description: 'Building efficient web and mobile interfaces is often challenging and requires the use of imperative logic. React enables you to declaratively describe user interfaces in terms of their state, and it will do the heavy lifting of natively building them for you. In this course, React: Getting Started, you will delve into the fundamental concepts about React and use them to build practical web applications. First, you will see how to design class components and stateful function component, how to one-way flow data and behavior in a component tree, and how to read and update state elements. Then, you will delve into modern JavaScript features used with React like arrow functions, destructuring rest and spread operators, classes, async/await, and more. Next, you will learn some core React tasks like taking input from the user, reading data from an API, managing side effects like timers, and sharing stateful logic with custom hooks. Finally, you will explore how to configure and use a local JavaScript development environment on your machine. When you are finished with this course, you will have the skills and knowledge you need to understand React projects, and start simple React applications from scratch.',
    transcript: [
      {
        title: 'Course Overview',
        data: [
          {
            subTitle: 'Course Overview',
            content: 'Hello everyone. My name is Samer Buna. I work at jsComplete where we create interactive educational content to help people learn coding. Welcome to this React.js: Getting Started course, from Pluralsight, covering the latest stateful function components with the all new React Hooks. React is a simple and powerful library that is used in many big web and mobile applications today. I personally use React in most of the projects I\'m involved in. It helps me be fast and productive. In this course, I cover the new, simple way using function components with Hooks, and the other more verbose way, using class components. This is a fully hands‑on course where I\'ll be building small, practical applications with React. There will be no foo or bar in this course, and I try to avoid contrived examples as much as possible. Learning to code is a practical experience. Try to do and redo the examples I\'ll present in this course and try to expand their scope and challenge yourself with every piece of knowledge that you learn. Some of the topics that we will cover in this course include React\'s design concepts, function and class components and their benefits, JSX and event handlers, working with data and APIs, React Hooks for state and side effects, taking input from the user, communicating between components, React one‑way flow of data, and creating your own local development environment for React. By the end of this course, you should be comfortable working with function and class components in React, manage an application state, and be able to build simple React applications from scratch. This course is a beginner‑level course on the React.js library. No previous knowledge about React itself is needed, but you do need to be comfortable with the JavaScript language to get the most out of this course. I hope you\'ll join me on this journey to learn the basics of the excellent React.js library in this Getting Started course, at Pluralsight.'
          }
        ]
      },
      {
        title: 'The Basics',
        data: [
          {
            subTitle: 'Introduction',
            content: 'Hello, and welcome to the React.js: Getting Started course, from Pluralsight. This course was first published shortly after the React.js library was open sourced, but I\'ve rerecorded the entire course to work with the latest version of React today. All the examples we do in this course should work on any React version greater than 16.8. In this course, we\'re covering the fundamentals of the React.js library. No previous React.js experience is required to take this course. We will be starting from level 0. But you do need some JavaScript experience first. To be specific about that requirement, you need to know how to define and use JavaScript variables, holding scalar values, objects, and the rays. You need to know how to define and use functions and classes. You need to know the basics of working with loops and conditionals. I have some resources here for you if you don\'t feel completely comfortable with the basics of the JavaScript language. I have a book and a bunch of interactive labs that you can try as well. The book is for the complete beginner and the labs cover some important fundamental concepts in JavaScript like function, scopes, and closures. I recommend that you check them out first. If you\'re coming to React with some previous knowledge of JavaScript, but you have not used the modern features of the language that were added in the past few years, that is not a problem. This course has a module to introduce these features. In that course module, I\'ll cover things like arrow functions, destructuring, REST, spread operators, classes, and more. We will not be using advanced JavaScript. A basic knowledge of the language will be enough for you to survive this course. However, you\'re likely to run into problems that are related to the language syntax rather than the React.js API. I\'ve written an article on jsComplete about the common problems learners usually face when working with the React.js library. Scan through this article quick and keep it for your reference when you run into a problem while taking this course. Also remember that you can always ask for help in the Discussions tab available in this course page. Pluralsight mentors actively monitor these discussion forums, but please be as descriptive as you can when you ask a question. Share your code, list any errors you\'re getting, and share a screenshot if you can. And when sharing your code, don\'t paste it directly here. This discussion tool is not good for that. Use a GitHub gist or something similar. Quick side note about the very important pause button in your video player. You\'re going to need to use it a lot in this course. I often get complaints that my Pluralsight courses are a bit fast and it\'s hard for people to keep up. This is not because I talk fast. This is because the courses are tightly edited with no breaks. A lot of content is intentionally jammed into a short course. You should use the pause and rewind buttons and control the play speed if you need to. Every time I ask you a question, pause the video and think about it. Every time I use something that you\'ve never seen before, pause the video and google it. Rewind and watch things many times if you need to. If you\'re used to the pace of on‑site workshops, you\'ll find the pace here much faster. The pause and rewind buttons are your best friends. Also, in some of the modules of this course, I\'ll be presenting you with challenges. Pause videos and do these challenges. The best way to learn is really to do. I\'ll also ask a lot of questions in this course, and I\'ll answer these questions right after, but I want you to imagine yourself in an interview for a job about React.js and treat these questions as if they were your interview questions. Try to answer them first before you listen to me answering them. Here\'s your first interview question. Why do you like React? Whether you have formed an opinion about React or not, as a React developer, you should know the strengths and weaknesses of the library. Let\'s talk about that next.'
          },
          {
            subTitle: 'Why React?',
            content: `I'm a big fan of starting with why? So before you dive in and write your first React component, let me make sure that you know why committing to learning React is a very good thing that you're doing. If you've already formed your opinion about React, you can skip this video. Let's start with React's official definition. It states that it is a JavaScript library for building user interfaces. It is important to understand the two different parts of this definition. React is a JavaScript library and not a framework. The words library and framework mean different things in different contexts, and this could be a point for or against React. What's important to remember here is that React is small, and it's not a complete solution. You will need to use other libraries with React to form solutions. React does not assume anything about the other parts in any full solution. It focuses on just one thing, which is the second part of the definition, building user interfaces. A user interface is anything we put in front of users to have them interact with a machine. User interfaces are everywhere, from the simple buttons on a microwave to the dashboard of a space shuttle. If the device we're trying to interface can understand JavaScript, we can use React to describe a user interface for it. Since web browsers understand JavaScript, we can use React to describe web user interfaces. I like to use the word describe here because that is what we basically do with React. We just tell React what we want, and it will build the actual user interfaces on our behalf in the web browser. Without React or similar libraries, we would need to manually build user interfaces with native web APIs in JavaScript, and that is not as easy. When you hear the statement that React is declarative, this is exactly what it means. We describe user interfaces with React and tell it what we want, not how to do it. React will take care of the how and translate our declarative descriptions, which we write in the React language to actual user interfaces in the browser. Of course, HTML itself is a declarative language, but with React, we get to be declarative for HTML interfaces that represent dynamic data, not just static content. Let's go back to React being a library and not a framework, and let me answer this question. How exactly is not being a framework a good thing? Frameworks serve a great purpose, especially for young teams and startups. When working with a framework, many smart design decisions are already made for you, which gives you a clear path to focus on writing good application‑level logic. However, frameworks come with some disadvantages as well. For experienced developers working on large codebases, these disadvantages are sometimes a deal breaker. Let me name two of the important disadvantages about using a framework. Frameworks are not flexible, although some claim to be. Frameworks want you to code everything a certain way. If you try to deviate from that way, the framework usually ends up fighting you about it. Frameworks are also large and full of features, and that makes them hard to customize for specialized cases. If you need to use only a small piece of a framework, you usually have to include the whole thing. This is changing today, but it is still not ideal. Some frameworks are going modular, which I think is great, but I am a big fan of the pure UNIX philosophy to write programs that do one thing and do it well. And React follows this philosophy because it is a small library that focuses on just one thing, enabling developers to declaratively describe their user interfaces and model the state of these interfaces. Here's a summary of the reasons why I think React gained this massive popularity. Working with the DOM API is hard. React basically gives developers the ability to work with a virtual browser that is friendlier than the real browser. When React was first released, I remember there was a lot of buzz around the performance of its virtual DOM, which we will talk about shortly. The virtual DOM performance is certainly a nice plus, but I think what developers like more about this is the fact that they wouldn't need to deal with the DOM API. Some people don't like this second point, but you'll often hear that React is just JavaScript. What that means is that there is a very small React API to learn, and after that, your JavaScript skills are what make you a better React developer. This is a big advantage over libraries with bigger APIs. Learning React pays off big time for iOS and Android mobile applications as well. React Native allows you to use your same React skills to build native mobile applications. You can even share some logic between your web iOS and Android applications. The React team at Facebook tests all improvements and new features that get introduced to React right there on facebook.com, which increases the trust in the library among the community. It is rare to see big and serious bugs in React releases because they only get released after thorough production testing at Facebook. Most importantly, remember the one thing that React does exceptionally well. React established a new language between developers and browsers that allowed developers to declaratively describe stateful user interfaces. This means instead of coming up with steps for the transactions on their interfaces, developers just describe the interfaces in terms of a final state, like a function. When transactions happen to that state, React takes care of updating the user interfaces based on that. If someone asked you to give one reason why React is worth learning, this last one is the one. If you need to convince someone about React, you can send them to this article, which summarizes what we covered in this video. However, to keep the course short, I'll stop babbling about the why and get you started on the what and the how next.`
          }
        ]
      }
    ],
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '2:06',
        data: [
          {
            name: 'Course Overview',
            duration: '2:06',
          }
        ]
      },
      {
        title: 'The Basics',
        totalDuration: '57:22',
        data: [
          {
            name: 'Introduction',
            duration: '3:53',
          },
          {
            name: 'Why React?',
            duration: '5:57',
          },
          {
            name: `React's Basic Concepts`,
            duration: '5:22',
          },
          {
            name: 'Your First React Component',
            duration: '10:34',
          },
          {
            name: 'Your First React Hook',
            duration: '7:02',
          },
        ]
      },
      {
        title: 'Modern JavaScript Crash Course',
        totalDuration: '22:40',
        data: [
          {
            name: 'ECMAScript and TC39',
            duration: '1:25',
          },
          {
            name: 'Variables and Block Scopes',
            duration: '4:37',
          },
          {
            name: 'Arrow Functions',
            duration: '2:58',
          },
          {
            name: 'Object Literals',
            duration: '2:17',
          },
        ]
      },
    ]
  },
  {
    key: 'C00002',
    title: 'Building Applications with React and Flux',
    author: ['Cory House'],
    level: 'Intermediate',
    released: 'Jun 19, 2019',
    duration: '5h 11m',
    description: `Get started with React, React Router, and Flux by building a real-world style data-driven application that manages Pluralsight course data. This course uses a modern client-side development stack including create-react-app, Node, Webpack, Babel, and Bootstrap.`,
    transcript: [
      {
        title: 'Course Overview',
        data: [
          {
            subTitle: 'Course Overview',
            content: `Hi everyone, my name is Cory house, and welcome to my course, Building Applications with React and Flux. I'm the principal consultant at reactjsconsulting.com. I've enjoyed working heavily with React since it was open source in 2013. React is one of the world's most popular technologies for building web apps today and for good reason. It's fast, it offers an elegant programming model, and it boasts a huge ecosystem of existing libraries and components. In this course, we're going to build a realistic data management app to explore the core features of React, Flux, and React Router. Some of the major topics that we'll cover include generating new React apps with create-react-app, handling state and props, performing client-side routing with React Router, creating reusable React components, and implementing one-way data flows with Flux. By the end of this course, you'll know how to build a realistic and scalable React app that supports creating, updating, and deleting data. Before beginning the course, you should be familiar with JavaScript, HTML, and some basic CSS. I'm assuming that you're new to React, and don't worry if you aren't up to speed on all the latest JavaScript features. I'll introduce modern JavaScript features along the way. I hope you'll join me on this journey to learn React, React Router, and Flux with the Building Applications with React and Flux course, at Pluralsight.`
          }
        ]
      },
      {
        title: 'Intro',
        data: [
          {
            subTitle: 'Intro',
            content: `Hi, and welcome to Building Applications with React and Flux. I'm Cory House. In this course, we're going to use React, React Router, Flux, and a variety of related technologies to build a realistic course management application. You can find me on Twitter as @housecor or on my consulting site at reactjsconsulting.com. So who is this course for? Well, there are three core audiences for this course. If you're new to React and want to learn it by building a real app from the ground up, then this course is for you. I assume no previous knowledge of React. And if you're building a real app with React, you'll likely need to define routes so that users can navigate through your app, share deep links, and transition smoothly between different app states. React Router is a popular routing option that we'll use in this course to handle our routing. Finally, maybe you enjoy React, but you haven't yet tried out Flux. In this course, you'll learn how to implement unidirectional data flows using the Flux pattern, including actions, dispatchers, stores, and the various new jargon that comes along with using Flux. We'll explore the core concepts behind Flux and then use it to handle events and data flows in our app. Next, let's briefly look at the high-level course outline.`
          },
          {
            subTitle: 'Course Outline',
            content: `Here's the high-level course outline. In the first half of the course, we'll quickly set up our development environment. Then we'll explore React from scratch, including core concepts like JSX, components, lifecycle methods, Hooks, reusable components, component composition, and forms. We'll also implement rich client-side routing using React Router, the most popular routing solution for React. In the final two modules, we'll explore Flux in detail, including actions, dispatchers, and stores. We'll clean up our data handling by utilizing the Flux pattern for unidirectional data flows. Throughout the course, we'll build a course management application that supports creating, reading, updating, and deleting course data using these technologies. When we're done, we'll have a clean, scalable solution for rich, component-based web applications. And at the end of the course, I'll wrap up with a short challenge for you to put your new-found skills to work by enhancing this new application that we've created. In this module, I'll begin by clarifying the target audience for this course. Then I'll answer an important first question, why React? We'll explore a few innovative ideas that React and Flux help popularize. And I'll provide a high-level introduction to the technologies that we'll be using throughout the course.`
          }
        ]
      }
    ],
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '1:37',
        data: [
          {
            name: 'Course Overview',
            duration: '1:37',
          }
        ]
      },
      {
        title: 'Intro',
        totalDuration: '31:03',
        data: [
          {
            name: 'Intro',
            duration: '1:20',
          },
          {
            name: 'Course Outline',
            duration: '1:23',
          },
          {
            name: `Who Is This Course For?`,
            duration: '1:21',
          },
          {
            name: 'Why React?',
            duration: '7:00',
          },
          {
            name: 'Tech Overview',
            duration: '38',
          },
        ]
      },
      {
        title: 'Environment Setup',
        totalDuration: '24:33',
        data: [
          {
            name: 'Intro',
            duration: '0:59',
          },
          {
            name: 'Install Node',
            duration: '0:40',
          },
          {
            name: 'Install VS Code',
            duration: '0:28',
          },
          {
            name: 'Configure VS Code Extensions: Prettier and ESLint',
            duration: '1:44',
          },
        ]
      },
    ]
  },
  {
    key: 'C00003',
    title: 'Advanced React.js',
    author: ['Samer Buna'],
    level: 'Advanced',
    released: 'Jul 21, 2017',
    duration: '3h 54m',
    description: `Have you ever wanted to create full-stack Javascript applications with React.js? This course, Advanced React.js, covers many advanced topics and best practices about React.js. First, you'll learn how to configure and customize full-stack JavaScript environments. Next, you'll explore how to work with async data and manage an application state both internally and externally. Additionally, you'll dive into components context API, and learn how to use it with higher order components, pure components, presentational and container components, and all components lifecycle methods. Finally, you'll discover performance analysis and optimization, how to use immutable data structures, and how to create production builds for both React.js and Node.js. By the end of this course, you'll be able to efficiently use presentational and stateful React components in production.`,
    transcript: '',
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '1:27',
        data: [
          {
            name: 'Course Overview',
            duration: '1:27',
          }
        ]
      },
      {
        title: 'UIs in React',
        totalDuration: '7:33',
        data: [
          {
            name: 'Welcome and Prereqs',
            duration: '1:40',
          },
          {
            name: 'Why Style?',
            duration: '2:38',
          },
          {
            name: `Prepare for React Land`,
            duration: '3:13',
          },
        ]
      },
      {
        title: 'Inline Styles',
        totalDuration: '21:06',
        data: [
          {
            name: 'Forget What You Know',
            duration: '1:18',
          },
          {
            name: 'Current Origins of Inline Styles',
            duration: '4:12',
          },
          {
            name: 'Demo Introduction',
            duration: '2:02',
          },
          {
            name: 'Inline Styles Demo: Install',
            duration: '1:11',
          },
          {
            name: 'Inline Styles Demo: Styling',
            duration: '9:59',
          },
          {
            name: 'Evaluate Inline Styles',
            duration: '2:22',
          },
        ]
      },
    ]
  },
  {
    key: 'C00004',
    title: 'JavaScript: Getting Started',
    author: ['Mark Zamoyta'],
    level: 'Beginner',
    released: 'Jan 21, 2020',
    duration: '3h 56m',
    description: `If you’re learning to program for the first time, or if you’re coming from a different language, this course, JavaScript: Getting Started, will give you the basics for coding in JavaScript. First, you'll discover the types of applications that can be built with JavaScript, and the platforms they’ll run on. Next, you’ll explore the basics of the language, giving plenty of examples. Lastly, you’ll put your JavaScript knowledge to work and modify a modern, responsive web page. When you’re finished with this course, you’ll have the skills and knowledge in JavaScript to create simple programs, create simple web applications, and modify web pages.`,
    transcript: [
      {
        title: 'Course Overview',
        data: [
          {
            subTitle: 'Course Overview',
            content: `Hello everyone. My name is Mark Zamoyta, and welcome to my course, JavaScript: Getting Started. I am a software consultant and developer in the Portland, Oregon area. JavaScript is one of the most popular programming languages. According to GitHub, JavaScript is the top programming language, and it's more than twice as popular as the runner‑up, Python. Learning the JavaScript language is valuable for any developer. JavaScript is the language of the web supported by all major browsers, but tools exist to take JavaScript far beyond web pages. You can create native smartphone and tablet apps, desktop apps for Windows and Mac, and even server‑side apps using JavaScript. In this course, I'll cover JavaScript programming for those who are completely new to programming. This is also valuable for programmers who are just new to the JavaScript language. We'll learn the JavaScript features needed to get you started, and we'll build the card game Blackjack along the way as a sample project. By the end of this course, you'll know the very basics of JavaScript and you'll be able to build simple programs for the web. No prior knowledge of programming is required for this course. I hope you'll join me on this journey in learning how to program with my Pluralsight course, JavaScript: Getting Started.`
          }
        ]
      },
      {
        title: 'Introduction to JavaScript',
        data: [
          {
            subTitle: 'Introduction',
            content: `Hello and welcome to JavaScript: Getting Started. My name is Mark Zamoyta. JavaScript is the programming language of the web. It started out as a way to add small bits of functionality to a website, but now JavaScript has evolved into much more. JavaScript is used on the vast majority of websites and is supported by every major browser. The language has evolved to support the creation of business applications on the web. And with web connectivity built in, almost any kind of utility, security, or data application can be created using JavaScript. Games can be created with JavaScript as well. You may have heard of Unity, a popular game engine for 3D and 2D games. JavaScript is supported as a programming language for this engine. For large business applications, JavaScript is popular and has been embraced by a scalable language called TypeScript. This language is a superset of JavaScript, so you'll need to understand JavaScript well in order to write large‑scale business applications and other software using TypeScript. JavaScript is not just for applications which run in browsers on the web. You can also create native applications for smartphones and tablets using JavaScript. A popular technology for this is Apache Cordova. JavaScript can also be used to create full‑fledged applications for the Mac and Windows desktops. There's no need for a browser at all. A popular technology to accomplish this is Electron. Writing server‑side code can also be accomplished in JavaScript. You can create web servers, web APIs, and other services using a technology called Node.js. So JavaScript is a multi‑platform language. It will run in any modern web browser. It can be used to create native applications on smartphones and tablets, it can create desktop software for Mac and Windows computers, and it can be run on any back‑end server as well. No matter where you want your application to run, you can code it in JavaScript. In this course, I'll teach you the very basics of how to develop software using JavaScript. In the next clip, I'll show you how we can get up and running very quickly.`
          },
          {
            subTitle: 'Installing Development Software',
            content: `In order to start working with JavaScript, there's certain software that needs to be installed on our machines. I'm on a Windows device, so we're at a command prompt. But on a Mac you would go to a terminal window. And the first thing I want to do is I want to see if Git is installed, so I could type git ‑‑version, and I do have it installed. But if you get some kind of error here, you can install Git at this site, git‑scm.com. If you scroll down a little bit, you can see the Downloads button, and it's available for Mac, Windows, and Linux. And once Git is installed, the next thing we need is Node.js, specifically, we need the npm package manager, which comes bundled with it. We can type npm ‑‑version. And you can see that npm is installed here, but again, if it's not installed, you can visit nodejs.org and download it here. This is detecting that I have Windows, but if you click the other downloads link, there are versions for Windows, Mac, and Linus. And the last thing we need is a code editor. In this course I'll be using Visual Studio Code. You can download that at code.visualstudio.com. And the editor and the other tools are all free. You can just download the version for your operating system, whether it's Mac, Windows, or Linux. Going back to the command prompt, you'll know code is installed because you can just type code. And that starts up the editor with the welcome screen. And those are the three main tools that you're going to need for this course. Again, you'll need Git, npm, and Visual Studio Code. In the next clip, we'll build a Hello World application, which will be our starting point.`
          }
        ]
      }
    ],
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '1:25',
        data: [
          {
            name: 'Course Overview',
            duration: '1:25',
          }
        ]
      },
      {
        title: 'Introduction to JavaScript',
        totalDuration: '11:39',
        data: [
          {
            name: 'Introduction',
            duration: '2:15',
          },
          {
            name: 'Installing Development Software',
            duration: '1:53',
          },
          {
            name: `Hello World Project from GitHub`,
            duration: '5:08',
          },
          {
            name: `Our Sample Website`,
            duration: '2:21',
          },
        ]
      },
      {
        title: 'JavaScript Beginnings',
        totalDuration: '23:39',
        data: [
          {
            name: 'Introduction',
            duration: '1:41',
          },
          {
            name: 'Adding JavaScript Code to a Web Page',
            duration: '3:39',
          },
          {
            name: 'Working with JavaScript Files',
            duration: '6:18',
          },
          {
            name: 'Formatting Code',
            duration: '2:18',
          },
          {
            name: 'Detecting and Fixing Errors',
            duration: '3:14',
          },
        ]
      },
    ]
  },
  {
    key: 'C00005',
    title: 'JavaScript Syntax and Operators',
    author: ['Paul D. Sheriff'],
    level: 'Beginner',
    released: 'Nov 12, 2019',
    duration: '1h 42m',
    description: `Are you a JavaScript programmer that needs to learn more about the syntax, exception handling, and the wide array of operators JavaScript has to offer? In this course, JavaScript Syntax and Operators, you will expand your knowledge of the JavaScript language. First, you will learn all about the switch statement and the difference between for/in and for/of. Next, you will discover the various math, comparison, and logical operators, in addition to handling exceptions and determining the data type of variables. Finally, you will explore the 'this' keyword and the spread operator. When you are finished with this course, you will have gained the skills and knowledge of JavaScript syntax and operators needed to propel your JavaScript applications to the next level.`,
    transcript: '',
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '1:33',
        data: [
          {
            name: 'Course Overview',
            duration: '1:33',
          }
        ]
      },
      {
        title: 'All About the Switch Statement',
        totalDuration: '14:35',
        data: [
          {
            name: 'Course Intro, Assumptions, and Related Courses',
            duration: '1:12',
          },
          {
            name: 'Modules in This Course',
            duration: '1:33',
          },
          {
            name: `How the Switch Statement Works`,
            duration: '1:26',
          },
          {
            name: `Simple Switch Statement Demo`,
            duration: '2:49',
          },
          {
            name: `Multiple Case Statements and Forget a Break`,
            duration: '3:03',
          },
          {
            name: `Switch Uses Strict Comparison`,
            duration: '1:15',
          },
          {
            name: `Block-level Scope Issue with Switch Statements`,
            duration: '2:41',
          },
          {
            name: `Module Summary`,
            duration: '0:33',
          },
        ]
      },
      {
        title: 'The Difference Between for/in and for/of',
        totalDuration: '11:32',
        data: [
          {
            name: 'Using a for/in Loop',
            duration: '2:44',
          },
          {
            name: 'Using a for/of loop',
            duration: '3:09',
          },
        ]
      },
    ]
  },
  {
    key: 'C00006',
    title: 'JavaScript Variables and Types',
    author: ['Barry Luijbregts'],
    level: 'Intermediate',
    released: 'Aug 19, 2019',
    duration: '43m',
    description: `At the core of working with variables and types in JavaScript is a thorough knowledge of employing variables, literals and assignments, and applying primitive types. In this course, JavaScript Variables and Types, you’ll learn how to work with variables and types in JavaScript. First, you’ll learn how to employ variables. Next, you’ll explore employing literals and assignments. Finally, you’ll discover how to apply primitive types. When you’re finished with this course, you’ll have a foundational knowledge of employing variables, literals and assignments, and applying primitive types that will help you as you move forward to work with variables and types in JavaScript.`,
    transcript: [
      {
        title: 'Course Overview',
        data: [
          {
            subTitle: 'Course Overview',
            content: `Hi everyone, my name is Barry, and welcome to my course, JavaScript Variables and Types. I am an independent software developer and architect with a passion for the cloud and web development. JavaScript is one of the most used programming languages for developing web applications. Because of that, you should learn as much as you can about it so that you can excel at creating web applications. In this course, you are going to learn some advanced JavaScript topics that can help you to make your code more readable and maintainable. Some of the major topics that we will cover include template literals and tagged templates, the difference between the let and const keywords, and how to test strings for specific content. By the end of this course, you'll know how to make your JavaScript code more maintainable. Before beginning the course, you should be familiar with JavaScript and the basics of web development. I hope you'll join me on this journey to learn some advanced JavaScript features with the JavaScript Variables and Types course, at Pluralsight.`
          }
        ]
      },
      {
        title: 'Using Variables, Literals, and Assignments',
        data: [
          {
            subTitle: 'How This Course Works',
            content: `Hi, I'm Barry. Welcome to this course about JavaScript variables and types. This course will teach you some advanced concepts and techniques in JavaScript that can help you to create readable and maintainable code. In this first module, you'll learn about variable use, string literals, and array and object deconstruction, which assigns values to new variables. And before we dive into the code, we'll discuss how this course works and what you need to follow along, and after that, you can enjoy lots of demos to learn some advanced JavaScript techniques. Ready? Let's dive in. Before we dive in, I want to quickly show you how this course works and how you can follow along with the demos. I've set up the demos as simply as I can so that you don't have to do a lot of complicated setup to follow along. All the demos are done in Visual Studio Code, which is a simple yet powerful code editor, which is available for most platforms. You can download it for free at code.visualstudio .com. I also assume that you already know what JavaScript is and how it works. You should also know the basics of web development, so what the structure of a basic website looks like and how it is used to paint a website on the screen of the user. The demos are all done using a simple website. You need the code for the website to follow along. In the next slide, I'll show you where to get it. And finally, the course contains lots of demos. Most techniques are explained in simple demos, and some are explained through slides. The demos are built around a simple web application, which you can download from GitHub at this address. All right, let's take a look at the demo application. Here it is in Visual Studio Code. Here you can see the files of the web application. It is a simple app that has an HTML file, some CSS, and most importantly for us, a JavaScript file. You can get this code straight from Visual Studio Code by doing View, Command Palette, and then use the Git Clone command and enter the URL of the GitHub repository for the demo code. Alternatively, you can also go to the GitHub page of that address and download or clone the code manually. Let's take a look. The application is used to apply for a loan. The JavaScript code base is messy, and we are going to use some advanced JavaScript techniques to make it more readable and maintainable. This is the index.html file, which is the only HTML file. It contains a table with fields that users need to fill in to apply for a loan. These are things like their name and date of birth. Also, we have a CSS file. This contains the basic styles for the web application. Nothing fancy here. And this site.js file is what this course is all about. This is the JavaScript that makes the application work. It is pretty straightforward and, like I said, pretty messy. It defines a loan application class that we use to store applications for loans in. We store those applications in this array here, and when the application loads, we load some existing loan applications into the array so that we have something to play with. A loan application consists of an applicant's name, date of birth, annual income, and some risk factors like if she has kids or other loans. Applicants also need to fill in the purpose for the loan and the amount they want to borrow. When the application loads, it populates an HTML select element, which is a drop-down list with the preloaded loan applications. I do that here by iterating over the array with the applications and creating new items for the drop-down list. And when a user clicks on an item in the drop-down list, the loan application gets loaded. This simply gets the loan application and loads its values into the input boxes on the screen. There is a lot more code in this JavaScript file. There are functions that validate the user's input and functions that add a new loan application. It's not important to know exactly how the app works. I'll cover the pieces that we need to clean up in the demos. So let's see this thing in action. You can run the web app by simply opening the file system like this and opening the index.html file in a browser. I use Google Chrome, but you can use your favorite browser if you want. Please avoid using Internet Explorer, as that doesn't play well with web standards and some of the things that we are going to cover. As you can see, I can load an existing application, and it creates a summary for me at the bottom, like this. All right, that's it. Enough introduction. Let's dive in. We'll start with a demo about JavaScript template literals and tagged template literals. These can help you to make strings more useful and readable in code. We'll also cover the difference between the let and const keywords, and we'll take a look at how to easily put values from arrays and objects into distinct variables using the destructuring syntax.`
          },
          {
            subTitle: 'Using Template Literals',
            content: `Here we are in Visual Studio Code. I have the JavaScript file for the web app open, and on the right I have opened the app in a browser. This way I can easily refresh the browser and show the result of what I'm doing in JavaScript. I'm in the loadApplication function. This is triggered when I click an existing loan application in the drop-down box. It finds the loan application and takes its values and puts them in the input elements. It also shows a summary, which I call the risk profile, right here. This is just text that is put in a label element and is generated by this function. Let's take a look. The generateRiskProfile uses the inputs from the user to generate a risk profile for the loan. Obviously, this is not how your bank does it. Well, I hope it doesn't. For instance, I take a look if your name and title has an MD, PhD, or doctor in there. If it has, the risk gets lowered. I also take a look at age and adjust the risk for that. And also, the amount that you want to borrow versus your income and so on. And here at the end the risk is calculated, and I aggregate that with some other details into a long string that I return and is displayed on the screen. We are going to focus on this string. This is not a great way to create a string like this. It is long and not very readable in code, especially on a screen like this. So what can we do? We can use a template literal to make this more readable and useful. A template literal is sometimes also called a string literal in JavaScript. How do we do that? First, I want to make this one long string without the concatenation, like this. Remove this one and this one. Okay. And now I use backticks to indicate that this is a template literal. There we go. And here is the beautiful part. I can now add variables through interpolation with a dollar sign and curly braces. This will add the applicant name at runtime. I'll do this one as well. And finally, the risk profile also. Okay, let's save this and see if it still works. Refresh the browser, and load an application. All right, it still works. Oh, I do have an additional period here though. This is the text that I insert that says that the application will be reviewed or not. All right, I would also like to format the text by creating line breaks. I can easily do that in a template literal by formatting it how I want it to look. And it automatically preserves the line breaks. See, it works. Let's add another one. This also improves the readability of the code as it is much more clear what is happening now. Let me change it slightly by taking this string and put it in here. Now add the loan amount as well. I just want to show what that looks like. This is the amount that the user wants to borrow. I still need a currency sign in front of that. I can, for instance, do that like this. I can create expressions in here that are simple like this or are more complex and add numbers or call functions. Pretty cool, right? That is a simple template literal. In the next clip, we'll expand on this example to make it more functional.`
          }
        ]
      }
    ],
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '1:21',
        data: [
          {
            name: 'Course Overview',
            duration: '1:21',
          }
        ]
      },
      {
        title: 'Using Variables, Literals, and Assignments',
        totalDuration: '26:51',
        data: [
          {
            name: 'How This Course Works',
            duration: '5:22',
          },
          {
            name: 'Using Template Literals',
            duration: '3:26',
          },
          {
            name: `Create a Tagged Template Literal`,
            duration: '6:04',
          },
          {
            name: `The Difference Between Let and Const`,
            duration: '5:46',
          },
          {
            name: `Use the Destructing Syntax to Get Values from Arrays and Objects`,
            duration: '3:51 ',
          },
          {
            name: `Summary and Where to Go Next`,
            duration: '2:20',
          },
        ]
      },
      {
        title: 'Applying Primitive Types',
        totalDuration: '14:53',
        data: [
          {
            name: 'Introduction',
            duration: '0:33',
          },
          {
            name: 'Test Strings for Specific Content',
            duration: '4:39',
          },
          {
            name: 'Test Numbers for Type and Safety',
            duration: '4:16',
          },
          {
            name: 'Understanding Symbols',
            duration: '3:16',
          },
          {
            name: 'Summary and Where to Go Next',
            duration: '2:06',
          },
        ]
      },
    ]
  },
  {
    key: 'C00007',
    title: 'Play by Play: Modern Web Security Patterns',
    author: ['Lars Klint', 'Troy Hunt'],
    level: 'Beginner',
    released: 'Apr 18, 2018',
    duration: '1h 24m',
    description: `Play by Play is a series in which top technologists work through a problem in real time, unrehearsed, and unscripted. In this course, Play by Play: Modern Web Security Patterns, Troy Hunt and Lars Klint investigate current security web approaches and trends with real world examples, and then dive into how these incidents and errors can be fixed with easy to use techniques. Learn how subresource integrity checking can validate assets, content security policies in action and learn how to configure them, and get crucial knowledge on how important HTTPS is and some of the tools you can use to test your site. By the end of this course, you’ll have all the tools you need to learn about how you can secure your web assets, with the Modern Web Security Standards.`,
    transcript: '',
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '2:22',
        data: [
          {
            name: 'Course Overview',
            duration: '2:22',
          }
        ]
      },
      {
        title: 'Current Issues of Web Development Security',
        totalDuration: '8:07',
        data: [
          {
            name: 'Introduction',
            duration: '2:01',
          },
          {
            name: 'Explaining the Problem of Including External JavaScript',
            duration: '6:06',
          },
        ]
      },
      {
        title: 'Subresource Integrity Checking and Content Security Policies',
        totalDuration: '33:42',
        data: [
          {
            name: 'Explaining Subresource Integrity Checking',
            duration: '6:32',
          },
          {
            name: 'Issues With Subresource Integrity Checking',
            duration: '2:31',
          },
          {
            name: 'Content Security Policies in Action',
            duration: '5:28',
          },
          {
            name: 'Reporting Content Security Policy Violations',
            duration: '7:47',
          },
          {
            name: 'Adding Content Security Policy Exceptions',
            duration: '3:07',
          },
          {
            name: 'Issues With the Cross-Site Scripting Auditor',
            duration: '8:04',
          },
        ]
      },
    ]
  },
  {
    key: 'C00008',
    title: 'What Every Developer Must Know About HTTPS',
    author: ['Troy Hunt'],
    level: 'Beginner',
    released: 'Apr 12, 2017',
    duration: '3h 24m',
    description: `Securing the transport layer of any application talking over the web is becoming an absolutely essential attribute of modern software. However, HTTPS is frequently not implemented due to perceived (rather than actual) barriers and when it is, it's often done poorly. Not only that, but many modern browser features that can help streamline secure communications (and actually make it more efficient and resilient) are rarely used. In this course, What Every Developer Must Know About HTTPS, you will learn all about why you need HTTPS. First, you'll learn the many positive things that HTTPS does. Next, you'll learn about what many people perceive as barriers to HTTP adoption. Finally, you'll spend some time exploring some topics that go outside of the the basics of HTTPS. By the end of this course, you'll have a fundamental knowledge to both implement HTTPS properly from the outset and retrofit it to existing applications.`,
    transcript: '',
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '1:50',
        data: [
          {
            name: 'Course Overview',
            duration: '1:50',
          }
        ]
      },
      {
        title: 'The HTTPS Value Proposition',
        totalDuration: '37:55',
        data: [
          {
            name: 'Overview',
            duration: '2:33',
          },
          {
            name: 'The Rise and Rise of HTTPS',
            duration: '3:35',
          },
          {
            name: 'Understanding a Man in the Middle Attack',
            duration: '6:58',
          },
          {
            name: 'The Importance of Confidentiality',
            duration: '2:30',
          },
          {
            name: 'The Importance of Integrity',
            duration: '3:21',
          },
          {
            name: 'The Importance of Authenticity',
            duration: '4:05',
          },
          {
            name: 'Abuses of Unencrypted Traffic Are Everywhere',
            duration: '3:17',
          },
          {
            name: 'The (Perceived) Barriers to HTTPS',
            duration: '3:31',
          },
          {
            name: 'The Big Browser Shift',
            duration: '5:17',
          },
          {
            name: 'Summary',
            duration: '2:44',
          },
        ]
      },
    ]
  },
  {
    key: 'C00009',
    title: 'Secure Coding: Preventing Sensitive Data Exposure',
    author: 'Timothy Ghanim',
    level: 'Intermediate',
    released: 'Sep 24, 2019',
    duration: '1h 23',
    description: `Would you like the ability to recognize what is needed to make a web application properly manage sensitive data and prevent it from unintended exposure? This course, Secure Coding: Preventing Sensitive Data Exposure, will show you the knowledge that is based on the recommendations set by the Open Web Application Security Project (or OWASP in short). First, you will learn how to think of sensitive data and what constitutes sensitive data. Next, you will discover TLS; the protocol to protect sensitive data transmitted between a web browser and web application and the different facilities it provides to enable this protection. Finally, you will explore how to properly manage user passwords stored in a database. When you’re finished with this course, you will have the knowledge of preventing sensitive data exposure needed to effectively and efficiently apply them in your own Web applications.`,
    transcript: '',
    lessons: [
      {
        title: 'Course Overview',
        totalDuration: '1:33',
        data: [
          {
            name: 'Course Overview',
            duration: '1:33',
          }
        ]
      },
      {
        title: 'Defining OWASP Top 10 Sensitive Data Exposure',
        totalDuration: '14:20',
        data: [
          {
            name: 'Introduction to Sensitive Data',
            duration: '6:43',
          },
          {
            name: 'Attack Surface Analysis',
            duration: '4:49',
          },
          {
            name: `Real-world Examples`,
            duration: '2:46,
          },
        ]
      },
      {
        title: 'Attacking the Web Application',
        totalDuration: '33:45',
        data: [
          {
            name: 'Overview',
            duration: '2:56',
          },
          {
            name: 'Data In-transit Attack Context',
            duration: '4:22',
          },
          {
            name: 'Demo: Attack on Plain HTTP In-transit',
            duration: '5:13',
          },
          {
            name: 'Transport Layer Security (TLS)',
            duration: '5:23',
          },
          {
            name: 'Demo: Using HTTPS',
            duration: '2:30',
          },
          {
            name: 'New Attack Vector',
            duration: '2:26',
          },
          {
            name: 'Discussion',
            duration: '3:14',
          },
        ]
      },
    ]
  },
]

