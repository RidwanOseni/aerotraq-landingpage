"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Shield,
  Coins,
  TrendingUp,
  Database,
  Play,
  BarChart3,
  Users,
  Mail,
  Twitter,
  Github,
  Linkedin,
  ArrowRight,
  Cpu,
  Globe,
  Lock,
  Trophy,
} from "lucide-react"
import React, { useState } from "react"

export default function AerotraqLanding() {
  // Modal state
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showEarlyAccessModal, setShowEarlyAccessModal] = useState(false)

  // Modal component
  function DemoModal() {
    if (!showDemoModal) return null
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="relative w-full max-w-3xl mx-auto p-4">
          <button
            onClick={() => setShowDemoModal(false)}
            className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition"
            aria-label="Close"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/DMPzaOkoyi0"
              title="Aerotraq Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    )
  }

  // Early Access Modal component
  function EarlyAccessModal() {
    const modalRef = React.useRef<HTMLDivElement>(null);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [droneUseCase, setDroneUseCase] = useState('');
    const [otherDroneUseCase, setOtherDroneUseCase] = useState('');
    const [interest, setInterest] = useState<string[]>([]);
    const [challenge, setChallenge] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Focus trap and Escape key close
    React.useEffect(() => {
      if (!showEarlyAccessModal) return;

      // Focus the first input
      const firstInput = modalRef.current?.querySelector('input, select, textarea, button') as HTMLElement;
      firstInput?.focus();

      // Trap focus
      const handleTab = (e: KeyboardEvent) => {
        const focusableEls = modalRef.current?.querySelectorAll<HTMLElement>(
          'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableEls || focusableEls.length === 0) return;
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      // Close on Escape
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowEarlyAccessModal(false);
      };

      document.addEventListener('keydown', handleTab);
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleTab);
        document.removeEventListener('keydown', handleEsc);
      };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsSubmitting(true);

      try {
        const formData = {
          name,
          email,
          phone,
          company,
          role,
          droneUseCase,
          otherDroneUseCase,
          interest: interest && Array.isArray(interest) ? interest : [],
          challenge,
          agreedToTerms,
        };

        const response = await fetch('/api/submit-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit application');
        }

        // Success - show thank you message
        setSubmitted(true);
        
        // Reset form after delay
        setTimeout(() => {
          setShowEarlyAccessModal(false);
          setSubmitted(false);
          setIsSubmitting(false);
          // Reset form fields
          setName('');
          setEmail('');
          setPhone('');
          setCompany('');
          setRole('');
          setDroneUseCase('');
          setOtherDroneUseCase('');
          setInterest([]);
          setChallenge('');
          setAgreedToTerms(false);
        }, 8000);

      } catch (error) {
        console.error('Submission error:', error);
        setError(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
        setIsSubmitting(false);
      }
    };

    if (!showEarlyAccessModal) return null;

    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        onClick={() => setShowEarlyAccessModal(false)}
      >
        <Card
          ref={modalRef}
          className="w-full max-w-lg mx-auto bg-gradient-to-br from-gray-800 to-black text-white border border-gray-700 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <Button
            onClick={() => setShowEarlyAccessModal(false)}
            className="absolute top-4 right-4 text-gray-400 bg-transparent rounded-full p-2 hover:bg-gray-700/50 transition"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </Button>
          {!submitted ? (
            <>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                  Request Early Access
                </CardTitle>
                <CardDescription className="text-gray-300 max-w-md mx-auto">
                  We&apos;re inviting a select group of early users to help define the future of drone IP and data monetization. If that&apos;s you — apply below.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Basic Info */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name <span className="text-red-500">*</span></label>
                    <Input id="name" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email <span className="text-red-500">*</span></label>
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone (Optional)</label>
                    <Input id="phone" type="tel" placeholder="Your Phone Number" value={phone} onChange={e => setPhone(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {/* About You */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Company/Organization (Optional)</label>
                    <Input id="company" type="text" placeholder="Your Company" value={company} onChange={e => setCompany(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">Your Role</label>
                    <Input id="role" type="text" placeholder="e.g., Drone Operator, GIS Analyst" value={role} onChange={e => setRole(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="drone-use-case" className="block text-sm font-medium text-gray-300 mb-1">Primary Drone Use Case</label>
                    <select
                      id="drone-use-case"
                      value={droneUseCase}
                      onChange={e => setDroneUseCase(e.target.value)}
                      required
                      className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select an option</option>
                      <option value="commercial-mapping">Commercial Mapping/Surveying</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="inspection">Infrastructure Inspection</option>
                      <option value="security-surveillance">Security/Surveillance</option>
                      <option value="delivery">Drone Delivery</option>
                      <option value="recreational">Recreational</option>
                      <option value="other">Other</option>
                    </select>
                    {droneUseCase === "other" && (
                      <div className="mt-3">
                        <label htmlFor="other-drone-use-case" className="block text-sm font-medium text-gray-300 mb-1">
                          Please specify your use case <span className="text-gray-400">(optional)</span>
                        </label>
                        <Input
                          id="other-drone-use-case"
                          type="text"
                          placeholder="Describe your use case"
                          value={otherDroneUseCase}
                          onChange={e => setOtherDroneUseCase(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>
                  {/* Your Interest */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">What excites you most about Aerotraq? (Select all that apply)</label>
                    <div className="space-y-2">
                      <label className="flex items-center text-gray-300">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                          checked={interest.includes('compliance')} onChange={e => setInterest(prev => e.target.checked ? [...prev, 'compliance'] : prev.filter(i => i !== 'compliance'))} />
                        <span className="ml-2">AI-Powered Compliance</span>
                      </label>
                      <label className="flex items-center text-gray-300">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                          checked={interest.includes('ip-tokenization')} onChange={e => setInterest(prev => e.target.checked ? [...prev, 'ip-tokenization'] : prev.filter(i => i !== 'ip-tokenization'))} />
                        <span className="ml-2">IP Tokenization (DGIP Generation)</span>
                      </label>
                      <label className="flex items-center text-gray-300">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                          checked={interest.includes('data-monetization')} onChange={e => setInterest(prev => e.target.checked ? [...prev, 'data-monetization'] : prev.filter(i => i !== 'data-monetization'))} />
                        <span className="ml-2">Data Monetization & Royalties</span>
                      </label>
                    </div>
                  </div>
                  {/* Pain Point */}
                  <div>
                    <label htmlFor="challenge" className="block text-sm font-medium text-gray-300 mb-1">What&apos;s your biggest challenge with drone data or compliance today? (Optional)</label>
                    <textarea id="challenge" rows={3} placeholder="Describe your challenges..." value={challenge} onChange={e => setChallenge(e.target.value)}
                      className="flex w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    ></textarea>
                  </div>
                  {/* Terms Agreement */}
                  <div className="flex items-start">
                    <input type="checkbox" id="terms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} required
                      className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                      I agree to the <a href="#" className="underline hover:text-blue-400 transition-colors">early access terms</a> &amp; may be contacted for feedback. <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white px-10 py-5 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!agreedToTerms || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                  <p className="text-center text-gray-400 text-sm mt-3">
                    Only a few will be selected for this first wave. We&apos;re looking for innovators.
                  </p>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
              <Trophy className="w-16 h-16 text-primary mb-4 animate-bounce" />
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                Thanks, Commander! Your application has landed.
              </CardTitle>
              <CardDescription className="text-gray-300">
                We&apos;re reviewing your mission profile and will be in touch soon.
              </CardDescription>
              <p className="text-sm text-gray-400 mt-4">You&apos;ll be among the first to explore drone IP monetization.</p>
            </CardContent>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg" style={{ backgroundColor: '#2D4897' }}>
                <Image src="/aerotraq-logo.png" alt="Aerotraq Logo" width={48} height={48} className="object-contain" />
              </div>
              <span className="text-xl font-bold text-midnight">Aerotraq</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-text hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#demo" className="text-text hover:text-primary transition-colors">
                Demo
              </a>
              <a href="#team" className="text-text hover:text-primary transition-colors">
                Team
              </a>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => setShowEarlyAccessModal(true)}
              >
                Request Early Access
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-midnight via-blue-900 to-midnight text-white min-h-screen flex items-center">
        {/* Enhanced Animated SVG Background */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Enhanced Grid Pattern */}
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(34, 211, 238, 0.08)" strokeWidth="1" />
              </pattern>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34, 211, 238, 0.04)" strokeWidth="0.5" />
              </pattern>

              {/* Enhanced Gradient for flight paths */}
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                <stop offset="30%" stopColor="rgba(34, 211, 238, 0.4)" />
                <stop offset="70%" stopColor="rgba(34, 211, 238, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>

              <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0.2)" />
              </radialGradient>
            </defs>

            {/* Layered Background Grids */}
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Enhanced Blockchain Network */}
            <g className="animate-pulse" style={{ animationDuration: "6s" }}>
              <circle cx="100" cy="150" r="3" fill="url(#nodeGradient)" />
              <circle cx="250" cy="120" r="4" fill="url(#nodeGradient)" />
              <circle cx="400" cy="180" r="3" fill="url(#nodeGradient)" />
              <circle cx="550" cy="140" r="5" fill="url(#nodeGradient)" />
              <circle cx="700" cy="160" r="3" fill="url(#nodeGradient)" />
              <circle cx="850" cy="130" r="4" fill="url(#nodeGradient)" />
              <circle cx="1000" cy="170" r="3" fill="url(#nodeGradient)" />
              <circle cx="1100" cy="145" r="4" fill="url(#nodeGradient)" />
            </g>

            {/* Enhanced Node Connections */}
            <g stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1" fill="none">
              <line x1="100" y1="150" x2="250" y2="120">
                <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
              </line>
              <line x1="250" y1="120" x2="400" y2="180">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.4;0.1"
                  dur="4s"
                  begin="0.5s"
                  repeatCount="indefinite"
                />
              </line>
              <line x1="400" y1="180" x2="550" y2="140">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.4;0.1"
                  dur="4s"
                  begin="1s"
                  repeatCount="indefinite"
                />
              </line>
              <line x1="550" y1="140" x2="700" y2="160">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.4;0.1"
                  dur="4s"
                  begin="1.5s"
                  repeatCount="indefinite"
                />
              </line>
              <line x1="700" y1="160" x2="850" y2="130">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.4;0.1"
                  dur="4s"
                  begin="2s"
                  repeatCount="indefinite"
                />
              </line>
              <line x1="850" y1="130" x2="1000" y2="170">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.4;0.1"
                  dur="4s"
                  begin="2.5s"
                  repeatCount="indefinite"
                />
              </line>
              <line x1="1000" y1="170" x2="1100" y2="145">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.4;0.1"
                  dur="4s"
                  begin="3s"
                  repeatCount="indefinite"
                />
              </line>
            </g>

            {/* Enhanced Drone Flight Paths */}
            <g fill="none" stroke="url(#pathGradient)" strokeWidth="2">
              <path d="M0,400 Q150,320 300,380 Q450,440 600,360 Q750,280 900,340 Q1050,400 1200,320">
                <animate attributeName="stroke-dasharray" values="0,2000;2000,0" dur="12s" repeatCount="indefinite" />
                <animate attributeName="stroke-dashoffset" values="0;-2000" dur="12s" repeatCount="indefinite" />
              </path>
              <path d="M0,500 Q200,420 400,480 Q600,540 800,460 Q1000,380 1200,440">
                <animate
                  attributeName="stroke-dasharray"
                  values="0,2000;2000,0"
                  dur="15s"
                  begin="3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-2000"
                  dur="15s"
                  begin="3s"
                  repeatCount="indefinite"
                />
              </path>
              <path d="M0,600 Q180,520 360,580 Q540,640 720,560 Q900,480 1200,540">
                <animate
                  attributeName="stroke-dasharray"
                  values="0,2000;2000,0"
                  dur="18s"
                  begin="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-2000"
                  dur="18s"
                  begin="6s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            {/* Enhanced Data Points */}
            <g>
              <circle cx="300" cy="380" r="2" fill="rgba(34, 211, 238, 0.9)">
                <animate attributeName="r" values="2;5;2" dur="3s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="600" cy="360" r="2" fill="rgba(34, 211, 238, 0.9)">
                <animate attributeName="r" values="2;5;2" dur="3s" begin="1s" repeatCount="indefinite" />
                <animate
                  attributeName="fill-opacity"
                  values="0.9;0.4;0.9"
                  dur="3s"
                  begin="1s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="900" cy="340" r="2" fill="rgba(34, 211, 238, 0.9)">
                <animate attributeName="r" values="2;5;2" dur="3s" begin="2s" repeatCount="indefinite" />
                <animate
                  attributeName="fill-opacity"
                  values="0.9;0.4;0.9"
                  dur="3s"
                  begin="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Enhanced Floating Elements */}
            <g fill="none" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1">
              <polygon points="80,80 100,70 120,80 120,100 100,110 80,100">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 100 90;360 100 90"
                  dur="25s"
                  repeatCount="indefinite"
                />
              </polygon>
              <polygon points="1000,100 1020,90 1040,100 1040,120 1020,130 1000,120">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 1020 110;-360 1020 110"
                  dur="30s"
                  repeatCount="indefinite"
                />
              </polygon>
            </g>
          </svg>
        </div>

        {/* Enhanced Drone Image Placeholders with Blended Light Background */}
        <div className="absolute top-16 left-8 lg:left-16 z-10 opacity-40 hover:opacity-60 transition-opacity duration-500">
          <div className="relative w-48 h-48 lg:w-64 lg:h-64">
            {/* Blended light background */}
            <div className="absolute inset-0 bg-gradient-radial from-white/20 via-white/10 to-transparent rounded-full blur-sm"></div>
            <div className="absolute inset-2 bg-gradient-radial from-white/15 via-white/8 to-transparent rounded-full blur-md"></div>
            {/* Main container */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-primary/20 flex items-center justify-center backdrop-blur-sm">
              <img
                src="/drone-fixed-wing.png"
                alt="Fixed-wing surveillance drone"
                className="w-36 h-36 lg:w-48 lg:h-48 object-contain filter brightness-110 drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-8 lg:right-16 z-10 opacity-40 hover:opacity-60 transition-opacity duration-500">
          <div className="relative w-40 h-40 lg:w-52 lg:h-52">
            {/* Blended light background */}
            <div className="absolute inset-0 bg-gradient-radial from-white/20 via-white/10 to-transparent rounded-full blur-sm"></div>
            <div className="absolute inset-2 bg-gradient-radial from-white/15 via-white/8 to-transparent rounded-full blur-md"></div>
            {/* Main container */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-primary/20 flex items-center justify-center backdrop-blur-sm">
              <img
                src="/drone-quadcopter.png"
                alt="Consumer quadcopter drone"
                className="w-28 h-28 lg:w-36 lg:h-36 object-contain filter brightness-110 drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-20">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent leading-tight">
              Tokenize the Sky. Monetize the Data.
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed font-medium">
              The decentralized infrastructure for the drone and aerospace economy.
            </p>
            <p className="text-lg lg:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Register flights, validate compliance with AI, and license your drone-generated data as on-chain IP with
              built-in royalties that pay you continuously, not just once.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-5 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowEarlyAccessModal(true)}
              >
                Request Early Access
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-10 py-5 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
                onClick={() => setShowDemoModal(true)}
              >
                View Demo
                <Play className="ml-3 w-5 h-5" />
              </Button>
            </div>

            {/* Recognition Section - Moved to bottom */}
            <div className="mt-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-200">🏆 Recognized by</span>
              </div>
              <p className="text-primary font-semibold mt-3 text-lg">Encode Club | Story Protocol | Tomo Wallet</p>
              <p className="text-gray-300 text-sm">(Bounty Winner – Surreal World Assets Buildathon 2025)</p>
            </div>
          </div>
        </div>

        {/* Enhanced bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-midnight mb-4">Revolutionizing Drone Data Ownership</h2>
            <p className="text-xl text-text max-w-3xl mx-auto">
              Transform your drone operations into a revenue-generating asset with our comprehensive platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-midnight">Register & Validate Flights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  AI-powered regulatory compliance validation ensures your flights meet all requirements before takeoff.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-midnight">Generate Drone IP (DGIP)</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Automatically convert your flight data into verifiable intellectual property stored on IPFS.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-midnight">Tokenize with Programmable Licensing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Create smart contracts that automatically manage licensing terms and usage rights for your data.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-midnight">Earn Royalties from Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Receive automatic payments whenever your drone data is licensed and used by third parties.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-midnight mb-4">How Aerotraq Works</h2>
            <p className="text-xl text-text max-w-3xl mx-auto">
              Three simple steps to transform your drone data into a revenue stream
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-2xl font-bold text-midnight mb-4">1. AI-Powered Compliance</h3>
                <p className="text-text mb-4">
                  Our AI system, powered by GPT and LlamaIndex, automatically validates your flight plans against
                  regulatory requirements and airspace restrictions.
                </p>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  GPT + LlamaIndex
                </Badge>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-2xl font-bold text-midnight mb-4">2. DGIP Generation & IPFS Storage</h3>
                <p className="text-text mb-4">
                  Flight data is processed into Drone Generated Intellectual Property (DGIP) and securely stored on IPFS
                  with immutable proof of creation.
                </p>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  IPFS Network
                </Badge>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-2xl font-bold text-midnight mb-4">3. IP Tokenization + Royalty Management</h3>
                <p className="text-text mb-4">
                  Your DGIP is tokenized using Story Protocol, enabling programmable licensing and automatic royalty
                  distribution to your wallet.
                </p>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Story Protocol
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section id="demo" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-midnight mb-4">See Aerotraq in Action</h2>
            <p className="text-xl text-text max-w-3xl mx-auto">
              Watch how drone operators are already monetizing their data with our platform
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-midnight to-midnight/80 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Embedded YouTube Video */}
              <iframe
                src="https://www.youtube.com/embed/DMPzaOkoyi0"
                title="Aerotraq Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-2xl"
              />
              {/* Overlayed Watch Demo Button (optional, can remove if redundant) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* This button is now redundant since the video is embedded, but you can keep for style */}
              </div>
            </div>
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="bg-white text-midnight border-slate-300 hover:bg-slate-50"
                onClick={() => setShowDemoModal(true)}
              >
                View Live Simulation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Market Opportunity Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-midnight mb-4">
              Unlocking a $50B+ Opportunity in Drone Data Monetization
            </h2>
            <p className="text-xl text-text max-w-4xl mx-auto">
              The drone economy is exploding and the drone analytics market alone is projected to reach $18.4B by 2030.
              Yet, the creators of this data — drone operators — rarely capture the value they generate.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white border-slate-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-midnight">$14.99B</CardTitle>
                <CardDescription className="text-sm">
                  Drone analytics market size in 2024, expected to grow at 22.0% CAGR through 2030
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-slate-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-midnight">$4.73B</CardTitle>
                <CardDescription className="text-sm">
                  Projected global patent licensing market by 2033 (CAGR: 7.77%)
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-slate-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-midnight">1M+</CardTitle>
                <CardDescription className="text-sm">Registered drones in the U.S. alone (FAA, 2024)</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-midnight mb-4">Emerging IP Tokenization</h3>
              <p className="text-text text-lg leading-relaxed">
                As tokenization reshapes digital ownership and IP management software grows toward $31.8B by 2033,
                decentralized IP licensing is the next frontier.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span>Source: Grand View Research</span>
                <span>•</span>
                <span>Business Research Insights</span>
                <span>•</span>
                <span>FAA 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-midnight mb-8">
              We Believe Drone Data Should Belong to Its Creators
            </h2>
            <div className="space-y-6 text-lg text-text">
              <p>
                Today&apos;s drone operators generate valuable data but rarely capture its economic value. Large corporations
                and data aggregators profit from drone-generated insights while the creators receive nothing. This
                fundamental imbalance stifles innovation and limits the growth potential of the drone economy.
              </p>
              <p>
                Aerotraq changes this dynamic by giving drone operators sovereign ownership of their data and the tools
                to monetize it directly. Through blockchain technology and programmable IP licensing, we&apos;re building the
                infrastructure that ensures data creators are fairly compensated for their contributions to the digital
                economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-midnight mb-4">Built on Cutting-Edge Technology</h2>
            <p className="text-xl text-text max-w-3xl mx-auto">
              Powered by the most advanced AI, blockchain, and decentralized storage technologies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "AI Compliance Engine",
                description:
                  "Advanced language model used to assist in regulatory interpretation and contextual flight analysis.",
              },
              {
                name: "LlamaIndex",
                description:
                  "Agent framework enabling dynamic tool use and retrieval for airspace compliance workflows.",
              },
              {
                name: "OpenAIP",
                description:
                  "Real-time airspace intelligence and No-Fly Zone validation via Multi-Cloud Protocol integration.",
              },
              {
                name: "Solidity",
                description:
                  "Smart contracts securing drone flight records and DGIP mappings on a decentralized ledger.",
              },
              {
                name: "IPFS",
                description: "Distributed storage layer for authenticated, tamper-proof telemetry and flight data.",
              },
              {
                name: "Story Protocol",
                description:
                  "Tokenization and licensing infrastructure for DGIP, with built-in royalty tracking and monetization.",
              },
            ].map((tech, index) => (
              <div key={index} className="text-left">
                <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center mb-4 hover:border-primary/50 transition-colors">
                  <div className="w-8 h-8 bg-primary/10 rounded"></div>
                </div>
                <h3 className="font-bold text-midnight mb-3 text-lg">{tech.name}</h3>
                <p className="text-sm text-text leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-midnight mb-4">Meet the Team</h2>
            <p className="text-xl text-text max-w-3xl mx-auto">
              Built by experienced founders and engineers from leading tech companies
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="bg-white border-slate-200 text-center">
              <CardHeader>
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <Image 
                    src="/OG.png" 
                    alt="Ridwan Oseni" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-midnight">Ridwan Oseni</CardTitle>
                <CardDescription>Founder & Full-Stack AI/Web3 Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text mb-4">
                  Founder & Full-Stack Developer | AI + Blockchain Innovator. Building Aerotraq: a decentralized 
                  infrastructure for the drone and airspace economy. Passionate about applying frontier tech to 
                  real-world systems — with deep expertise in AI and Web3, and a focused mission to reimagine 
                  how drones register, comply, and monetize their data.
                </p>
                <a 
                  href="https://www.linkedin.com/in/ridwan-oseni-56271282/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="w-4 h-4 mr-1" />
                  View LinkedIn Profile
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 text-center">
              <CardHeader>
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <Image 
                    src="/Ioana.png" 
                    alt="Ioana Luncan" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-midnight">Ioana Luncan</CardTitle>
                <CardDescription>Co-Founder and Product & Technology Leader</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text mb-4">
                  Product & Technology Strategist | 17+ Years in Scalable Digital Systems. Driving Aerotraq&apos;s 
                  product vision and technical architecture. Blending deep engineering experience with product 
                  insight to build AI-enhanced, scalable infrastructure for the future of drone and airspace innovation.
                </p>
                <a 
                  href="https://www.linkedin.com/in/ioana-luncan/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="w-4 h-4 mr-1" />
                  View LinkedIn Profile
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Badge variant="secondary" className="bg-primary/10 text-primary px-4 py-2 text-sm">
              Backed by Leading Web3 Investors
            </Badge>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Hero Styling */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-midnight via-blue-900 to-midnight text-white py-20">
        {/* Animated SVG Background - Same as Hero */}
        <div className="absolute inset-0 opacity-60">
          <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="footerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 211, 238, 0.06)" strokeWidth="1" />
              </pattern>
              <linearGradient id="footerPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.3)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#footerGrid)" />

            {/* Footer Network Nodes */}
            <g className="animate-pulse" style={{ animationDuration: "8s" }}>
              <circle cx="150" cy="100" r="2" fill="rgba(34, 211, 238, 0.6)" />
              <circle cx="300" cy="80" r="3" fill="rgba(34, 211, 238, 0.7)" />
              <circle cx="450" cy="120" r="2" fill="rgba(34, 211, 238, 0.6)" />
              <circle cx="600" cy="90" r="3" fill="rgba(34, 211, 238, 0.7)" />
              <circle cx="750" cy="110" r="2" fill="rgba(34, 211, 238, 0.6)" />
              <circle cx="900" cy="85" r="3" fill="rgba(34, 211, 238, 0.7)" />
              <circle cx="1050" cy="105" r="2" fill="rgba(34, 211, 238, 0.6)" />
            </g>

            {/* Footer Connections */}
            <g stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" fill="none">
              <line x1="150" y1="100" x2="300" y2="80">
                <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="5s" repeatCount="indefinite" />
              </line>
              <line x1="300" y1="80" x2="450" y2="120">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.3;0.1"
                  dur="5s"
                  begin="1s"
                  repeatCount="indefinite"
                />
              </line>
              <line x1="450" y1="120" x2="600" y2="90">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.3;0.1"
                  dur="5s"
                  begin="2s"
                  repeatCount="indefinite"
                />
              </line>
              <line x1="600" y1="90" x2="750" y2="110">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.3;0.1"
                  dur="5s"
                  begin="3s"
                  repeatCount="indefinite"
                />
              </line>
              <line x1="750" y1="110" x2="900" y2="85">
                <animate
                  attributeName="stroke-opacity"
                  values="0.1;0.3;0.1"
                  dur="5s"
                  begin="4s"
                  repeatCount="indefinite"
                />
              </line>
            </g>

            {/* Footer Flight Paths */}
            <g fill="none" stroke="url(#footerPathGradient)" strokeWidth="1.5">
              <path d="M0,200 Q200,150 400,180 Q600,210 800,160 Q1000,110 1200,140">
                <animate attributeName="stroke-dasharray" values="0,1500;1500,0" dur="20s" repeatCount="indefinite" />
                <animate attributeName="stroke-dashoffset" values="0;-1500" dur="20s" repeatCount="indefinite" />
              </path>
              <path d="M0,300 Q300,250 600,280 Q900,310 1200,260">
                <animate
                  attributeName="stroke-dasharray"
                  values="0,1500;1500,0"
                  dur="25s"
                  begin="5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-1500"
                  dur="25s"
                  begin="5s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </svg>
        </div>

        {/* Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg" style={{ backgroundColor: '#2D4897' }}>
                  <Image src="/aerotraq-logo.png" alt="Aerotraq Logo" width={48} height={48} className="object-contain" />
                </div>
                <span className="text-2xl font-bold">Aerotraq</span>
              </div>
              <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                The infrastructure layer for the drone economy. Tokenize your sky data and earn royalties from your
                flights.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Demo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Get Updates</h3>
              <p className="text-gray-300 text-sm mb-6">Stay updated on our launch</p>
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-lg backdrop-blur-sm"
                />
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">© 2024 Aerotraq. All rights reserved.</p>
            <div className="flex space-x-8 text-sm text-gray-300 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
      </footer>

      {/* Place the modal at the end of your component */}
      <DemoModal />
      <EarlyAccessModal />
    </div>
  )
}
