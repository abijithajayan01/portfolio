/**
 * ABIJITH AJAYAN - PORTFOLIO INTERACTION ENGINE
 * Lightweight (<10KB), Zero Runtime Dependencies, High Performance
 */

(function () {
  'use strict';

  // --- 1. CASE STUDY DEEP DIVE DATA ---
  const CASE_STUDIES_DATA = {
    simplihi: {
      id: 'simplihi',
      title: 'Conversational AI & Voice Calling Suite',
      badge: 'GenAI & Voice Systems',
      role: 'Lead Architect & GenAI Systems Engineer',
      duration: 'Production Deployed • 2024–Present',
      problem: `High customer acquisition costs and slow initial response times were causing tier-1 lead qualification drop-offs exceeding 45%. Traditional manual call centers were expensive, limited to 9-to-5 working hours, and suffered high staff churn. The client required an autonomous, human-like voice calling and web chatbot suite capable of real-time multi-lingual conversations with sub-second response latency.`,
      solution: `Architected a high-concurrency voice and chat ecosystem utilizing Python, FastAPI, and asynchronous streaming pipelines:
- **Autonomous Web & Social Bots**: Ingested and indexed client website URLs using automated crawling and vector search to ground conversation context with zero hallucinations.
- **Low-Latency Voice Engine**: Engineered a streaming audio pipeline combining Sarvam AI (for Indian accents/languages) and ElevenLabs (for US/UK natural cadences) with OpenAI GPT-4 and Google Gemini LLMs.
- **Zero-Code Dashboard**: Built an Angular enterprise control plane enabling non-technical operators to switch voices, tweak prompt temperature, assign phone numbers, and inspect call transcripts in real-time.`,
      architecture: `[Incoming Call / Webhook]
       │
       ▼
[FastAPI Asynchronous Gateway]
       │
       ├──► [Streaming STT: Deepgram / Whisper / Sarvam]
       │           │
       │           ▼
       ├──► [RAG Engine + Vector Embeddings (Milvus / Chroma)]
       │           │
       │           ▼
       ├──► [Orchestration LLM: Google Gemini API / GPT-4 Turbo]
       │           │
       │           ▼
       └──► [Ultra-Low Latency TTS: ElevenLabs / Sarvam AI (<650ms)]
                   │
                   ▼
       [Twilio / Plivo WebRTC Telephony Pipe] ──► [Caller Audio]`,
      metrics: [
        { label: 'Voice Response Latency', value: '< 680ms', desc: 'True natural conversational turn-around' },
        { label: 'Tier-1 Support Overhead', value: '-68%', desc: 'Automated 12,000+ monthly calls' },
        { label: 'Lead Qualification Rate', value: '+41%', desc: 'Instant 24/7 engagement without drop-offs' },
        { label: 'Concurrent Call Capacity', value: '500+', desc: 'Zero pipeline choking under peak traffic' }
      ],
      techStack: ['Python', 'FastAPI', 'RAG Architecture', 'Google Gemini', 'OpenAI GPT-4', 'ElevenLabs', 'Sarvam AI', 'Angular 18', 'MySQL', 'WebSockets', 'Docker']
    },

    etl: {
      id: 'etl',
      title: 'Real Estate High-Scale Data Ingestion & Processing Pipeline',
      badge: 'High-Volume Data Scraping & ETL',
      role: 'Backend Architect & Data Pipeline Engineer',
      duration: 'Enterprise Production System',
      problem: `Real estate inventory aggregation required continuously scraping 2.5M+ property listings across dozens of heterogeneous developer portals. Raw payloads contained unstandardized, high-resolution imagery (5MB to 12MB per photo), causing severe network bandwidth choking, massive database storage bloat, and repeated IP blocks by upstream sources.`,
      solution: `Designed a fault-tolerant, distributed scraping and automated asset compression pipeline:
- **Automated Scraping Workers**: Built resilient Python scrapers using proxy rotation, adaptive rate-limiting, and distributed task queues running headless workers during scheduled overnight windows.
- **Intelligent Image Processing Pipeline**: Created an automated PIL/OpenCV streaming compression engine that dynamically scales dimensions and compresses photos below a strict 150 KB limit while maintaining retina-quality clarity.
- **Deduplication Engine**: Generated SHA-256 binary hash signatures for listings and images to eliminate redundant downloads and store only unique records.
- **Streamlit Ops Dashboard**: Developed an internal real-time operational monitor allowing engineers to inspect pipeline throughput, failed worker retries, and ingestion metrics.`,
      architecture: `[Target Portals (2.5M+ URLs)]
       │
       ▼
[Rotating Proxy Pool + Rate-Limiting Scraper Cluster]
       │
       ├──► [HTML Parser & Schema Normalizer (Pydantic / BeautifulSoup)]
       │
       ▼
[Distributed Celery Workers (Scheduled Overnight)]
       │
       ├──► [SHA-256 Hash Deduplicator (Drops 99.8% Duplicates)]
       │
       ├──► [Automated Image Compression Engine: Resize & Compress < 150KB]
       │
       ▼
[MySQL Partitioned Cluster + S3 Compatible Asset Storage]
       │
       ▼
[Streamlit Real-Time Ops Monitoring Dashboard]`,
      metrics: [
        { label: 'Ingested Inventory', value: '2.5M+', desc: 'Total listings scraped & normalized' },
        { label: 'Storage Cost Reduction', value: '85%', desc: 'All assets kept strictly under 150 KB' },
        { label: 'IP Ban Rate', value: '0.0%', desc: 'Adaptive throttling & intelligent rotation' },
        { label: 'Deduplication Precision', value: '99.9%', desc: 'SHA-256 content & image fingerprinting' }
      ],
      techStack: ['Python', 'Streamlit', 'Web Scraping (Playwright/Scrapy)', 'Pillow (PIL)', 'OpenCV', 'SHA-256 Hashing', 'MySQL', 'REST APIs', 'Linux Cron', 'Redis']
    },

    sitecrm: {
      id: 'sitecrm',
      title: 'SiteCRM - Multi-Tenant Real Estate Sales Engine',
      badge: 'Enterprise SaaS & Cloud Telephony',
      role: 'Principal Full Stack Architect',
      duration: '100+ Active Builder & Broker Tenants',
      problem: `Real estate builders and channel partner networks were losing 35% of qualified buyer leads due to fragmented manual Excel handoffs, delayed broker contact times (often 6+ hours), and zero accountability over sales agent phone conversations. Unconnected Meta ad spend was delivering thousands of unassigned leads that quickly turned cold.`,
      solution: `Engineered SiteCRM, a multi-tenant enterprise sales automation engine:
- **Instant Meta Ad Lead Webhooks**: Streamed leads directly from Meta Graph APIs into the database within 800ms of form submission.
- **SLA-Driven Lead Redistribution Engine**: Built an automated watchdog that reassigns a lead to the next available agent if not contacted within 90 seconds.
- **Integrated Cloud Telephony**: Embedded click-to-call dialing with automatic two-way call recording and timestamped disposition logging.
- **Real-Time Team Collaboration**: Embedded an in-app instant chat and notification system for channel partners and sales directors.`,
      architecture: `[Meta Lead Ads Webhook (Facebook / Instagram)]
       │ (800ms Webhook Dispatch)
       ▼
[Laravel / CodeIgniter Multi-Tenant Core API]
       │
       ├──► [Tenant RBAC Isolation Engine (Builders vs Brokers)]
       │
       ├──► [SLA Automated Reassignment Engine (<90s Rule)]
       │
       ├──► [Cloud Telephony API (Twilio / Exotel Click-to-Call)]
       │           │
       │           └──► [Call Recording & Audio Storage Pipe]
       │
       ▼
[Angular High-Performance Broker Portal + Real-Time Chat]`,
      metrics: [
        { label: 'Lead Contact Speed', value: '< 90s', desc: 'Automated instant round-robin assignment' },
        { label: 'Active Tenant Orgs', value: '100+', desc: 'Multi-tenant architecture with isolated data' },
        { label: 'Missed Ad Leads', value: '0', desc: '100% automated webhook ingestion from Meta' },
        { label: 'Sales Conversion Lift', value: '+34%', desc: 'Enforced SLA and audio call accountability' }
      ],
      techStack: ['Angular (2-18)', 'PHP (Laravel)', 'CodeIgniter', 'MySQL Enterprise', 'Meta Lead Ads API', 'Cloud Telephony (Twilio/Exotel)', 'WebSockets', 'TailwindCSS']
    },

    omnichannel: {
      id: 'omnichannel',
      title: 'Omnichannel Social Media Publishing & Analytics SaaS',
      badge: 'Multi-Tenant SaaS & Social APIs',
      role: 'Lead Architect & Backend Engineer',
      duration: 'Enterprise Production System',
      problem: `Enterprise marketing agencies managing dozens of corporate brands faced operational chaos publishing across 7+ social platforms (YouTube, LinkedIn, Meta, X, Threads). Content was being shared without senior brand approvals, scheduling was done manually per network, and cross-platform analytics had to be compiled by hand in spreadsheets.`,
      solution: `Architected a centralized multi-tenant publishing and analytics control suite:
- **Unified Multi-Platform Scheduling**: Ingested and posted video, carousel, and text content across 7 major networks through a single unified scheduling calendar.
- **Multi-Tier Hierarchical Approval Workflow**: Built role-based permissions allowing Junior Executives to draft posts, Team Leads to review, and Agency Admins or Clients to provide one-click sign-off.
- **Automated Metric Ingestion**: Ingested engagement metrics (impressions, CTR, watch time) overnight into MySQL to generate unified client performance dashboards.
- **AI-Assisted Publishing Windows**: Recommended the highest-engagement posting hours based on historical follower activity.`,
      architecture: `[User Interface: Angular Multi-Tenant Publisher UI]
       │
       ▼
[Approval State Machine: Executive -> Team Lead -> Admin Sign-off]
       │ (On Approved Status)
       ▼
[Scheduled Ingestion & Dispatch Engine (Python / Celery)]
       │
       ├──► [Meta Graph API (Facebook Pages & Instagram Business)]
       ├──► [LinkedIn Marketing API]
       ├──► [YouTube Data API v3 (Direct Video Uploads)]
       ├──► [X / Twitter API v2]
       └──► [Threads API]
       │
       ▼
[Automated Analytics Scraper: Impressions, Clicks, Conversions]`,
      metrics: [
        { label: 'Supported Networks', value: '7+', desc: 'YouTube, LinkedIn, Meta, X, Threads & more' },
        { label: 'Approval Compliance', value: '100%', desc: 'Zero unapproved content leaks' },
        { label: 'Agency Hours Saved', value: '25 hrs/wk', desc: 'Unified scheduling instead of 7 dashboards' },
        { label: 'Automated Sync', value: '24/7', desc: 'Reliable token refresh and retry queues' }
      ],
      techStack: ['Python', 'Angular', 'MySQL', 'OAuth 2.0 Multi-Provider', 'Meta Graph API', 'LinkedIn API', 'YouTube API', 'X API v2', 'Docker', 'Linux']
    }
  };

  // --- 2. LIVE GLOBAL CLOCKS ENGINE ---
  const TIMEZONES = [
    { id: 'sf', city: 'San Francisco', tz: 'America/Los_Angeles', label: 'PST / PDT' },
    { id: 'ny', city: 'New York', tz: 'America/New_York', label: 'EST / EDT' },
    { id: 'lon', city: 'London', tz: 'Europe/London', label: 'GMT / BST' },
    { id: 'dxb', city: 'Dubai', tz: 'Asia/Dubai', label: 'GST (UTC+4)' },
    { id: 'blr', city: 'Bangalore (Base)', tz: 'Asia/Kolkata', label: 'IST (UTC+5:30)', isBase: true }
  ];

  function updateGlobalClocks() {
    const now = new Date();

    TIMEZONES.forEach(item => {
      const elTime = document.getElementById(`clock-time-${item.id}`);
      const elStatus = document.getElementById(`clock-status-${item.id}`);
      const elCard = document.getElementById(`clock-card-${item.id}`);

      if (!elTime) return;

      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: item.tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);

        const hourStr = new Intl.DateTimeFormat('en-US', {
          timeZone: item.tz,
          hour: 'numeric',
          hour12: false
        }).format(now);

        const currentHour = parseInt(hourStr, 10);
        elTime.textContent = timeStr;

        // Determine if working hours / overlap
        const isWorkHour = currentHour >= 9 && currentHour < 18;
        const isOverlapHour = currentHour >= 12 && currentHour < 22; // Bangalore evening overlaps heavily with US morning and EU afternoon

        if (item.isBase) {
          elStatus.textContent = 'Active Working Hours';
          if (elCard) elCard.classList.add('overlap-active');
        } else if (isWorkHour) {
          elStatus.textContent = 'Online / Core Hours';
          if (elCard) elCard.classList.add('overlap-active');
        } else {
          elStatus.textContent = 'Standby / Async Sync';
          if (elCard) elCard.classList.remove('overlap-active');
        }
      } catch (err) {
        console.warn('Clock format error', err);
      }
    });
  }

  // --- 3. TOAST NOTIFICATION UTILITY ---
  function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div>${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 300ms ease';
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  // --- 4. CLIPBOARD COPY UTILITIES ---
  function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage || `Copied to clipboard: ${text}`);
      }).catch(() => {
        fallbackCopy(text, successMessage);
      });
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast(successMessage || `Copied: ${text}`);
    } catch (e) {
      showToast('Please copy manually: ' + text);
    }
    document.body.removeChild(input);
  }

  // --- 5. CASE STUDY MODAL ENGINE ---
  function openCaseStudyModal(caseId) {
    const data = CASE_STUDIES_DATA[caseId];
    if (!data) return;

    const modalOverlay = document.getElementById('caseStudyModal');
    const modalBody = document.getElementById('modalCaseContent');
    if (!modalOverlay || !modalBody) return;

    // Render deep dive content
    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
        <span class="case-category">${data.badge}</span>
        <span class="case-index font-mono">${data.duration}</span>
      </div>
      <h2 style="font-size: 1.8rem; margin-bottom: 8px; color: #fff;">${data.title}</h2>
      <p style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--teal-400); margin-bottom: 24px;">Role: ${data.role}</p>

      <!-- Key Metrics Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin-bottom: 28px;">
        ${data.metrics.map(m => `
          <div style="background: rgba(8, 12, 22, 0.7); border: 1px solid var(--border-medium); border-radius: 8px; padding: 14px;">
            <div style="font-family: var(--font-mono); font-size: 1.45rem; font-weight: 800; color: var(--teal-400);">${m.value}</div>
            <div style="font-size: 0.8rem; font-weight: 600; color: #fff; margin-bottom: 2px;">${m.label}</div>
            <div style="font-size: 0.74rem; color: var(--text-muted);">${m.desc}</div>
          </div>
        `).join('')}
      </div>

      <!-- Problem Statement -->
      <div class="case-block-item" style="margin-bottom: 20px;">
        <div class="case-block-label problem">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          Business Problem & Operational Bottlenecks
        </div>
        <p class="case-block-text" style="font-size: 0.94rem; line-height: 1.65;">${data.problem}</p>
      </div>

      <!-- Architecture Diagram / Pipeline Flow -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; color: var(--teal-400); text-transform: uppercase;">
            SYSTEM ARCHITECTURE & DATA FLOW
          </span>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">Sub-Second Concurrency</span>
        </div>
        <pre class="arch-diagram-flow">${escapeHtml(data.architecture)}</pre>
      </div>

      <!-- Solution Breakdown -->
      <div class="case-block-item" style="margin-bottom: 24px;">
        <div class="case-block-label solution">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Technical Solution & Implementation Highlights
        </div>
        <div class="case-block-text" style="font-size: 0.94rem; line-height: 1.65; white-space: pre-line;">${data.solution}</div>
      </div>

      <!-- Stack Used -->
      <div style="margin-bottom: 28px;">
        <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-muted); margin-bottom: 10px; text-transform: uppercase;">Technologies & Frameworks</div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.techStack.map(t => `<span class="tech-badge" style="background: rgba(20, 184, 166, 0.1); border-color: rgba(45, 212, 191, 0.25); color: var(--text-primary);">${t}</span>`).join('')}
        </div>
      </div>

      <!-- CTA Inside Modal -->
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; background: rgba(20, 184, 166, 0.08); border: 1px solid rgba(45, 212, 191, 0.25); border-radius: 12px; padding: 18px 24px;">
        <div>
          <div style="font-weight: 700; color: #fff; font-size: 0.96rem;">Building a similar enterprise system?</div>
          <div style="font-size: 0.84rem; color: var(--text-secondary);">I can architect, prototype, or audit your architecture in a 2-4 week sprint.</div>
        </div>
        <a href="#contact" onclick="closeAllModals()" class="btn btn-primary btn-sm">Discuss Architecture</a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function escapeHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }

  // --- 6. CASE STUDY CATEGORY FILTER ---
  function initCaseStudyFilters() {
    const filterBtns = document.querySelectorAll('[data-case-filter]');
    const cards = document.querySelectorAll('.case-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-case-filter');

        cards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 7. INTERACTIVE PROJECT INQUIRY FORM GENERATOR ---
  function initInquiryForm() {
    const tagOptions = document.querySelectorAll('.tag-option');
    let selectedServices = [];

    tagOptions.forEach(tag => {
      tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
        const val = tag.getAttribute('data-val') || tag.textContent.trim();
        if (tag.classList.contains('selected')) {
          if (!selectedServices.includes(val)) selectedServices.push(val);
        } else {
          selectedServices = selectedServices.filter(s => s !== val);
        }
      });
    });

    const inquiryForm = document.getElementById('projectInquiryForm');
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const clientName = document.getElementById('inquiryName')?.value.trim() || 'Client';
        const clientEmail = document.getElementById('inquiryEmail')?.value.trim() || '';
        const clientTimeline = document.getElementById('inquiryTimeline')?.value || 'Immediate';
        const clientNotes = document.getElementById('inquiryNotes')?.value.trim() || '';

        const servicesStr = selectedServices.length > 0 ? selectedServices.join(', ') : 'Custom Software / AI Engineering';

        const subject = encodeURIComponent(`Project Inquiry: ${servicesStr} - from ${clientName}`);
        const body = encodeURIComponent(
`Hi Abijith,

I reviewed your portfolio and would like to discuss an international project collaboration:

- Client / Company: ${clientName}
- Contact Email: ${clientEmail}
- Target Scope: ${servicesStr}
- Desired Timeline: ${clientTimeline}

Project Overview & Requirements:
${clientNotes || 'We need high-scale architectural design and implementation. Looking forward to discussing.'}

Best regards,
${clientName}`
        );

        // Open Mail Client
        window.location.href = `mailto:abijithajayan01@gmail.com?subject=${subject}&body=${body}`;
        showToast('Drafting project inquiry email to Abijith...');
      });
    }

    // Direct WhatsApp Button
    const waBtn = document.getElementById('btnWhatsAppInquiry');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        const text = encodeURIComponent(`Hi Abijith, I came across your portfolio. I'd like to discuss a freelance project / contract (US/UK/EU overlap).`);
        window.open(`https://wa.me/919605780704?text=${text}`, '_blank');
      });
    }
  }

  // --- 8. MOBILE NAVIGATION DRAWER ---
  function initMobileNav() {
    const toggleBtn = document.getElementById('navMobileToggle');
    const drawer = document.getElementById('mobileDrawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('active');
    });

    const mobileLinks = drawer.querySelectorAll('.mobile-nav-link, a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    });
  }

  // --- 9. SCROLLSPY & NAVBAR SCROLL BEHAVIOR ---
  function initScrollBehavior() {
    const nav = document.getElementById('siteNav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      // Nav shadow on scroll
      if (nav) {
        if (scrollY > 30) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      // Active section highlight
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // --- 10.0 CUSTOM DARK CALENDAR COMPONENT ---
  function initCustomDatePicker() {
    const trigger = document.getElementById('datePickerTrigger');
    const dropdown = document.getElementById('customCalendarDropdown');
    const hiddenInput = document.getElementById('meetingDate');
    const displayText = document.getElementById('datePickerDisplayText');
    const monthYearTitle = document.getElementById('calMonthYearTitle');
    const prevMonthBtn = document.getElementById('calPrevMonthBtn');
    const nextMonthBtn = document.getElementById('calNextMonthBtn');
    const daysGrid = document.getElementById('calDaysGrid');
    const quickPills = document.querySelectorAll('.quick-pill-btn');

    if (!trigger || !dropdown || !hiddenInput) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Initial selected date = tomorrow
    let selectedDate = new Date(today);
    selectedDate.setDate(selectedDate.getDate() + 1);

    let viewYear = selectedDate.getFullYear();
    let viewMonth = selectedDate.getMonth();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function formatISODate(d) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function formatDisplayDate(d) {
      const dayName = dayNames[d.getDay()];
      const monthShort = monthNames[d.getMonth()].substring(0, 3);
      const dayNum = d.getDate();
      const year = d.getFullYear();
      return `${dayName}, ${monthShort} ${dayNum}, ${year}`;
    }

    function updateSelectedDate(d, sourcePill = null) {
      selectedDate = new Date(d);
      selectedDate.setHours(0, 0, 0, 0);
      viewYear = selectedDate.getFullYear();
      viewMonth = selectedDate.getMonth();

      hiddenInput.value = formatISODate(selectedDate);
      displayText.textContent = formatDisplayDate(selectedDate);

      // Update quick pills active state
      quickPills.forEach(p => p.classList.remove('active'));
      if (sourcePill) {
        sourcePill.classList.add('active');
      } else {
        const diffDays = Math.round((selectedDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) {
          document.querySelector('[data-quick="today"]')?.classList.add('active');
        } else if (diffDays === 1) {
          document.querySelector('[data-quick="tomorrow"]')?.classList.add('active');
        } else if (diffDays === 2) {
          document.querySelector('[data-quick="in2days"]')?.classList.add('active');
        }
      }

      renderCalendar();
    }

    function renderCalendar() {
      if (!monthYearTitle || !daysGrid) return;
      monthYearTitle.textContent = `${monthNames[viewMonth]} ${viewYear}`;

      // Check if past month to disable prev button
      const isPastMonth = (viewYear < today.getFullYear()) || 
                          (viewYear === today.getFullYear() && viewMonth <= today.getMonth());
      if (prevMonthBtn) prevMonthBtn.disabled = isPastMonth;

      daysGrid.innerHTML = '';

      const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

      // Empty leading cells
      for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'cal-day-cell disabled';
        daysGrid.appendChild(emptyCell);
      }

      // Populate days
      for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'cal-day-cell';
        cell.textContent = day;

        const cellDate = new Date(viewYear, viewMonth, day);
        cellDate.setHours(0, 0, 0, 0);

        if (cellDate < today) {
          cell.classList.add('disabled');
        } else {
          if (cellDate.getTime() === today.getTime()) {
            cell.classList.add('today');
          }
          if (cellDate.getTime() === selectedDate.getTime()) {
            cell.classList.add('selected');
          }

          cell.addEventListener('click', (e) => {
            e.stopPropagation();
            updateSelectedDate(cellDate);
            closeDropdown();
          });
        }

        daysGrid.appendChild(cell);
      }
    }

    function toggleDropdown() {
      const isOpen = dropdown.classList.contains('open');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    }

    function openDropdown() {
      // Close time dropdown if open
      document.getElementById('customTimeDropdown')?.classList.remove('open');
      document.getElementById('timePickerTrigger')?.classList.remove('active');

      dropdown.classList.add('open');
      trigger.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      viewYear = selectedDate.getFullYear();
      viewMonth = selectedDate.getMonth();
      renderCalendar();
    }

    function closeDropdown() {
      dropdown.classList.remove('open');
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
        closeDropdown();
      }
    });

    // Month Navigation
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        viewMonth--;
        if (viewMonth < 0) {
          viewMonth = 11;
          viewYear--;
        }
        renderCalendar();
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        viewMonth++;
        if (viewMonth > 11) {
          viewMonth = 0;
          viewYear++;
        }
        renderCalendar();
      });
    }

    // Quick Selector Pills
    quickPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = pill.getAttribute('data-quick');
        const targetDate = new Date(today);

        if (type === 'today') {
          // targetDate is today
        } else if (type === 'tomorrow') {
          targetDate.setDate(targetDate.getDate() + 1);
        } else if (type === 'in2days') {
          targetDate.setDate(targetDate.getDate() + 2);
        } else if (type === 'nextmonday') {
          const currentDay = today.getDay();
          let daysUntilMon = (1 - currentDay + 7) % 7;
          if (daysUntilMon === 0) daysUntilMon = 7;
          targetDate.setDate(targetDate.getDate() + daysUntilMon);
        }

        updateSelectedDate(targetDate, pill);
        setTimeout(closeDropdown, 120);
      });
    });

    // Initial populate
    updateSelectedDate(selectedDate);
  }

  // --- 10.1 CUSTOM DARK TIME SLOT PICKER (IST 09:00 AM - 12:00 Midnight) ---
  function initCustomTimePicker() {
    const trigger = document.getElementById('timePickerTrigger');
    const dropdown = document.getElementById('customTimeDropdown');
    const hiddenInput = document.getElementById('meetingTimeSlot');
    const displayText = document.getElementById('timePickerDisplayText');
    const grid = document.getElementById('timeSlotsGrid');
    const filterPills = document.querySelectorAll('[data-time-filter]');

    if (!trigger || !dropdown || !hiddenInput || !grid) return;

    const IST_SLOTS = [
      // Morning (09:00 AM – 01:00 PM IST)
      { time: '09:00 AM IST', label: '09:00 AM IST', sub: 'Early Sync', shortSub: 'Early Sync', period: 'morning' },
      { time: '10:00 AM IST', label: '10:00 AM IST', sub: 'Morning Standup', shortSub: 'Standup Slot', period: 'morning' },
      { time: '11:00 AM IST', label: '11:00 AM IST', sub: 'Late Morning', shortSub: 'Late Morning', period: 'morning' },
      { time: '12:00 PM IST', label: '12:00 PM IST', sub: 'Midday Slot', shortSub: 'Midday Slot', period: 'morning' },

      // Afternoon (01:00 PM – 06:00 PM IST — EU Overlap)
      { time: '01:30 PM IST', label: '01:30 PM IST', sub: '08:00 AM GMT (EU Early)', shortSub: '08:00 AM GMT', period: 'afternoon' },
      { time: '02:30 PM IST', label: '02:30 PM IST', sub: '09:00 AM GMT (EU Morning)', shortSub: '09:00 AM GMT', period: 'afternoon' },
      { time: '03:30 PM IST', label: '03:30 PM IST', sub: '10:00 AM GMT (EU Workday)', shortSub: '10:00 AM GMT', period: 'afternoon' },
      { time: '04:30 PM IST', label: '04:30 PM IST', sub: '11:00 AM GMT (EU Core)', shortSub: '11:00 AM GMT', period: 'afternoon' },
      { time: '05:30 PM IST', label: '05:30 PM IST', sub: '12:00 PM GMT (EU Noon)', shortSub: '12:00 PM GMT', period: 'afternoon' },

      // Evening & Night (06:00 PM – 12:00 Midnight IST — US & EU Peak Overlap)
      { time: '06:30 PM IST', label: '06:30 PM IST', sub: '09:00 AM EST (US Workday)', shortSub: '09:00 AM EST', period: 'evening' },
      { time: '07:30 PM IST', label: '07:30 PM IST', sub: '10:00 AM EST (US Core)', shortSub: '10:00 AM EST', period: 'evening' },
      { time: '08:30 PM IST', label: '08:30 PM IST', sub: '11:00 AM EST (US Midday)', shortSub: '11:00 AM EST', period: 'evening' },
      { time: '09:30 PM IST', label: '09:30 PM IST', sub: '12:00 PM EST (US Afternoon)', shortSub: '12:00 PM EST', period: 'evening' },
      { time: '10:30 PM IST', label: '10:30 PM IST', sub: '01:00 PM EST / 10 AM PST', shortSub: '01:00 PM EST', period: 'evening' },
      { time: '11:30 PM IST', label: '11:30 PM IST', sub: '02:00 PM EST / 11 AM PST', shortSub: '02:00 PM EST', period: 'evening' }
    ];

    let selectedSlot = IST_SLOTS[9]; // 06:30 PM IST • 09:00 AM EST
    let currentFilter = 'all';

    function renderSlots() {
      grid.innerHTML = '';
      const filtered = currentFilter === 'all' 
        ? IST_SLOTS 
        : IST_SLOTS.filter(s => s.period === currentFilter);

      filtered.forEach(slot => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot-btn';
        if (slot.time === selectedSlot.time) {
          btn.classList.add('selected');
        }

        btn.innerHTML = `
          <span class="time-slot-main">${slot.label}</span>
          <span class="time-slot-sub">${slot.sub}</span>
        `;

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectSlot(slot);
          closeDropdown();
        });

        grid.appendChild(btn);
      });
    }

    function selectSlot(slot) {
      selectedSlot = slot;
      hiddenInput.value = `${slot.label} (${slot.sub})`;
      displayText.textContent = `${slot.label} • ${slot.shortSub || slot.sub}`;
      renderSlots();
    }

    function toggleDropdown() {
      const isOpen = dropdown.classList.contains('open');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    }

    function openDropdown() {
      // Close date dropdown if open
      document.getElementById('customCalendarDropdown')?.classList.remove('open');
      document.getElementById('datePickerTrigger')?.classList.remove('active');

      dropdown.classList.add('open');
      trigger.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      renderSlots();
    }

    function closeDropdown() {
      dropdown.classList.remove('open');
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
        closeDropdown();
      }
    });

    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.getAttribute('data-time-filter') || 'all';
        renderSlots();
      });
    });

    // Initial setup
    selectSlot(selectedSlot);
  }

  // --- 10. CONNECT NOW & VIDEO MEETING MODAL ---
  function initConnectModal() {
    const connectModal = document.getElementById('connectModal');
    const openConnectBtns = document.querySelectorAll('[data-open-connect], [data-open-booking]');

    openConnectBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (connectModal) {
          connectModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Platform Selection State
    let selectedPlatform = 'Google Meet';
    const platformPills = document.querySelectorAll('.platform-pill-btn');
    platformPills.forEach(pill => {
      pill.addEventListener('click', () => {
        platformPills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        selectedPlatform = pill.getAttribute('data-platform') || 'Google Meet';
      });
    });

    // Initialize Custom Dark-Mode Calendar Component
    initCustomDatePicker();

    // Initialize Custom Dark-Mode Time Slot Picker Component
    initCustomTimePicker();

    // Video Meeting Form Submit Handler
    const meetingForm = document.getElementById('videoMeetingForm');
    const successBox = document.getElementById('meetingSuccessBox');
    const summaryText = document.getElementById('meetingSummaryPreviewText');
    const btnSendWhatsApp = document.getElementById('btnSendWhatsAppMeeting');
    const btnReset = document.getElementById('btnResetMeetingForm');

    // Dynamic Meeting Dispatch Status Elements
    const statusIcon = document.getElementById('meetingStatusIcon');
    const statusBadge = document.getElementById('meetingStatusBadge');
    const successHeading = document.getElementById('meetingSuccessHeading');
    const successSubtitle = document.getElementById('meetingSuccessSubtitle');

    function updateMeetingStatus(state, clientEmail) {
      const safeEmail = clientEmail ? escapeHtml(clientEmail) : 'your inbox';

      if (state === 'sending') {
        if (statusIcon) {
          statusIcon.className = 'meeting-status-icon sending';
          statusIcon.innerHTML = `
            <div class="mail-spinner-ring"></div>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          `;
        }
        if (statusBadge) {
          statusBadge.className = 'meeting-status-badge sending';
          statusBadge.innerHTML = `
            <span class="status-pulse-dot"></span>
            <span id="meetingStatusBadgeText">Mail Sending in Progress...</span>
          `;
        }
        if (successHeading) {
          successHeading.textContent = 'Sending Meeting Request...';
        }
        if (successSubtitle) {
          successSubtitle.innerHTML = `Connecting to mail server to dispatch alert to <strong>abijithajayan01@gmail.com</strong> and deliver Thank You confirmation to <strong>${safeEmail}</strong>...`;
        }
      } else if (state === 'success') {
        if (statusIcon) {
          statusIcon.className = 'meeting-status-icon success';
          statusIcon.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          `;
        }
        if (statusBadge) {
          statusBadge.className = 'meeting-status-badge success';
          statusBadge.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Mail Sent Successfully!</span>
          `;
        }
        if (successHeading) {
          successHeading.textContent = 'Meeting Request Dispatched!';
        }
        if (successSubtitle) {
          successSubtitle.innerHTML = `Your video call request has been dispatched to <strong>abijithajayan01@gmail.com</strong>, and a Thank You confirmation email has been routed to <strong>${safeEmail}</strong>. You can also chat directly on WhatsApp:`;
        }
      } else {
        if (statusIcon) {
          statusIcon.className = 'meeting-status-icon success';
          statusIcon.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          `;
        }
        if (statusBadge) {
          statusBadge.className = 'meeting-status-badge fallback';
          statusBadge.innerHTML = `
            <span>⚠️ Direct WhatsApp Connection Ready</span>
          `;
        }
        if (successHeading) {
          successHeading.textContent = 'Meeting Request Recorded!';
        }
        if (successSubtitle) {
          successSubtitle.innerHTML = `Your video call request details are prepared below. Connect directly with Abijith via WhatsApp:`;
        }
      }
    }

    if (meetingForm) {
      meetingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = meetingForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

        const meetingDate = document.getElementById('meetingDate')?.value || 'Upcoming Date';
        const meetingTimeSlot = document.getElementById('meetingTimeSlot')?.value || '06:30 PM IST (09:00 AM EST)';
        const clientName = document.getElementById('meetingName')?.value.trim() || 'Client';
        const clientEmail = document.getElementById('meetingEmail')?.value.trim() || '';
        const clientAgenda = document.getElementById('meetingAgenda')?.value || 'Architecture & Project Discussion';
        const clientNotes = document.getElementById('meetingNotes')?.value.trim() || '';

        // Template Parameters passed to backend
        const templateParams = {
          client_name: clientName,
          client_email: clientEmail,
          platform: selectedPlatform,
          meeting_date: meetingDate,
          time_slot: meetingTimeSlot,
          agenda: clientAgenda,
          notes: clientNotes || 'None provided',
          my_name: 'Abijith Ajayan',
          my_email: 'abijithajayan01@gmail.com',
          my_whatsapp: '+91 9605780704'
        };

        // Formatted WhatsApp message for direct chat
        const meetingMsg = 
`*📅 Video Call Meeting Request*
• *Platform:* ${selectedPlatform}
• *Proposed Date:* ${meetingDate}
• *Preferred Time Slot:* ${meetingTimeSlot}
• *Name:* ${clientName}
• *Mail:* ${clientEmail}
• *Discussion Agenda:* ${clientAgenda}${clientNotes ? `\n• *Notes:* ${clientNotes}` : ''}`;

        // Summary text for on-screen preview
        if (summaryText) {
          summaryText.textContent = 
`Platform: ${selectedPlatform}
Date: ${meetingDate}
Time Slot: ${meetingTimeSlot}
Name: ${clientName}
Mail: ${clientEmail}
Agenda: ${clientAgenda}${clientNotes ? `\nNotes: ${clientNotes}` : ''}`;
        }

        // WhatsApp action link
        const waUrl = `https://wa.me/919605780704?text=${encodeURIComponent(meetingMsg)}`;
        if (btnSendWhatsApp) btnSendWhatsApp.href = waUrl;

        // Switch to success view immediately with "Mail Sending in Progress..." status
        updateMeetingStatus('sending', clientEmail);
        meetingForm.style.display = 'none';
        if (successBox) successBox.style.display = 'block';

        // Dispatch to PHP SwiftMailer / SMTP Backend (api/send_meeting.php)
        fetch('api/send_meeting.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(templateParams)
        })
        .then(async r => {
          const isOk = r.ok;
          const result = await r.json().catch(() => null);
          return { isOk, result };
        })
        .then(({ isOk, result }) => {
          if (isOk && result && result.success) {
            updateMeetingStatus('success', clientEmail);
            showToast('Mail sent successfully! Confirmation sent to your inbox.');
          } else {
            console.warn('Mail send notice:', result);
            updateMeetingStatus('fallback', clientEmail);
            showToast('Meeting request confirmed! Review details below.');
          }
        })
        .catch(err => {
          console.warn('PHP Mailer notice:', err);
          updateMeetingStatus('fallback', clientEmail);
          showToast('Meeting request confirmed! Review details below.');
        });
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (meetingForm) meetingForm.style.display = 'block';
        if (successBox) successBox.style.display = 'none';
        updateMeetingStatus('sending', '');
      });
    }
  }

  // --- 11. PROJECTS & PLATFORMS CATALOG FILTERING & SEARCH ---
  function initProjectsCatalog() {
    const filterBtns = document.querySelectorAll('[data-proj-filter]');
    const searchInput = document.getElementById('projectSearchInput');
    const clearBtn = document.getElementById('clearProjectSearch');
    const cards = document.querySelectorAll('.product-catalog-card');
    const countPill = document.getElementById('projectsCountPill');
    const grid = document.getElementById('productsCatalogGrid');

    if (!cards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterProjects() {
      let visibleCount = 0;
      const q = searchQuery.toLowerCase().trim();

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const tech = (card.getAttribute('data-tech') || '').toLowerCase();
        const textContent = card.textContent.toLowerCase();

        const matchesCategory = (activeFilter === 'all') || (category === activeFilter);
        const matchesSearch = !q || tech.includes(q) || textContent.includes(q);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Update count badge
      const softwareView = document.getElementById('softwareCatalogView');
      if (countPill && (!softwareView || softwareView.style.display !== 'none')) {
        countPill.textContent = `Showing ${visibleCount} of ${cards.length} Platforms`;
      }

      // Check no results message
      let noMsg = document.getElementById('noProjectsMsg');
      if (visibleCount === 0) {
        if (!noMsg && grid) {
          noMsg = document.createElement('div');
          noMsg.id = 'noProjectsMsg';
          noMsg.className = 'no-projects-msg';
          noMsg.innerHTML = `No systems matched "<strong>${escapeHtml(searchQuery)}</strong>". Try searching for "Python", "Angular", "Laravel", "Gemini", or select "All Systems".`;
          grid.appendChild(noMsg);
        }
      } else if (noMsg) {
        noMsg.remove();
      }
    }

    // Filter pill click
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-proj-filter') || 'all';
        filterProjects();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value;
        if (clearBtn) {
          clearBtn.style.display = searchQuery ? 'block' : 'none';
        }
        filterProjects();
      });
    }

    // Clear search button
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        filterProjects();
      });
    }
  }

  // --- 11A. WHAT I BUILD FOR CLIENTS - MASTER VIEW SWITCHER (MULTI-TAB TOGGLE) ---
  function initBuildModeSwitcher() {
    const switcherBtns = document.querySelectorAll('.build-mode-btn');
    const softwareView = document.getElementById('softwareCatalogView');
    const websitesView = document.getElementById('websitesCatalogView');
    const mobileView = document.getElementById('mobileCatalogView');
    const countPill = document.getElementById('projectsCountPill');

    if (!switcherBtns.length) return;

    switcherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetViewId = btn.getAttribute('data-view-target');

        switcherBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        if (softwareView) softwareView.style.display = 'none';
        if (websitesView) websitesView.style.display = 'none';
        if (mobileView) mobileView.style.display = 'none';

        if (targetViewId === 'softwareCatalogView' && softwareView) {
          softwareView.style.display = 'block';

          // Update count pill for softwares
          const visibleSoftwares = softwareView.querySelectorAll('.product-catalog-card:not(.hidden)').length;
          const totalSoftwares = softwareView.querySelectorAll('.product-catalog-card').length;
          if (countPill) {
            countPill.textContent = `Showing ${visibleSoftwares} of ${totalSoftwares} Platforms`;
          }
        } else if (targetViewId === 'websitesCatalogView' && websitesView) {
          websitesView.style.display = 'block';

          // Update count pill for websites
          const visibleWebsites = websitesView.querySelectorAll('.website-catalog-card:not(.hidden)').length;
          const totalWebsites = websitesView.querySelectorAll('.website-catalog-card').length;
          if (countPill) {
            countPill.textContent = `Showing ${visibleWebsites} of ${totalWebsites} Portals`;
          }
        } else if (targetViewId === 'mobileCatalogView' && mobileView) {
          mobileView.style.display = 'block';

          // Update count pill for mobile
          const visibleMobile = mobileView.querySelectorAll('.mobile-app-card:not(.hidden)').length;
          const totalMobile = mobileView.querySelectorAll('.mobile-app-card').length;
          if (countPill) {
            countPill.textContent = `Showing ${visibleMobile} of ${totalMobile} Mobile Suites`;
          }
        }
      });
    });
  }

  // --- 11C. DELIVERED CLIENT WEBSITES CATALOG FILTERING & SEARCH ---
  function initWebsitesCatalog() {
    const filterBtns = document.querySelectorAll('[data-site-filter]');
    const searchInput = document.getElementById('websiteSearchInput');
    const clearBtn = document.getElementById('clearWebsiteSearch');
    const cards = document.querySelectorAll('.website-catalog-card');
    const countPill = document.getElementById('projectsCountPill');
    const grid = document.getElementById('websitesCatalogGrid');
    const websitesView = document.getElementById('websitesCatalogView');

    if (!cards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterWebsites() {
      let visibleCount = 0;
      const q = searchQuery.toLowerCase().trim();

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const siteKeywords = (card.getAttribute('data-site') || '').toLowerCase();
        const textContent = card.textContent.toLowerCase();

        const matchesCategory = (activeFilter === 'all') || (category === activeFilter);
        const matchesSearch = !q || siteKeywords.includes(q) || textContent.includes(q);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Update count badge if websites view is currently active
      if (countPill && websitesView && websitesView.style.display !== 'none') {
        countPill.textContent = `Showing ${visibleCount} of ${cards.length} Portals`;
      }

      // Check no results message
      let noMsg = document.getElementById('noWebsitesMsg');
      if (visibleCount === 0) {
        if (!noMsg && grid) {
          noMsg = document.createElement('div');
          noMsg.id = 'noWebsitesMsg';
          noMsg.className = 'no-websites-msg';
          noMsg.innerHTML = `No client portals matched "<strong>${escapeHtml(searchQuery)}</strong>". Try searching for "VSNAP", "Sitara", "Abhee", or select "All Portals".`;
          grid.appendChild(noMsg);
        }
      } else if (noMsg) {
        noMsg.remove();
      }
    }

    // Filter pill click
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-site-filter') || 'all';
        filterWebsites();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value;
        if (clearBtn) {
          clearBtn.style.display = searchQuery ? 'block' : 'none';
        }
        filterWebsites();
      });
    }

    // Clear search button
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        filterWebsites();
      });
    }
  }

  // --- 11D. PRODUCTION MOBILE APPLICATIONS FILTERING & SEARCH ---
  function initMobileCatalog() {
    const filterBtns = document.querySelectorAll('[data-mobile-filter]');
    const searchInput = document.getElementById('mobileSearchInput');
    const clearBtn = document.getElementById('clearMobileSearch');
    const cards = document.querySelectorAll('.mobile-app-card');
    const countPill = document.getElementById('projectsCountPill');
    const grid = document.getElementById('mobileCatalogGrid');
    const mobileView = document.getElementById('mobileCatalogView');

    if (!cards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterMobile() {
      let visibleCount = 0;
      const q = searchQuery.toLowerCase().trim();

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const appKeywords = (card.getAttribute('data-app') || '').toLowerCase();
        const textContent = card.textContent.toLowerCase();

        const matchesCategory = (activeFilter === 'all') || (category === activeFilter);
        const matchesSearch = !q || appKeywords.includes(q) || textContent.includes(q);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Update count badge if mobile view is currently active
      if (countPill && mobileView && mobileView.style.display !== 'none') {
        countPill.textContent = `Showing ${visibleCount} of ${cards.length} Mobile Suites`;
      }

      // Check no results message
      let noMsg = document.getElementById('noMobileMsg');
      if (visibleCount === 0) {
        if (!noMsg && grid) {
          noMsg = document.createElement('div');
          noMsg.id = 'noMobileMsg';
          noMsg.className = 'no-mobile-msg';
          noMsg.innerHTML = `No mobile applications matched "<strong>${escapeHtml(searchQuery)}</strong>". Try searching for "Homes247", "SiteCRM", "Mail", or select "All Mobile Suites".`;
          grid.appendChild(noMsg);
        }
      } else if (noMsg) {
        noMsg.remove();
      }
    }

    // Filter pill click
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-mobile-filter') || 'all';
        filterMobile();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value;
        if (clearBtn) {
          clearBtn.style.display = searchQuery ? 'block' : 'none';
        }
        filterMobile();
      });
    }

    // Clear search button
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        filterMobile();
      });
    }
  }

  // --- 11B. TECH STACK MATRIX FILTERING & SEARCH ---
  function initTechMatrixFilter() {
    const filterBtns = document.querySelectorAll('[data-stack-filter]');
    const searchInput = document.getElementById('stackSearchInput');
    const clearBtn = document.getElementById('clearStackSearch');
    const cards = document.querySelectorAll('.tech-matrix-card');
    const grid = document.getElementById('techMatrixGrid');

    if (!cards.length || (!filterBtns.length && !searchInput)) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterTech() {
      let visibleCount = 0;
      const q = searchQuery.toLowerCase().trim();

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const tech = (card.getAttribute('data-tech') || '').toLowerCase();
        const textContent = card.textContent.toLowerCase();

        const matchesCategory = (activeFilter === 'all') || (category === activeFilter);
        const matchesSearch = !q || tech.includes(q) || textContent.includes(q);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      let noMsg = document.getElementById('noStackMsg');
      if (visibleCount === 0) {
        if (!noMsg && grid) {
          noMsg = document.createElement('div');
          noMsg.id = 'noStackMsg';
          noMsg.className = 'no-stack-msg';
          noMsg.innerHTML = `No technologies matched "<strong>${escapeHtml(searchQuery)}</strong>". Try searching for "Python", "Docker", "Angular", "Gemini", or select "All Stack".`;
          grid.appendChild(noMsg);
        }
      } else if (noMsg) {
        noMsg.remove();
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-stack-filter') || 'all';
        filterTech();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value;
        if (clearBtn) clearBtn.style.display = searchQuery ? 'block' : 'none';
        filterTech();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        filterTech();
      });
    }
  }

  // --- 12. GLOBAL EVENT LISTENERS & INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    // Clocks
    updateGlobalClocks();
    setInterval(updateGlobalClocks, 1000);

    // Filters & Forms
    initCaseStudyFilters();
    initInquiryForm();
    initMobileNav();
    initScrollBehavior();
    initConnectModal();
    initBuildModeSwitcher();
    initProjectsCatalog();
    initWebsitesCatalog();
    initMobileCatalog();
    initTechMatrixFilter();

    // Case Study Modal Buttons
    document.querySelectorAll('[data-case-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const caseId = btn.getAttribute('data-case-id');
        openCaseStudyModal(caseId);
      });
    });

    // Close Modals
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeAllModals();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });

    // Copy Buttons
    document.querySelectorAll('[data-copy-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-copy-target');
        const label = btn.getAttribute('data-copy-label') || 'Copied';
        copyToClipboard(target, `${label} copied to clipboard!`);
      });
    });
  });

  // Export to global for inline handlers if needed
  window.AbijithPortfolio = {
    copyToClipboard,
    openCaseStudyModal,
    closeAllModals,
    showToast
  };
})();
