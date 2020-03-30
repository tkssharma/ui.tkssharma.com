import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  p {
    font-size: 16px;
  }
  a {
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
`

const AboutMe = () => (
  <Wrapper>
    <h3>
      <span role="img" aria-label="work">
        👋{' '}
      </span>
      About me
    </h3>
    <h4>What I am up to</h4>
    <p>
    I’m Tarun, I am Publisher, Trainer Developer, working on Enterprise and open source Technologies JavaScript frameworks (React Angular 2.x), I work with client side and server side javascript programming which includes node js or any other frameworks Currently working with JavaScript framework React & Node js 🚀 with Graphql 🎉 developer publications.
    </p>
    <p>
      These days I am enthusiastic about the world around React, angular and nodejs with Typescript.
    </p>
    <h4>Me & Technical Writing</h4>
    <p>
      I started my blogging journey as tech writer at{' '}
      <a
        href="https://medium.com/@tkssharma"
        target="_blank"
        rel="noopener noreferrer"
      >
        Medium
      </a>
      & 
      <a
      href="https://tkssharma.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      @tkssharma
    </a>
      where I've got over{' '}
      <a
        href="https://twitter.com/tkssharma"
        target="_blank"
        rel="noopener noreferrer"
      >
        1 Million views{' '}
        <span role="img" aria-label="tada">
          🎉
        </span>
        .
      </a>{' '}
      I love writing about code and specifically on modern JavaScript frameworks
      including Node.js, React, React Native and GraphQL.
    </p>
    <p>
      I've written over 100 articles and tutorials for{' '}
      <span style={{ fontWeight: 'bold' }}>
        25 developer publications and organizational blogs
      </span> <br/>
      <a href="http://tkssharma.com">
        My personal Website
      </a>
    </p>
  </Wrapper>
)

export default AboutMe
