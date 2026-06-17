import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled(motion.div)``;

const InfoTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 32px;
`;

const ContactCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const ContactCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
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
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialLink = styled(motion.a)`
  width: 42px;
  height: 42px;
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

const ContactForm = styled(motion.form)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  padding: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.card};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  font-family: inherit;
  resize: vertical;
  min-height: 140px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.card};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 28px;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 0px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef();
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with public key
    emailjs.init('TMkHpiNkuP0GscX0t');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // EmailJS configuration
    emailjs.sendForm(
      'service_hewemte',
      'template_og33xbe',
      formRef.current
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        alert('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSending(false);
      }, (error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send message. Please try again or email me directly at abdullahejaz512@gmail.com');
        setIsSending(false);
      });
  };

  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            [05 / CONTACT_PORT]
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Initiate <span>Collaboration</span>
          </SectionTitle>
        </SectionHeader>

        <ContactGrid>
          <ContactInfo
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <InfoTitle>Establish Communications</InfoTitle>
            <InfoText>
              Seeking opportunities to deploy medical computer vision networks, custom retrieval-augmented generation agents, 
              or performant, SEO-tuned React web platforms. Contact me via the secure pipeline or directly via standard channels.
            </InfoText>

            <ContactCards>
              <ContactCard>
                <CardIcon><FaEnvelope /></CardIcon>
                <CardContent>
                  <h4>Direct Mail</h4>
                  <p>abdullahejaz512@gmail.com</p>
                </CardContent>
              </ContactCard>

              <ContactCard>
                <CardIcon><HiPhone /></CardIcon>
                <CardContent>
                  <h4>Telephone Interface</h4>
                  <p>+92 336 5140129</p>
                </CardContent>
              </ContactCard>

              <ContactCard>
                <CardIcon><FaMapMarkerAlt /></CardIcon>
                <CardContent>
                  <h4>Operations Base</h4>
                  <p>Available for Global Remote Operations</p>
                </CardContent>
              </ContactCard>
            </ContactCards>

            <SocialLinks>
              <SocialLink href="https://github.com/AbdullahEjaz512" target="_blank">
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/abdullah-ejaz-7b4791311" target="_blank">
                <FaLinkedin />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>

          <ContactForm
            ref={formRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
          >
            <FormRow>
              <FormGroup>
                <Label>User Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>User Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Subject Line</Label>
              <Input
                type="text"
                name="subject"
                placeholder="e.g. Project Integration"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Detailed Message</Label>
              <TextArea
                name="message"
                placeholder="Describe your technical specifications..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSending}
            >
              <FaPaperPlane /> {isSending ? 'Sending Transmission...' : 'Submit Transmission'}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;

