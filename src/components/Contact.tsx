
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formState);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-nexora-dark to-black relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nexora-primary rounded-full filter blur-[120px] opacity-10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-nexora-secondary rounded-full filter blur-[120px] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a question or want to collaborate? Reach out to us!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <Card className="bg-nexora-dark bg-opacity-50 backdrop-blur-sm border-nexora-primary border-opacity-20 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-nexora-dark bg-opacity-50 border-nexora-primary border-opacity-30 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="bg-nexora-dark bg-opacity-50 border-nexora-primary border-opacity-30 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={5}
                    className="bg-nexora-dark bg-opacity-50 border-nexora-primary border-opacity-30 text-white resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-nexora-primary to-nexora-secondary hover:opacity-90 transition-opacity"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <Card className="bg-nexora-dark bg-opacity-50 backdrop-blur-sm border-nexora-primary border-opacity-20 p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-nexora-secondary font-medium mb-2">Email</h4>
                  <a href="mailto:punitgavali29@gmail.com" className="text-white hover:text-nexora-secondary transition-colors flex items-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mr-2">
                      <path d="M2 7L10.1649 12.7154C10.6900 13.0944 11.3401 13.2999 12.0004 13.2999C12.6607 13.2999 13.3109 13.0944 13.836 12.7154L22 7M5 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    punitgavali29@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-nexora-secondary font-medium mb-2">Phone</h4>
                  <a href="tel:+919096950392" className="text-white hover:text-nexora-secondary transition-colors flex items-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mr-2">
                      <path d="M22 16.92v3a1.998 1.998 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    +91 9096950392
                  </a>
                </div>

                <div>
                  <h4 className="text-nexora-secondary font-medium mb-2">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/punit-gavali-4066b41ba/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-nexora-secondary transition-colors flex items-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mr-2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Punit Gavali
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 bg-gradient-to-r from-nexora-primary to-nexora-secondary p-[1px] rounded-lg"
              >
                <div className="bg-nexora-dark p-4 rounded-lg">
                  <p className="text-gray-300 italic">
                    "We merge cinematic 3D environments with buttery-smooth interactions to create browsing experiences that feel alive."
                  </p>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
