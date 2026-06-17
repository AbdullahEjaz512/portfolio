import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaBrain, FaCode, FaRobot, FaLightbulb } from 'react-icons/fa';
import profileImage from '../assets/profile.png';

const AboutSection = styled.section`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  margin-bottom: 60px;
  max-width: 800px;
`;

const SectionTag = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  display: inline-block;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.03em;

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 64px;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutImageWrapper = styled(motion.div)`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutImage = styled.div`
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.colors.border};
    filter: grayscale(100%) contrast(105%);
  }
`;

const AboutContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AboutText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 24px;
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  min-width: 44px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const CardContent = styled.div`
  h4 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  margin-top: 40px;
`;

const StatItem = styled(motion.div)`
  padding: 24px;
  text-align: center;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: none;
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 2.2rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
  }

  p {
    font-family: ${({ theme }) => theme.fonts.code};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const highlights = [
  {
    icon: <FaBrain />,
    title: 'AI & CV Systems',
    description: 'Bespoke image segmentation and OCR local architectures.',
  },
  {
    icon: <FaRobot />,
    title: 'Agentic Ecosystems',
    description: 'Dynamic web and vector search automation loops.',
  },
  {
    icon: <FaCode />,
    title: 'Full Stack Tech',
    description: 'SEO-tuned Next.js pages and secure REST frameworks.',
  },
  {
    icon: <FaLightbulb />,
    title: 'Bespoke Architectures',
    description: 'Performant local solutions avoiding generic templates.',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            [01 / BRIEF_BIO]
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Engineering <span>Custom Intelligence</span> & Web Systems
          </SectionTitle>
        </SectionHeader>

        <AboutGrid>
          <AboutImageWrapper
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <AboutImage>
              <img src={profileImage} alt="Abdullah Ejaz Profile" />
            </AboutImage>
          </AboutImageWrapper>

          <AboutContent
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <AboutText>
                I am a systems-focused software engineer specializing in deep learning, custom computer vision 
                pipelines, and high-performance full-stack web platforms. My goal is to build robust, scalable 
                systems that avoid template clichés in favor of architectural rigor and custom optimization.
              </AboutText>
              <AboutText>
                From deploying 3D U-Net medical segmentation frameworks to engineering autonomous job agents powered by local 
                LLMs (Ollama) and building responsive, secure enterprise backends, I write performant code designed for real production environments.
              </AboutText>
            </div>

            <HighlightGrid>
              {highlights.map((item, index) => (
                <HighlightCard
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                >
                  <CardIcon>{item.icon}</CardIcon>
                  <CardContent>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </CardContent>
                </HighlightCard>
              ))}
            </HighlightGrid>

            <StatsGrid>
              <StatItem
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <h3>3+</h3>
                <p>Years Practice</p>
              </StatItem>
              <StatItem
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h3>20+</h3>
                <p>Systems Deployed</p>
              </StatItem>
              <StatItem
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <h3>15+</h3>
                <p>Private Clients</p>
              </StatItem>
            </StatsGrid>
          </AboutContent>
        </AboutGrid>
      </Container>
    </AboutSection>
  );
};

export default About;

