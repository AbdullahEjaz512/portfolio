import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { 
  SiPython, SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn,
  SiKeras, SiNumpy, SiPandas, SiJupyter, SiDocker,
  SiReact, SiJavascript, SiHtml5, SiNodedotjs,
  SiGit, SiMongodb, SiPostgresql, SiAmazon, SiGooglecloud
} from 'react-icons/si';
import { FaBrain } from 'react-icons/fa';

const SkillsSection = styled.section`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CategoryIcon = styled.div`
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const CategoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.card};

    .skill-icon {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.transitions.fast};
`;

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: <FaBrain />,
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'PyTorch', icon: <SiPytorch /> },
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'Scikit-Learn', icon: <SiScikitlearn /> },
      { name: 'Keras', icon: <SiKeras /> },
      { name: 'OpenCV', icon: <SiOpencv /> },
    ],
  },
  {
    title: 'Data Science & Analysis',
    icon: <SiJupyter />,
    skills: [
      { name: 'NumPy', icon: <SiNumpy /> },
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'Jupyter Notebooks', icon: <SiJupyter /> },
      { name: 'Statistical Modeling', icon: <SiPython /> },
      { name: 'Data Visualization', icon: <SiPython /> },
      { name: 'Feature Engineering', icon: <SiPython /> },
    ],
  },
  {
    title: 'Web Engineering',
    icon: <SiReact />,
    skills: [
      { name: 'React.js', icon: <SiReact /> },
      { name: 'JavaScript (ES6+)', icon: <SiJavascript /> },
      { name: 'HTML5 / CSS3', icon: <SiHtml5 /> },
      { name: 'Node.js & Express', icon: <SiNodedotjs /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
  },
  {
    title: 'Infrastructure & Tools',
    icon: <SiDocker />,
    skills: [
      { name: 'Git & GitHub', icon: <SiGit /> },
      { name: 'Docker Containers', icon: <SiDocker /> },
      { name: 'AWS Cloud', icon: <SiAmazon /> },
      { name: 'Google Cloud Platform', icon: <SiGooglecloud /> },
      { name: 'PostgreSQL Databases', icon: <SiPostgresql /> },
      { name: 'MLOps Architectures', icon: <SiDocker /> },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            [02 / TECHNICAL_STACK]
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Core Technology <span>Matrix</span>
          </SectionTitle>
        </SectionHeader>

        <SkillsGrid>
          {skillCategories.map((category, catIndex) => (
            <SkillCategory
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * catIndex }}
            >
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>

              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * catIndex + 0.03 * skillIndex }}
                    whileHover={{ y: -2 }}
                  >
                    <SkillIcon className="skill-icon">{skill.icon}</SkillIcon>
                    <span>{skill.name}</span>
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;

