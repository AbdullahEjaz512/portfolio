import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaBrain, FaCode, FaRobot, FaChartLine, FaDatabase, FaCloud } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const ServicesSection = styled.section`
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const ServiceIcon = styled.div`
  width: 52px;
  height: 52px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
`;

const ServiceTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

const ServiceDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ServiceFeatures = styled.ul`
  margin-bottom: auto;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ServiceFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;

  &::before {
    content: '//';
    font-family: ${({ theme }) => theme.fonts.code};
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const ServiceLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  margin-top: 24px;
  transition: gap ${({ theme }) => theme.transitions.fast};

  svg {
    font-size: 0.95rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const services = [
  {
    icon: <FaBrain />,
    title: 'Machine Learning Solutions',
    description: 'Custom ML models tailored to your business needs, from data preprocessing to deployment.',
    features: [
      'Custom model development',
      'Model optimization',
      'A/B testing & validation',
      'Production deployment',
    ],
  },
  {
    icon: <FaRobot />,
    title: 'Computer Vision Systems',
    description: 'Advanced image and video analysis systems for object detection, segmentation, and recognition.',
    features: [
      'Object detection & tracking',
      'Image segmentation',
      'Facial recognition',
      'Medical image analysis',
    ],
  },
  {
    icon: <FaChartLine />,
    title: 'Predictive Analytics',
    description: 'Data-driven insights and forecasting to help you make informed business decisions.',
    features: [
      'Time series forecasting',
      'Risk assessment',
      'Customer analytics',
      'Demand prediction',
    ],
  },
  {
    icon: <FaCode />,
    title: 'Full Stack Development',
    description: 'Modern, responsive web applications with seamless user experiences.',
    features: [
      'React.js applications',
      'RESTful APIs',
      'Database design',
      'Cloud deployment',
    ],
  },
  {
    icon: <FaDatabase />,
    title: 'Data Engineering',
    description: 'Robust data pipelines and infrastructure for processing large-scale datasets.',
    features: [
      'ETL pipelines',
      'Data warehousing',
      'Real-time processing',
      'Data quality assurance',
    ],
  },
  {
    icon: <FaCloud />,
    title: 'MLOps & Deployment',
    description: 'End-to-end ML lifecycle management from development to production.',
    features: [
      'CI/CD for ML',
      'Model monitoring',
      'Auto-scaling solutions',
      'Cloud integration',
    ],
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <ServicesSection id="services" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            [03 / CAPABILITIES]
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Services & <span>Expertise</span>
          </SectionTitle>
        </SectionHeader>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * index }}
              whileHover={{ y: -4 }}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature) => (
                  <ServiceFeature key={feature}>{feature}</ServiceFeature>
                ))}
              </ServiceFeatures>
              <ServiceLink href="#contact">
                Get Started <HiArrowRight />
              </ServiceLink>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;

