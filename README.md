# Movie  Application - A Clone IMDB App

## How to Build / Run

First, clone the project using :

```bash
git clone git@github.com:Nexus-coder/pet_adoption_app.git
```

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

This is a todo application built using the MERN stack.The project is a really common productivity tool that is used quite frequently.the reason I made it was to further my express javascript skills.


### Screenshot

![](./todo.png)


### Links

- Live Site URL: [Todo Application](https://pet-adoption-app-theta.vercel.app/)

## My Process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Desktop-first workflow
- [React](https://reactjs.org/) - JS library
- Express - NodeJS Framework


### What I learned

From this project I have learnt to use clusters and worker threads and also learnt the difference that clusters allow the server to be run cocurrently on different cores or logical cpu while worker threads just make the instance of the same code in the same file.

I have learnt to do this using the pm2 library which is very handy in helping one to manage processes.

To see how you can add code snippets, see below:

```js
export default async function fetchSearch({ queryKey }) {
    const { animal, location, breed } = queryKey[1];
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
    if (!res.ok) { throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`); }
    return res.json();
}
```

Also from the project I have gotten experience scripting with npm and boosting my productivity.

Finally I have also learnt how to use Mongodb as a database knew it before but I have now gotten better understanding of it.

Also generally i have learnt how to apply node best practices on my projects that i will probably use from now on.


### Continued development

I will continue learning on how to make use of the express framework to bring a lot of projects to life and thus it has been a really amazing time learning all the concepts down to even learning how to test using jest.I will continue using the above guides even as I build more web applications that can serve users with a seamless experience while also mainting the best developer practices.

### Useful resources

- [Express Docs](https://expressjs.com/) - This helped me in bringing the express application to life and also searching for the solutions to bugs where I encountered them

## Author

- Website - [Portfolio](https://portfolio-page-navy-eight.vercel.app/)
- Twitter - [@AndrewK51659634](https://twitter.com/AndrewK51659634)