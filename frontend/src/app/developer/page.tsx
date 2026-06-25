'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, BookOpen, Code, Server, Layout, Star, Briefcase, Award, Zap, Database, Smartphone, Globe, Shield } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function DeveloperProfile() {
  const coreSkills = [
    { 
      name: 'Frontend Engineering', 
      desc: 'Crafting pixel-perfect, accessible, and highly interactive UI/UX using React, Next.js, and modern CSS frameworks like Tailwind.', 
      icon: <Layout className="w-6 h-6 text-pink-500" />,
      colorClass: 'bg-pink-50 border-pink-200 group-hover:border-pink-400 group-hover:shadow-[0_8px_30px_rgba(236,72,153,0.2)]'
    },
    { 
      name: 'Backend Architecture', 
      desc: 'Building robust, scalable, and secure API microservices using Node.js, Express, PHP, and modern server-side architectures.', 
      icon: <Server className="w-6 h-6 text-emerald-500" />,
      colorClass: 'bg-emerald-50 border-emerald-200 group-hover:border-emerald-400 group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.2)]'
    },
    { 
      name: 'Database & Cloud', 
      desc: 'Architecting scalable data models with MongoDB, MySQL, and PostgreSQL, and managing secure cloud deployments on AWS/Linux.', 
      icon: <Database className="w-6 h-6 text-blue-500" />,
      colorClass: 'bg-blue-50 border-blue-200 group-hover:border-blue-400 group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)]'
    },
    { 
      name: 'Performance Optimization', 
      desc: 'Tuning applications for sub-second load times, optimizing render cycles, and ensuring flawless core web vitals.', 
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      colorClass: 'bg-amber-50 border-amber-200 group-hover:border-amber-400 group-hover:shadow-[0_8px_30px_rgba(245,158,11,0.2)]'
    }
  ];

  const experience = [
    {
      role: 'Lead Full-Stack Developer',
      company: 'Freelance & Agency Collaborations',
      period: '2022 - Present',
      desc: 'Architecting and delivering complete end-to-end digital solutions for diverse clientele, ranging from high-conversion e-commerce storefronts to comprehensive enterprise management systems.',
      color: 'from-fuchsia-500 to-pink-500'
    },
    {
      role: 'System Architect & Creator',
      company: 'Jamia Sher-e-Rabbani',
      period: '2023 - 2024',
      desc: 'Designed and deployed the entire digital infrastructure including a bespoke Learning Management System, dynamic admission portals, and an administrative dashboard handling thousands of requests.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      role: 'Web Applications Developer',
      company: 'Tech Startups',
      period: '2021 - 2022',
      desc: 'Built intuitive user interfaces and REST APIs. Collaborated with design teams to translate Figma prototypes into functional, animated React applications.',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const technologies = [
    { name: 'React.js', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    { name: 'Next.js', color: 'bg-slate-200 text-slate-800 border-slate-300' },
    { name: 'TypeScript', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Node.js', color: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'Tailwind CSS', color: 'bg-sky-100 text-sky-700 border-sky-200' },
    { name: 'PHP & Laravel', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    { name: 'MongoDB', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { name: 'MySQL', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { name: 'AWS & Cloud', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { name: 'Framer Motion', color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200' },
  ];

  const projects = [
    { 
      title: 'Jamia Sher-e-Rabbani Platform', 
      category: 'EdTech / LMS',
      desc: 'A massively scalable educational platform with real-time portals, dynamic admissions, and admin dashboards.',
      gradient: 'from-emerald-500 to-teal-400'
    },
    { 
      title: 'Next-Gen E-Commerce', 
      category: 'Retail & Storefronts',
      desc: 'High-performance bespoke shopping experiences with secure payment gateways and inventory management.',
      gradient: 'from-pink-500 to-rose-400'
    },
    { 
      title: 'Corporate Identity Sites', 
      category: 'Business & Portfolios',
      desc: 'SEO-optimized, ultra-fast static and dynamic generation sites for modern corporate branding.',
      gradient: 'from-violet-500 to-purple-400'
    },
    { 
      title: 'Admin Analytics Dashboards', 
      category: 'Enterprise SaaS',
      desc: 'Data-heavy analytical tools featuring complex charting, role-based access, and real-time socket connections.',
      gradient: 'from-amber-500 to-orange-400'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-fuchsia-200">
      <Header />
      
      <main className="flex-1 font-sans relative overflow-hidden">
        
        {/* MASSIVE VIBRANT BACKGROUND BLOBS */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/30 to-fuchsia-500/30 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/30 to-cyan-500/30 rounded-full blur-[120px] translate-x-1/4 pointer-events-none" />
        <div className="absolute top-[800px] left-1/2 w-[800px] h-[400px] bg-gradient-to-t from-amber-300/20 to-orange-500/20 rounded-full blur-[150px] -translate-x-1/2 pointer-events-none" />

        {/* SIMPLE HERO SECTION */}
        <section className="pt-24 pb-16 md:pt-28 md:pb-20 px-6 lg:px-12 max-w-6xl mx-auto relative z-10">
           <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                 <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-semibold rounded-full text-sm mb-6 border border-blue-100">
                    Available for Work
                 </div>
                 
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                    Hi, I'm Abu Bakar
                 </h1>
                 
                 <h2 className="text-xl md:text-2xl font-medium text-slate-500 mb-6">
                    Professional Full-Stack Developer
                 </h2>
                 
                 <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
                    I build high-quality web applications with modern technologies like React, Next.js, and Node.js. My focus is on writing clean code and creating intuitive user experiences.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                    <Link href="https://iamabubakar.site/contact" target="_blank" className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold shadow-sm">
                       Contact Me <ArrowRight size={18} />
                    </Link>
                    <Link href="https://iamabubakar.site/" target="_blank" className="flex items-center gap-2 px-8 py-3.5 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-semibold shadow-sm">
                       Visit Portfolio <ExternalLink size={18} />
                    </Link>
                 </div>
              </div>

              {/* Simple Avatar */}
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-white shadow-xl flex items-center justify-center shrink-0">
                 <span className="text-5xl md:text-7xl font-bold text-slate-400">AB</span>
              </div>
              
           </div>
        </section>

        {/* TECHNOLOGIES MARQUEE / BADGES */}
        <section className="py-12 border-y border-slate-200 bg-white/50 backdrop-blur-sm relative z-10 overflow-hidden">
           <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <p className="text-center text-sm font-bold tracking-widest uppercase text-slate-400 mb-8">Technologies & Frameworks I command</p>
              <div className="flex flex-wrap justify-center gap-4">
                 {technologies.map((tech, idx) => (
                    <span key={idx} className={`px-5 py-2.5 rounded-2xl border shadow-sm text-sm font-bold tracking-wide transition-transform hover:-translate-y-1 ${tech.color}`}>
                       {tech.name}
                    </span>
                 ))}
              </div>
           </div>
        </section>

        {/* CORE COMPETENCIES */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
           <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-fuchsia-600 font-bold tracking-widest uppercase text-sm mb-4 block">What I Do</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Expertise & Specialized Domains</h2>
              <p className="text-lg text-slate-600">Delivering premium code architectures and pixel-perfect interfaces that scale effortlessly.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreSkills.map((skill, idx) => (
                 <div key={idx} className={`flex gap-6 group p-8 rounded-[2rem] border-2 transition-all duration-300 bg-white ${skill.colorClass}`}>
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                       {skill.icon}
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold text-slate-900 mb-3">{skill.name}</h3>
                       <p className="text-slate-600 leading-relaxed text-base font-medium">
                          {skill.desc}
                       </p>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section className="py-24 bg-white relative z-10 border-y border-slate-100">
           <div className="max-w-4xl mx-auto px-6 lg:px-12">
              <div className="mb-16 flex items-center gap-4">
                 <Briefcase className="w-10 h-10 text-violet-500" />
                 <h2 className="text-4xl font-black text-slate-900 tracking-tight">Professional Journey</h2>
              </div>

              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-violet-200 before:via-fuchsia-200 before:to-transparent">
                 {experience.map((exp, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       {/* Timeline Dot */}
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-violet-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300"></div>
                       
                       {/* Content Card */}
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                          <div className={`text-xs font-black uppercase tracking-widest mb-3 bg-gradient-to-r ${exp.color} text-transparent bg-clip-text`}>
                             {exp.period}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-1">{exp.role}</h3>
                          <h4 className="text-base font-bold text-slate-500 mb-4">{exp.company}</h4>
                          <p className="text-slate-600 font-medium leading-relaxed">
                             {exp.desc}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* SELECTED WORKS */}
        <section className="py-24 px-6 lg:px-12 relative z-10 bg-slate-50">
           <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                 <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Portfolio</span>
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Featured Projects</h2>
                 <p className="text-lg text-slate-600">A showcase of scalable architectures and beautiful digital products.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {projects.map((proj, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-[2rem] bg-white border border-slate-200 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-2xl">
                       {/* Background Gradient Hover */}
                       <div className={`absolute inset-0 bg-gradient-to-br ${proj.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}></div>
                       
                       <div className="relative z-10 p-8 h-full flex flex-col group-hover:text-white transition-colors duration-300">
                          <div className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white/70">
                             {proj.category}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white">{proj.title}</h3>
                          <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-1 group-hover:text-white/90">
                             {proj.desc}
                          </p>
                          <div className="mt-auto flex justify-end">
                             <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                                <ArrowRight size={20} />
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="mt-16 text-center">
                 <Link href="https://iamabubakar.site/projects" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors font-bold text-base shadow-xl">
                    Explore Full Portfolio <ExternalLink size={20} />
                 </Link>
              </div>
           </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
