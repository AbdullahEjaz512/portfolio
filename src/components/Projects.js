import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaCodeBranch } from 'react-icons/fa';
import { HiArrowSmRight } from 'react-icons/hi';

const ProjectsSection = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  margin-bottom: 48px;
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

const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 48px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    border-bottom: none;
    gap: 4px;
  }
`;

const FilterTab = styled.button`
  background: transparent;
  padding: 14px 24px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ active, theme }) => active ? theme.colors.text : theme.colors.textMuted};
  border: none;
  border-bottom: 2px solid ${({ active, theme }) => active ? theme.colors.secondary : 'transparent'};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-align: left;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-bottom-color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border-bottom: none;
    border-left: 2px solid ${({ active, theme }) => active ? theme.colors.secondary : 'transparent'};
    padding: 10px 16px;

    &:hover {
      border-left-color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.border};
    }
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: border-color ${({ theme }) => theme.transitions.fast}, background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const RepoLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectTagline = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  margin-bottom: 16px;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding-left: 12px;
`;

const ProjectDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
  margin-bottom: 24px;
`;

const TechStackWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
  margin-top: auto;
`;

const TechChip = styled.span`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  padding: 4px 10px;
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 20px;
  margin-top: auto;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color ${({ theme }) => theme.transitions.fast};

  svg {
    font-size: 0.9rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const categories = [
  { id: 'all', name: '[00] ALL REPOSITORIES' },
  { id: 'cv-medical', name: '[01] COMPUTER VISION & MEDICAL AI' },
  { id: 'genai-agentic', name: '[02] GENERATIVE AI & AGENTIC ECOSYSTEMS' },
  { id: 'web-platforms', name: '[03] FULL-STACK WEB DEVELOPMENT & PLATFORMS' },
];

const projectsData = [
  {
    id: 'seg-mind',
    name: 'Seg-Mind',
    repo: 'fyp-1',
    tagline: 'Full-Stack 3D Medical Imaging & Automated Tumor Segmentation Platform',
    category: 'cv-medical',
    tech: ['PyTorch', '3D U-Net', 'FastAPI', 'PostgreSQL', 'React.js', 'Three.js', 'vtk.js'],
    description: 'Developed an end-to-end medical AI dashboard to securely upload and process high-dimensional MRI scans. Implemented a custom 3D U-Net architecture for precise volumetric segmentation alongside Grad-CAM for explainable visual diagnostics. Built an asynchronous backend to handle heavy inference loads without blocking, paired with browser-based Three.js/vtk.js rendering engines for real-time 3D reconstruction manipulation.',
    codeUrl: 'https://github.com/AbdullahEjaz512/fyp-1',
    breakdownUrl: '#about'
  },
  {
    id: 'pashto-ocr',
    name: 'Pashto Handwriting Detection System',
    repo: 'Offline_pashto_handwriting-detection',
    tagline: 'Two-Stage Spatial Text Localization & Sequential Script OCR Pipeline',
    category: 'cv-medical',
    tech: ['Python', 'PyTorch', 'YOLOv8', 'CRNN', 'Deep Learning', 'Image Processing'],
    description: 'Engineered an advanced offline computer vision pipeline optimizing handwriting recognition for the complex, unconstrained PHTI dataset. Deployed YOLOv8 to handle high-precision spatial text localization and bounding-box generation across noisy backgrounds. Integrated a Convolutional Recurrent Neural Network (CRNN) to extract long-range character dependencies from localized image slices.',
    codeUrl: 'https://github.com/AbdullahEjaz512/Offline_pashto_handwriting-detection',
    breakdownUrl: '#about'
  },
  {
    id: 'neuro-stream',
    name: 'Neuro-Stream Multimodal Video RAG',
    repo: 'Neuro-Stream-Multimodal-Video-RAG-Pipeline',
    tagline: 'Real-Time Multimodal Voice & Video Knowledge Retrieval System',
    category: 'genai-agentic',
    tech: ['Python', 'OpenAI Whisper', 'Qdrant', 'ChromaDB', 'LangChain', 'Local LLMs'],
    description: 'Built a cutting-edge conversational AI system that transcends text inputs, allowing users to query dense media repositories via live audio. Utilized OpenAI\'s Whisper for local audio transcription, syncing data streams with multi-tier semantic embeddings housed inside specialized vector stores. Orchestrated the agentic execution using LangChain for real-time contextual answer synthesis.',
    codeUrl: 'https://github.com/AbdullahEjaz512/Neuro-Stream-Multimodal-Video-RAG-Pipeline',
    breakdownUrl: '#about'
  },
  {
    id: 'job-agent',
    name: 'Autonomous Job Agent',
    repo: 'resume-builder-job-agent-extension',
    tagline: 'Browser-Based Automation Agent Powered by Local LLM Core',
    category: 'genai-agentic',
    tech: ['TypeScript', 'Chrome Extension API', 'DOM Parsing', 'Ollama', 'Agentic AI'],
    description: 'Designed an autonomous web-automation application capable of traversing dynamic external web forms without relying on brittle, hardcoded coordinates. Engineered a custom DOM parsing engine that reads website structures dynamically, passing contextual nodes to local LLMs via Ollama to fill inputs, validate steps, and automate complex workflows privately.',
    codeUrl: 'https://github.com/AbdullahEjaz512/resume-builder-job-agent-extension',
    breakdownUrl: '#about'
  },
  {
    id: 'aztrosys',
    name: 'Aztrosys Corporate Architecture',
    repo: 'Aztrosys-Full-Stack',
    tagline: 'Enterprise Web Platform with Integrated LLM Customer Support',
    category: 'web-platforms',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'AWS EC2'],
    description: 'Handled end-to-end frontend and backend ownership of a live corporate web platform. Developed responsive, SEO-optimized user interfaces in Next.js/TypeScript and integrated custom LLM-powered chat interfaces natively into a scalable Node.js backend. Managed database relational schemas in PostgreSQL and provisioned secure infrastructure deployment workflows on AWS cloud instances.',
    codeUrl: 'https://github.com/AbdullahEjaz512/Aztrosys-Full-Stack',
    breakdownUrl: '#about'
  },
  {
    id: 'wb-associates',
    name: 'WB-Associates',
    repo: 'WB-Associates',
    tagline: 'Performance-Optimized Corporate Web Platform for WB Private Limited',
    category: 'web-platforms',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Modern UI Layouts', 'Performance Profiling'],
    description: 'Architected the official user-facing digital presence for a private limited firm, emphasizing strict asset optimization, pristine layout responsiveness, and clean interactive branding component blocks.',
    codeUrl: 'https://github.com/AbdullahEjaz512/WB-Associates',
    breakdownUrl: '#about'
  },
  {
    id: 'xtremedrive',
    name: 'XtremeDrive & Multi-Tier Systems',
    repo: 'XtremeDrive / queen-s-marry',
    tagline: 'High-Throughput Web Applications and Clean 3-Tier Multi-Platform Architecture',
    category: 'web-platforms',
    tech: ['Dart', 'Flutter', 'Node.js', 'Express', 'Next.js Admin Dashboard', 'State Management'],
    description: 'Contributed to and built robust, multi-tier full-stack storage and orchestration tools. Showcased seamless API state management between unified mobile architectures (Flutter), decoupled server REST endpoints, and complex administrative control dashboards.',
    codeUrl: 'https://github.com/AbdullahEjaz512/XtremeDrive',
    breakdownUrl: '#about'
  }
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = activeTab === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeTab);

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            [04 / WORK_PORTFOLIO]
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Selected <span>Engineering Work</span>
          </SectionTitle>
        </SectionHeader>

        <FilterTabs>
          {categories.map((cat) => (
            <FilterTab
              key={cat.id}
              active={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.name}
            </FilterTab>
          ))}
        </FilterTabs>

        <ProjectsGrid layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <ProjectCard>
                  <div>
                    <RepoLabel>
                      <FaCodeBranch /> repo: {project.repo}
                    </RepoLabel>
                    <ProjectTitle>{project.name}</ProjectTitle>
                    <ProjectTagline>{project.tagline}</ProjectTagline>
                    <ProjectDescription>{project.description}</ProjectDescription>
                  </div>

                  <TechStackWrapper>
                    {project.tech.map((techItem) => (
                      <TechChip key={techItem}>{techItem}</TechChip>
                    ))}
                  </TechStackWrapper>

                  <CardActions>
                    <ActionLink href={project.codeUrl} target="_blank">
                      View Codebase <HiArrowSmRight />
                    </ActionLink>
                    <ActionLink href={project.breakdownUrl}>
                      Architecture Breakdown <HiArrowSmRight />
                    </ActionLink>
                  </CardActions>
                </ProjectCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;

