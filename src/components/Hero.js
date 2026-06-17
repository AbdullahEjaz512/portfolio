import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import profileImage from '../assets/profile.png';


const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 140px 0 80px 0;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeroGrid = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    align-items: center;
  }
`;

const HeroContent = styled.div`
  padding: 60px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 32px 24px;
  }
`;

const Greeting = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.05;
  letter-spacing: -0.04em;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const TypedWrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
  min-height: 30px;
  letter-spacing: -0.01em;
`;

const Description = styled(motion.p)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 540px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 16px;
  margin-bottom: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 0px; /* Sharp Industrial corner */
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const FooterBlock = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 24px;
  margin-top: auto;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialLink = styled(motion.a)`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const ScrollText = styled.span`
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const HeroImageWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    min-height: 400px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
  filter: grayscale(100%) contrast(110%);
  transition: all ${({ theme }) => theme.transitions.slow};

  &:hover {
    opacity: 1;
    filter: grayscale(20%) contrast(105%);
  }
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <HeroGrid>
        <HeroContent>
          <Greeting
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            [ SYSTEM ACTIVE ] ENGINEER PORTFOLIO
          </Greeting>

          <Name
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Abdullah Ejaz
          </Name>

          <TypedWrapper>
            <TypeAnimation
              sequence={[
                '// AI & CV Engineer',
                2000,
                '// Deep Learning Specialist',
                2000,
                '// Full-Stack Developer',
                2000,
                '// Automated Agent Architect',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </TypedWrapper>

          <Description
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            Bespoke software systems engineered at the intersection of computer vision, 
            generative AI pipelines, and responsive web platforms. Rejecting generic templates 
            for performant, production-ready architectures.
          </Description>

          <ButtonGroup
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
          >
            <PrimaryButton
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Engineer
            </PrimaryButton>
            <SecondaryButton
              href="https://drive.google.com/file/d/1z3iYL9q3zTxzwlgB-VpKMF_5Ned6jB_m/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDownload /> Download CV
            </SecondaryButton>
          </ButtonGroup>

          <FooterBlock
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            <SocialLinks>
              <SocialLink
                href="https://github.com/AbdullahEjaz512"
                target="_blank"
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/abdullah-ejaz-7b4791311"
                target="_blank"
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin />
              </SocialLink>
            </SocialLinks>
            <ScrollText>SCROLL TO INSPECT_</ScrollText>
          </FooterBlock>
        </HeroContent>

        <HeroImageWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProfileImage src={profileImage} alt="Abdullah Ejaz Profile" />
        </HeroImageWrapper>
      </HeroGrid>
    </HeroSection>
  );
};

export default Hero;

