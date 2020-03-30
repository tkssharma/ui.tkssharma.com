import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Global from '../styles/global'
import theme from '../styles/theme'
import Wrapper from './Wrapper'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO';

const Layout = ({ children }) => {


  return (
    <ThemeProvider theme={theme}>
       <SEO />
      <Global />
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
