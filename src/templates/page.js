import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'
import Content from '../components/Content'

const PagesTemplate = ({ data: { mdx: page } }) => (
  <Layout>
    <Content>
      <MDXRenderer>{page.body}</MDXRenderer>
    </Content>
  </Layout>
)

export default PagesTemplate

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        slug
        lead
        image {
          sharp: childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      body
    }
  }
`
