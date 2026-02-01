"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

export default function Home() {
  return (
    <div className="bg-[#1a1a2e] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold tracking-tight">BuyNet</div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm text-white/70 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link
                href="#demo"
                className="rounded-lg bg-[#0f3460] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#16213e] transition-all"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#16213e] via-[#1a1a2e] to-[#0f3460] opacity-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(15, 52, 96, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(22, 33, 62, 0.3) 0%, transparent 50%)`,
        }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0f3460] bg-[#0f3460]/20 px-4 py-1.5 text-xs font-medium text-[#0f3460] backdrop-blur-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-[#0f3460] animate-pulse" />
                AI Marketing Autopilot
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]" style={{
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '-0.02em',
              }}>
                Marketing that
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0f3460] to-white">
                  learns & improves
                </span>
                itself
              </h1>

              <p className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl" style={{
                fontFamily: "'Literata', Georgia, serif",
              }}>
                Turn marketing from guesswork into a data-driven, self-improving system.
                BuyNet runs a closed learning loop that gets smarter with every campaign.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#demo"
                  className="group relative rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#1a1a2e] transition-all hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20"
                >
                  <span className="relative z-10">Start Free Trial</span>
                </Link>
                <Link
                  href="#how-it-works"
                  className="group rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
                >
                  See How It Works
                  <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    <AnimatedCounter end={34} suffix="%" />
                  </div>
                  <div className="text-sm text-white/60 mt-1">Avg ROI Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    <AnimatedCounter end={70} suffix="%" />
                  </div>
                  <div className="text-sm text-white/60 mt-1">Time Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    <AnimatedCounter end={200} suffix="+" />
                  </div>
                  <div className="text-sm text-white/60 mt-1">Deployments</div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#16213e]/50 to-[#0f3460]/50 p-8 backdrop-blur-sm">
                {/* Animated data visualization placeholder */}
                <div className="space-y-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 opacity-70"
                      style={{
                        animation: `slideIn 0.6s ease-out ${i * 0.1}s backwards`,
                      }}
                    >
                      <div className="h-2 rounded-full bg-gradient-to-r from-[#0f3460] to-white/20"
                           style={{ width: `${Math.random() * 40 + 40}%` }} />
                      <div className="text-xs text-white/40 tabular-nums font-mono">
                        {Math.floor(Math.random() * 40 + 60)}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating metric cards */}
                <div className="absolute top-8 right-8 rounded-lg border border-white/10 bg-[#1a1a2e]/80 p-4 backdrop-blur-md"
                     style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <div className="text-xs text-white/60">Campaign ROI</div>
                  <div className="text-2xl font-bold text-[#0f3460] tabular-nums mt-1">+142%</div>
                </div>

                <div className="absolute bottom-12 left-8 rounded-lg border border-white/10 bg-[#1a1a2e]/80 p-4 backdrop-blur-md"
                     style={{ animation: 'float 3s ease-in-out 0.5s infinite' }}>
                  <div className="text-xs text-white/60">Learning Status</div>
                  <div className="text-sm font-semibold text-white mt-1 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#28a745] animate-pulse" />
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative bg-white text-[#1a1a2e] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '-0.01em',
            }}>
              Intelligence that compounds
            </h2>
            <p className="text-lg text-[#6c757d] max-w-2xl mx-auto" style={{
              fontFamily: "'Literata', Georgia, serif",
            }}>
              While other tools require constant manual optimization, BuyNet autonomously learns
              and improves with every campaign.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative rounded-2xl border border-[#f8f9fa] bg-white p-8 transition-all hover:border-[#0f3460] hover:shadow-xl">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f3460]/10">
                <svg className="h-6 w-6 text-[#0f3460]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
              <p className="text-[#6c757d] leading-relaxed">
                Every campaign, interaction, and result feeds back into the system.
                Performance doesn't plateau—it continuously optimizes based on real data.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl border border-[#f8f9fa] bg-white p-8 transition-all hover:border-[#0f3460] hover:shadow-xl">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f3460]/10">
                <svg className="h-6 w-6 text-[#0f3460]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Autonomous Excellence</h3>
              <p className="text-[#6c757d] leading-relaxed">
                Reduce manual optimization work by 70%. Self-optimizing campaigns adapt
                and improve without constant human intervention.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl border border-[#f8f9fa] bg-white p-8 transition-all hover:border-[#0f3460] hover:shadow-xl">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f3460]/10">
                <svg className="h-6 w-6 text-[#0f3460]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Data-Driven Decisions</h3>
              <p className="text-[#6c757d] leading-relaxed">
                Every decision backed by measurable insights. Complete visibility into
                metrics, attribution, and ROI with transparent reporting.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative rounded-2xl border border-[#f8f9fa] bg-white p-8 transition-all hover:border-[#0f3460] hover:shadow-xl">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f3460]/10">
                <svg className="h-6 w-6 text-[#0f3460]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Transparent Intelligence</h3>
              <p className="text-[#6c757d] leading-relaxed">
                No black boxes. Complete audit trails show how and why the AI makes
                decisions, with full user control and override capabilities.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative rounded-2xl border border-[#f8f9fa] bg-white p-8 transition-all hover:border-[#0f3460] hover:shadow-xl">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f3460]/10">
                <svg className="h-6 w-6 text-[#0f3460]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Compounding ROI</h3>
              <p className="text-[#6c757d] leading-relaxed">
                Turn marketing spend into a compounding asset. Average 34% ROI improvement
                across 200+ deployments as the system learns your audience.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative rounded-2xl border border-[#f8f9fa] bg-white p-8 transition-all hover:border-[#0f3460] hover:shadow-xl">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f3460]/10">
                <svg className="h-6 w-6 text-[#0f3460]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Adaptive Bidding</h3>
              <p className="text-[#6c757d] leading-relaxed">
                AI-powered bid optimization that learns from performance patterns
                and adjusts in real-time to maximize conversion efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative bg-[#f8f9fa] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1a2e] mb-4" style={{
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '-0.01em',
            }}>
              How BuyNet works
            </h2>
            <p className="text-lg text-[#6c757d] max-w-2xl mx-auto" style={{
              fontFamily: "'Literata', Georgia, serif",
            }}>
              A closed learning loop that transforms marketing from a cost center into a compounding asset.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-3 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f3460] text-xl font-bold text-white">
                1
              </div>
              <div className="ml-12 rounded-2xl border border-[#e5e7eb] bg-white p-8">
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">Connect & Launch</h3>
                <p className="text-[#6c757d] leading-relaxed mb-4">
                  Connect your ad accounts and set your baseline strategy. Initial campaigns
                  run on your proven approach while BuyNet begins collecting data.
                </p>
                <div className="text-sm font-semibold text-[#0f3460]">
                  Setup time: ~5 minutes
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-3 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f3460] text-xl font-bold text-white">
                2
              </div>
              <div className="ml-12 rounded-2xl border border-[#e5e7eb] bg-white p-8">
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">Learn & Analyze</h3>
                <p className="text-[#6c757d] leading-relaxed mb-4">
                  BuyNet analyzes every interaction, conversion, and outcome. It doesn't just
                  track what works—it identifies why and applies those insights systematically.
                </p>
                <div className="text-sm font-semibold text-[#0f3460]">
                  Learning cycle: 2-4 weeks
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-3 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f3460] text-xl font-bold text-white">
                3
              </div>
              <div className="ml-12 rounded-2xl border border-[#e5e7eb] bg-white p-8">
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">Optimize & Scale</h3>
                <p className="text-[#6c757d] leading-relaxed mb-4">
                  Automated optimization kicks in. Campaigns continuously improve as the system
                  learns your audience, refines targeting, and optimizes creative.
                </p>
                <div className="text-sm font-semibold text-[#0f3460]">
                  Continuous improvement
                </div>
              </div>
            </div>
          </div>

          {/* Results callout */}
          <div className="mt-16 rounded-2xl border border-[#0f3460]/20 bg-gradient-to-br from-[#0f3460]/5 to-[#16213e]/5 p-12 text-center">
            <div className="text-sm font-semibold text-[#0f3460] uppercase tracking-wide mb-4">
              Proven Results
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-6" style={{
              fontFamily: "'IBM Plex Mono', monospace",
            }}>
              The learning loop typically takes 2-4 weeks to gather enough data for
              meaningful optimization.
            </div>
            <p className="text-lg text-[#6c757d] max-w-3xl mx-auto">
              After the initial learning phase, customers see an average 34% ROI improvement
              and 70% reduction in manual optimization work.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1a2e] mb-4" style={{
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '-0.01em',
            }}>
              Trusted by growing teams
            </h2>
            <p className="text-lg text-[#6c757d] max-w-2xl mx-auto" style={{
              fontFamily: "'Literata', Georgia, serif",
            }}>
              Companies using BuyNet to transform their marketing operations.
            </p>
          </div>

          {/* Company logos placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f8f9fa] p-8 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="text-2xl font-bold text-[#6c757d]" style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                }}>
                  LOGO
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8f9fa] p-8">
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-[#0f3460]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-[#1a1a2e] leading-relaxed mb-4" style={{
                  fontFamily: "'Literata', Georgia, serif",
                }}>
                  "BuyNet reduced our CAC by 41% in Q3. The learning system identified patterns
                  we would have never caught manually. It's like having a senior marketer who
                  never sleeps."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#0f3460]/10" />
                <div>
                  <div className="font-semibold text-[#1a1a2e]">Sarah Chen</div>
                  <div className="text-sm text-[#6c757d]">VP Marketing, Acme Corp</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8f9fa] p-8">
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-[#0f3460]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-[#1a1a2e] leading-relaxed mb-4" style={{
                  fontFamily: "'Literata', Georgia, serif",
                }}>
                  "We were skeptical about AI marketing tools, but BuyNet's transparent approach
                  won us over. Seeing exactly why decisions are made builds trust. Results speak
                  for themselves."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#0f3460]/10" />
                <div>
                  <div className="font-semibold text-[#1a1a2e]">Michael Rodriguez</div>
                  <div className="text-sm text-[#6c757d]">CEO, TechStart Inc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#16213e] via-[#1a1a2e] to-[#0f3460] py-24 lg:py-32">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={{
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '-0.02em',
          }}>
            Ready to turn marketing into a compounding asset?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto" style={{
            fontFamily: "'Literata', Georgia, serif",
          }}>
            Join 200+ teams using BuyNet to transform their marketing operations.
            Start your free trial today—no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#demo"
              className="rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#1a1a2e] transition-all hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20"
            >
              Start Free Trial
            </Link>
            <Link
              href="#pricing"
              className="rounded-lg border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              View Pricing
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#28a745]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#28a745]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#28a745]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] border-t border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Column 1: Product */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#integrations" className="text-sm text-white/60 hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="#roadmap" className="text-sm text-white/60 hover:text-white transition-colors">Roadmap</Link></li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="#about" className="text-sm text-white/60 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#customers" className="text-sm text-white/60 hover:text-white transition-colors">Customers</Link></li>
                <li><Link href="#careers" className="text-sm text-white/60 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link href="#docs" className="text-sm text-white/60 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#blog" className="text-sm text-white/60 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#guides" className="text-sm text-white/60 hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="#api" className="text-sm text-white/60 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Column 4: Support */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                <li><Link href="#help" className="text-sm text-white/60 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#status" className="text-sm text-white/60 hover:text-white transition-colors">Status</Link></li>
                <li><Link href="#security" className="text-sm text-white/60 hover:text-white transition-colors">Security</Link></li>
                <li><Link href="#compliance" className="text-sm text-white/60 hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>

            {/* Column 5: Legal */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="#privacy" className="text-sm text-white/60 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#terms" className="text-sm text-white/60 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#cookies" className="text-sm text-white/60 hover:text-white transition-colors">Cookies</Link></li>
                <li><Link href="#licenses" className="text-sm text-white/60 hover:text-white transition-colors">Licenses</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
            <div className="text-sm text-white/60">
              © 2026 BuyNet Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="#twitter" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#linkedin" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link href="#github" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 0.7;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
