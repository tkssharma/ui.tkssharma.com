import React from 'react'
import styled from 'styled-components'
import Avatar from '../images/logo.jpg'
import NewsletterButton from './NewsletterButton'
import SocialIcon from './SocialIcon'
import {
  FaGithub,
  FaTwitter,
  FaMedium,
  FaDev,
  FaPatreon,
  FaPaypal,
  FaMugHot
} from 'react-icons/fa'

const LeadContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.light.accent100};
  margin-top: 20px;
  margin-left: 20px;
`

const InfoContainer = styled.div`
  flex: 2;
  p {
    color: ${props => props.theme.color.light.accent100};
    max-width: 450px;
    font-size: 18px;
    font-weight: 300;
  }
`

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`

const NewsletterContainer = styled.div`
  flex: 2;
  p {
    color: ${props => props.theme.color.light.accent100};
    max-width: 450px;
    font-size: 18px;
    font-weight: 300;
  }
  @media (max-width: ${props => props.theme.screen.sm}) {
    display: none;
  }
`

const CenterDiv = styled.div`
  text-align: center;
`

const HeaderIntro = () => (
  <LeadContainer>
    <InfoContainer>
      <h3>
        <span role="img" aria-label="wave">
          👋{' '}
        </span>
        Hi, I'm Tarun Sharma
      </h3>
      <p>
      I'm a full stack software developer creating open source projects and writing about modern JavaScript client and server side.
      </p>
      <div>
        <SocialIcon href="https://twitter.com/tkssharma">
          <FaTwitter style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://medium.com/@tkssharma">
          <FaMedium style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://github.com/tkssharma">
          <FaGithub style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://dev.to/tkssharma">
          <FaDev style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://patreon.com/tkssharma">
          <FaPatreon style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://paypal.me/tkssharma">
          <FaPaypal style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
        &ensp;
        <SocialIcon href="https://ko-fi.com/tkssharma">
          <FaMugHot style={{ width: '20px', height: '20px' }} />
        </SocialIcon>
      </div>
    </InfoContainer>
    <NewsletterContainer>
      <CenterDiv>
        <Img src={Avatar} alt="profile image" />
        <NewsletterButton />
      </CenterDiv>
    </NewsletterContainer>
  </LeadContainer>
)

export default HeaderIntro
