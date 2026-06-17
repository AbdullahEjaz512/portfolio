import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  padding: 60px 0 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    text-align: left;
  }
`;

const FooterBrand = styled.div``;

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.4rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.03em;
  display: inline-block;
  margin-bottom: 16px;

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const BrandDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 24px;
  max-width: 300px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.card};
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

const FooterColumn = styled.div``;

const ColumnTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

const FooterLinks = styled.ul``;

const FooterLink = styled.li`
  margin-bottom: 10px;

  a {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin-bottom: 30px;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FooterNav = styled.div`
  display: flex;
  gap: 24px;

  a {
    font-family: ${({ theme }) => theme.fonts.code};
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <FooterBrand>
            <Logo href="#home">Abdullah<span>.</span>Ejaz</Logo>
            <BrandDescription>
              Systems Engineer specializing in Deep Learning pipelines, computer vision segmentation networks, 
              and premium full-stack architectures.
            </BrandDescription>
            <SocialLinks>
              <SocialLink href="https://github.com/AbdullahEjaz512" target="_blank">
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/abdullah-ejaz-7b4791311" target="_blank">
                <FaLinkedin />
              </SocialLink>
            </SocialLinks>
          </FooterBrand>

          <FooterColumn>
            <ColumnTitle>Index Map</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="#home">Home</a></FooterLink>
              <FooterLink><a href="#about">About</a></FooterLink>
              <FooterLink><a href="#skills">Skills</a></FooterLink>
              <FooterLink><a href="#projects">Projects</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Services</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="#services">Machine Learning</a></FooterLink>
              <FooterLink><a href="#services">Computer Vision</a></FooterLink>
              <FooterLink><a href="#services">Web Development</a></FooterLink>
              <FooterLink><a href="#services">Data Engineering</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Enquiries</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="mailto:abdullahejaz512@gmail.com">Direct Mail</a></FooterLink>
              <FooterLink><a href="tel:+923365140129">Telephone Interface</a></FooterLink>
              <FooterLink><a href="#contact">Contact Form</a></FooterLink>
              <FooterLink><a href="https://www.linkedin.com/in/abdullah-ejaz-7b4791311" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterContent>

        <Divider />

        <FooterBottom>
          <Copyright>
            © {currentYear} <span>Abdullah Ejaz</span>. Engineered with structural rigor. All rights reserved.
          </Copyright>
          <FooterNav>
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Operations</a>
          </FooterNav>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
};

export default Footer;

