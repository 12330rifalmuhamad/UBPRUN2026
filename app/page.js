"use client";

import { useState, useEffect } from "react";
import SizeRecommender from "@/components/SizeRecommender";

export default function Home() {
  const [selectedJerseySize, setSelectedJerseySize] = useState("");
  const [showcaseTab, setShowcaseTab] = useState("medal"); // "medal" or "jersey"
  const [selectedMedalType, setSelectedMedalType] = useState("gold"); // "gold" or "silver"
  const [selectedJerseyColor, setSelectedJerseyColor] = useState("yellow");

  const jerseyColors = [
    { id: "yellow", name: "Yellow Fusion", path: "/jersey-yellow.jpg", colorCode: "#e5b700" },
    { id: "green", name: "Lime Neon", path: "/jersey-green.jpg", colorCode: "#5ac500" },
    { id: "blue", name: "Cyan Spark", path: "/jersey-blue.jpg", colorCode: "#00aed6" },
    { id: "pink", name: "Magenta Pulse", path: "/jersey-pink.jpg", colorCode: "#c4135e" },
  ];

  const medalData = {
    gold: {
      name: "Gold Finisher Medal (5K)",
      path: "/medal-gold.png",
      tag: "5K Finisher Edition",
      badgeColor: "#d97706",
    },
    silver: {
      name: "Silver Finisher Medal (5K)",
      path: "/medal-silver.png",
      tag: "5K Finisher Edition",
      badgeColor: "#64748b",
    },
  };

  // Countdown Timer state (Targeting Dec 6, 2026 06:00:00)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("Dec 6, 2026 06:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectSizeInRecommender = (sizeStr) => {
    setSelectedJerseySize(sizeStr);
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerText = `Ukuran Jersey ${sizeStr} terpilih.`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  return (
    <div className="landing-wrapper">
      <style jsx>{`
        .landing-wrapper {
          min-height: 100vh;
          position: relative;
          color: var(--text-primary);
          background-color: var(--bg-color);
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          width: 100%;
          padding: 0 24px;
        }

        /* ---------------------------------
           Sticky Navigation
        --------------------------------- */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 68px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          z-index: 100;
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 0 24px;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 16px;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-brand-logo {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          object-fit: cover;
          border: 1px solid var(--border-subtle);
        }
        .nav-brand-text {
          display: flex;
          flex-direction: column;
        }
        .nav-logo-title {
          font-family: var(--font-outfit);
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .nav-logo-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .nav-links {
          display: flex;
          gap: clamp(10px, 1.6vw, 22px);
          align-items: center;
          flex-wrap: nowrap;
        }
        @media (max-width: 960px) {
          .nav-links {
            display: none;
          }
        }
        .nav-link {
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.15s ease;
          padding: 6px 4px;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        .nav-btn-wrapper {
          flex-shrink: 0;
        }
        .nav-cta {
          padding: 8px 16px;
          font-size: 0.84rem;
        }

        /* ---------------------------------
           Hero Section (Authentic Athletic)
        --------------------------------- */
        .hero {
          min-height: 88vh;
          display: flex;
          align-items: center;
          padding: 120px 0 60px;
          position: relative;
          background: 
            linear-gradient(to bottom, rgba(255, 255, 255, 0.84) 0%, rgba(255, 255, 255, 0.94) 75%, rgba(255, 255, 255, 1) 100%),
            url('/bg-runners-route.jpg') no-repeat center 28%;
          background-size: cover;
          border-bottom: 1px solid var(--border-subtle);
        }
        .hero-inner {
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-affiliation {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-outfit);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--primary);
          background: var(--primary-light);
          border: 1px solid var(--primary-border);
          padding: 5px 14px;
          border-radius: var(--radius-xs);
          margin-bottom: 20px;
        }
        .hero-title {
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 800;
          line-height: 1.08;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .hero-title-accent {
          color: var(--accent);
          display: inline-block;
        }
        .hero-description {
          font-size: clamp(0.98rem, 1.8vw, 1.15rem);
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 680px;
          margin-bottom: 28px;
        }
        
        /* Event Spec Meta Strip */
        .hero-meta-bar {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 20px 32px;
          padding: 14px 28px;
          background: #ffffff;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-xs);
          margin-bottom: 32px;
        }
        @media (max-width: 640px) {
          .hero-meta-bar {
            grid-template-columns: 1fr;
            gap: 12px;
            width: 100%;
            text-align: left;
          }
        }
        .meta-item {
          display: flex;
          flex-direction: column;
        }
        .meta-label {
          font-family: var(--font-outfit);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 2px;
        }
        .meta-value {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Athletic Race Countdown */
        .countdown-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .countdown-header {
          font-family: var(--font-outfit);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .countdown-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 18px;
          box-shadow: var(--shadow-xs);
        }
        .countdown-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 58px;
        }
        .countdown-num {
          font-family: var(--font-outfit);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .countdown-unit {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }
        .countdown-divider {
          font-family: var(--font-outfit);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--border-strong);
          line-height: 1;
          margin-bottom: 12px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ---------------------------------
           Common Section Styles
        --------------------------------- */
        .section {
          padding: 72px 0;
          width: 100%;
          position: relative;
        }
        .section-alt {
          background-color: var(--bg-subtle);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }
        #latar-belakang {
          background: 
            linear-gradient(to right, rgba(248, 250, 252, 0.95) 0%, rgba(248, 250, 252, 0.92) 50%, rgba(248, 250, 252, 0.97) 100%),
            url('/bg-runners-action.jpg') no-repeat right center;
          background-size: cover;
        }
        .section-header {
          margin-bottom: 40px;
        }
        .section-header.center {
          text-align: center;
        }
        .section-eyebrow {
          margin-bottom: 10px;
        }
        .section-title {
          font-size: clamp(1.8rem, 3.2vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--text-primary);
        }
        .section-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-top: 8px;
          max-width: 600px;
        }
        .section-header.center .section-subtitle {
          margin-left: auto;
          margin-right: auto;
        }

        /* ---------------------------------
           About Section (Editorial & Specs)
        --------------------------------- */
        .about-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 880px) {
          .about-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        .about-text {
          font-size: 0.96rem;
          color: var(--text-secondary);
          line-height: 1.7;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .about-facts-table {
          width: 100%;
          margin-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }
        .fact-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.88rem;
        }
        .fact-key {
          width: 130px;
          flex-shrink: 0;
          font-family: var(--font-outfit);
          font-weight: 700;
          color: var(--text-primary);
        }
        .fact-val {
          color: var(--text-secondary);
        }
        .about-media-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-xs);
        }
        .about-image {
          width: 100%;
          height: 320px;
          object-fit: cover;
          display: block;
        }
        .about-media-caption {
          padding: 14px 18px;
          border-top: 1px solid var(--border-subtle);
          background: #ffffff;
        }
        .about-caption-title {
          font-family: var(--font-outfit);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .about-caption-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* ---------------------------------
           Background / Health Campaign Section
        --------------------------------- */
        .health-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 880px) {
          .health-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        .stats-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .stat-banner {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-left: 4px solid var(--accent);
          border-radius: var(--radius-sm);
          padding: 18px 20px;
          box-shadow: var(--shadow-xs);
        }
        .stat-banner.primary-accent {
          border-left-color: var(--primary);
        }
        .stat-figure-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 4px;
        }
        .stat-figure {
          font-family: var(--font-outfit);
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1;
          color: var(--text-primary);
        }
        .stat-tag {
          font-family: var(--font-outfit);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent);
        }
        .stat-banner.primary-accent .stat-tag {
          color: var(--primary);
        }
        .stat-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .stat-caption {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* ---------------------------------
           Categories Section
        --------------------------------- */
        .categories-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 780px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
        .category-panel {
          background: #ffffff;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          padding: 32px 28px;
          box-shadow: var(--shadow-xs);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .category-panel.featured {
          border-color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
        .cat-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .cat-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .cat-dist-pill {
          font-family: var(--font-outfit);
          font-weight: 700;
          font-size: 0.82rem;
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .cat-dist-pill.runner {
          background: var(--bg-muted);
          color: var(--text-secondary);
          border: 1px solid var(--border-default);
        }
        .cat-dist-pill.speedrun {
          background: var(--accent-light);
          color: var(--accent);
          border: 1px solid var(--accent-border);
        }
        .cat-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .cat-inclusions-title {
          font-family: var(--font-outfit);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .cat-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }
        .cat-list-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .cat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          margin-top: 7px;
          flex-shrink: 0;
        }

        /* ---------------------------------
           Facilities & Interactive Showcase
        --------------------------------- */
        .facilities-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: stretch;
        }
        @media (max-width: 860px) {
          .facilities-layout {
            grid-template-columns: 1fr;
          }
        }
        .facilities-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 28px 24px;
          box-shadow: var(--shadow-xs);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .facilities-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .facilities-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .facility-checklist {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .facility-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: var(--bg-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .facility-check-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        /* Showcase Module */
        .showcase-module {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-xs);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .segmented-tabs {
          display: flex;
          width: 100%;
          background: var(--bg-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 3px;
          gap: 3px;
          margin-bottom: 20px;
        }
        .tab-btn {
          flex: 1;
          padding: 8px 12px;
          border: none;
          background: transparent;
          font-family: var(--font-outfit);
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-secondary);
          border-radius: var(--radius-xs);
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
          text-align: center;
        }
        .tab-btn.active {
          background: #ffffff;
          color: var(--primary);
          font-weight: 700;
          box-shadow: var(--shadow-xs);
        }
        .showcase-viewport {
          width: 100%;
          height: 320px;
          background: var(--bg-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          margin-bottom: 16px;
        }
        .showcase-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .variant-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .pill-toggle-btn {
          padding: 6px 14px;
          font-family: var(--font-outfit);
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-default);
          background: #ffffff;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .pill-toggle-btn.active {
          border-color: var(--primary);
          background: var(--primary-light);
          color: var(--primary);
          font-weight: 700;
        }
        .swatch-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .color-swatch-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px var(--border-default);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          padding: 0;
        }
        .color-swatch-circle.active {
          transform: scale(1.15);
          box-shadow: 0 0 0 2px var(--primary);
        }
        .showcase-caption {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.5;
          margin-top: 4px;
        }

        /* ---------------------------------
           Community Registration Section
        --------------------------------- */
        .community-container {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 40px 32px;
          box-shadow: var(--shadow-xs);
        }
        .community-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 32px;
        }
        .community-tiers {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .community-tiers {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .community-tiers {
            grid-template-columns: 1fr;
          }
        }
        .tier-box {
          background: var(--bg-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 20px 16px;
          text-align: center;
        }
        .tier-volume {
          font-family: var(--font-outfit);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .tier-discount {
          font-family: var(--font-outfit);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--primary);
          margin: 6px 0;
          line-height: 1;
        }
        .tier-perk {
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .community-footer-note {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.6;
          text-align: center;
          max-width: 680px;
          margin: 0 auto;
        }
        .community-action-row {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }

        /* ---------------------------------
           Pre-Footer Registration Portal Card
        --------------------------------- */
        .portal-banner {
          position: relative;
          background: 
            linear-gradient(135deg, rgba(55, 48, 163, 0.88), rgba(30, 27, 75, 0.94)),
            url('/bg-runners-finish.jpg') no-repeat center 35%;
          background-size: cover;
          color: #ffffff;
          border-radius: var(--radius-md);
          padding: 44px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 820px) {
          .portal-banner {
            flex-direction: column;
            text-align: center;
            padding: 32px 24px;
          }
        }
        .portal-content {
          max-width: 580px;
        }
        .portal-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .portal-desc {
          font-size: 0.94rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
        }
        .portal-action {
          flex-shrink: 0;
        }
        .btn-portal {
          background: #ffffff;
          color: var(--primary);
          border: 1px solid #ffffff;
          padding: 13px 26px;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: var(--radius-sm);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.15s ease, transform 0.15s ease;
        }
        .btn-portal:hover {
          background: var(--primary-light);
        }

        /* ---------------------------------
           Contact Section
        --------------------------------- */
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 880px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        .contact-cell {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 18px 16px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: var(--shadow-xs);
          transition: border-color 0.15s ease;
        }
        .contact-cell:hover {
          border-color: var(--primary);
        }
        .contact-role {
          font-family: var(--font-outfit);
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .contact-name {
          font-size: 0.94rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .contact-address {
          font-size: 0.82rem;
          color: var(--primary);
          word-break: break-all;
        }

        /* ---------------------------------
           Sponsors & Partners Running Text
        --------------------------------- */
        .partners-block {
          margin-top: 50px;
          padding-top: 40px;
          border-top: 1px solid var(--border-subtle);
          text-align: center;
          overflow: hidden;
        }
        .partners-eyebrow {
          font-family: var(--font-outfit);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 6px 0;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marqueeScroll 28s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .partner-chip {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 8px 18px;
          font-family: var(--font-outfit);
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          box-shadow: var(--shadow-xs);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .partner-chip::before {
          content: "";
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.85;
        }

        /* ---------------------------------
           Footer
        --------------------------------- */
        .footer {
          padding: 40px 24px;
          background: #ffffff;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.84rem;
          color: var(--text-muted);
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-brand {
          font-family: var(--font-outfit);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .footer-back-to-top {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 600;
        }
        .footer-back-to-top:hover {
          color: var(--primary);
        }

        /* ---------------------------------
           Toast Notification
        --------------------------------- */
        :global(.toast-notification) {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: var(--text-primary);
          color: #ffffff;
          font-family: var(--font-inter);
          font-weight: 500;
          font-size: 0.85rem;
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-md);
          z-index: 1000;
          animation: toastIn 0.2s ease forwards;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Navigation Header */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-inner">
            <a href="#" className="nav-brand">
              <img
                src="/logo.png"
                alt="Logo UBP RUN 2026"
                className="nav-brand-logo"
              />
              <div className="nav-brand-text">
                <span className="nav-logo-title">UBP RUN 2026</span>
                <span className="nav-logo-sub">Fakultas Farmasi UBP Karawang</span>
              </div>
            </a>

            <div className="nav-links">
              <a href="#about" className="nav-link">Tentang</a>
              <a href="#latar-belakang" className="nav-link">Latar Belakang</a>
              <a href="#kategori" className="nav-link">Kategori</a>
              <a href="#fasilitas" className="nav-link">Fasilitas</a>
              <a href="#size-chart" className="nav-link">Size Chart</a>
              <a href="#komunitas" className="nav-link">Komunitas</a>
              <a href="#contact" className="nav-link">Kontak</a>
            </div>

            <div className="nav-btn-wrapper">
              <a
                href="https://wanatix.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary nav-cta"
              >
                Beli Tiket Sekarang!
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="eyebrow-tag section-eyebrow">
              <span>Universitas Buana Perjuangan Karawang</span>
            </div>

            <h1 className="hero-title">
              Together We Run <span className="hero-title-accent">&amp; Rise!</span>
            </h1>

            <p className="hero-description">
              Ajang lari rekreasional &amp; kompetitif di Karawang yang memadukan semangat gaya hidup aktif, parade seni Jaipong tradisional, dan pemberdayaan UMKM lokal.
            </p>

            {/* Event Specification Strip */}
            <div className="hero-meta-bar">
              <div className="meta-item">
                <span className="meta-label">Hari &amp; Tanggal</span>
                <span className="meta-value">Minggu, 6 Desember 2026</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Waktu Start</span>
                <span className="meta-value">06:00 WIB</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Lokasi</span>
                <span className="meta-value">Karawang, Jawa Barat</span>
              </div>
            </div>

            {/* Live Race Countdown */}
            <div className="countdown-container">
              <span className="countdown-header">Menuju Garis Start</span>
              <div className="countdown-bar">
                <div className="countdown-block">
                  <span className="countdown-num">{String(timeLeft.days).padStart(2, "0")}</span>
                  <span className="countdown-unit">Hari</span>
                </div>
                <span className="countdown-divider">:</span>
                <div className="countdown-block">
                  <span className="countdown-num">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="countdown-unit">Jam</span>
                </div>
                <span className="countdown-divider">:</span>
                <div className="countdown-block">
                  <span className="countdown-num">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="countdown-unit">Menit</span>
                </div>
                <span className="countdown-divider">:</span>
                <div className="countdown-block">
                  <span className="countdown-num">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="countdown-unit">Detik</span>
                </div>
              </div>
            </div>

            {/* Action Group */}
            <div className="hero-actions">
              <a
                href="https://wanatix.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Daftar Sekarang di Wanatix
              </a>
              <a href="#kategori" className="btn-secondary">
                Lihat Kategori Lari
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. ABOUT SECTION */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-layout">
            <div className="about-text">
              <div>
                <span className="eyebrow-tag section-eyebrow">Profil Acara</span>
                <h2 className="section-title">Gerakan Lari untuk Karawang yang Lebih Bugar</h2>
              </div>

              <p>
                <strong>UBP RUN 2026</strong> adalah inisiatif olahraga dan edukasi kesehatan publik yang diselenggarakan oleh mahasiswa Universitas Buana Perjuangan (UBP) Karawang di bawah naungan <strong>Fakultas Farmasi, Departemen Farmakologi &amp; Farmasi Klinis</strong>.
              </p>

              <p>
                Mengusung tema <em>&quot;Run Together, Live Healthier!&quot;</em>, ajang ini dirancang inklusif untuk seluruh lapisan masyarakat—mulai dari pelari pemula, keluarga, hingga atlet kompetitif. Selain rute lari yang aman dan nyaman, peserta disuguhkan pertunjukan tari Jaipong Sunda, penyambutan Duta Pariwisata, panggung hiburan musik live, dan festival bazar UMKM Karawang.
              </p>

              <div className="about-facts-table">
                <div className="fact-row">
                  <span className="fact-key">Penyelenggara</span>
                  <span className="fact-val">Fakultas Farmasi, Universitas Buana Perjuangan Karawang</span>
                </div>
                <div className="fact-row">
                  <span className="fact-key">Format Acara</span>
                  <span className="fact-val">5K Fun Run (Runner) &amp; 5K Competitive (Speed Run)</span>
                </div>
                <div className="fact-row">
                  <span className="fact-key">Titik Start/Finish</span>
                  <span className="fact-val">Kawasan Kampus UBP Karawang, Jawa Barat</span>
                </div>
                <div className="fact-row">
                  <span className="fact-key">Atraksi Acara</span>
                  <span className="fact-val">Jaipong Tradisional, Duta Pariwisata, Bazar UMKM, Live Music &amp; Doorprize</span>
                </div>
              </div>
            </div>

            <div className="about-media-card">
              <img
                src="/about-shoes.png"
                alt="Persiapan Sepatu Lari UBP RUN 2026"
                className="about-image"
              />
              <div className="about-media-caption">
                <div className="about-caption-title">Run Together, Live Healthier!</div>
                <div className="about-caption-desc">Membangun kebiasaan preventif melalui langkah lari bersama komunitas.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATAR BELAKANG & TUJUAN KESEHATAN */}
      <section className="section section-alt" id="latar-belakang">
        <div className="container">
          <div className="health-grid">
            <div className="stats-column">
              <div className="stat-banner">
                <div className="stat-figure-row">
                  <span className="stat-figure">70×</span>
                  <span className="stat-tag">Peningkatan Kasus</span>
                </div>
                <h3 className="stat-title">Lonjakan Diabetes Usia Muda</h3>
                <p className="stat-caption">
                  Perubahan pola makan tinggi gula dan gaya hidup kurang gerak telah memicu lonjakan risiko diabetes melitus tipe 2 pada generasi muda Indonesia.
                </p>
              </div>

              <div className="stat-banner">
                <div className="stat-figure-row">
                  <span className="stat-figure">10.7%</span>
                  <span className="stat-tag">Prevalensi Nasional</span>
                </div>
                <h3 className="stat-title">Hipertensi pada Usia 18–24 Tahun</h3>
                <p className="stat-caption">
                  Studi kesehatan mencatat satu dari sepuluh anak muda telah terdeteksi mengalami tekanan darah tinggi tanpa gejala klinis yang disadari.
                </p>
              </div>

              <div className="stat-banner primary-accent">
                <div className="stat-figure-row">
                  <span className="stat-figure">Solusi</span>
                  <span className="stat-tag">Tindakan Preventif</span>
                </div>
                <h3 className="stat-title">Olahraga Aerobik Menyenangkan</h3>
                <p className="stat-caption">
                  Aktivitas lari rekreasional secara teratur efektif meningkatkan sensitivitas insulin, menurunkan resistensi pembuluh darah, dan mengurangi stres.
                </p>
              </div>
            </div>

            <div>
              <span className="eyebrow-tag section-eyebrow">Urgensi Kesehatan</span>
              <h2 className="section-title" style={{ marginBottom: "16px" }}>
                Mengapa Kita Harus Mulai Berlari Hari Ini?
              </h2>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.96rem", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "14px" }}>
                <p>
                  Sebagai akademisi di bidang farmasi dan farmakologi klinis, kami menyadari bahwa obat terbaik bagi sindrom metabolik adalah <strong>pencegahan primer sebelum timbulnya komplikasi</strong>.
                </p>
                <p>
                  Melalui <strong>UBP RUN 2026</strong>, kami menghadirkan wadah yang merangkul masyarakat untuk mengubah aktivitas fisik dari sebuah keharusan medis menjadi momen rekreasi yang dinantikan bersama keluarga, rekan kampus, dan komunitas lari Karawang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KATEGORI ACARA */}
      <section className="section" id="kategori">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow-tag section-eyebrow">Pilihan Kategori</span>
            <h2 className="section-title">Kategori Lari UBP RUN 2026</h2>
            <p className="section-subtitle">
              Pilih format lari yang paling sesuai dengan target dan ritme kebugaran Anda.
            </p>
          </div>

          <div className="categories-grid">
            {/* Kategori 1: Runner */}
            <div className="category-panel">
              <div>
                <div className="cat-top">
                  <h3 className="cat-title">Runner</h3>
                  <span className="cat-dist-pill runner">5K Fun Run</span>
                </div>
                <p className="cat-desc">
                  Kategori lari santai untuk semua kalangan tanpa tekanan batas waktu (COT). Sangat cocok bagi pemula, keluarga, dan grup santai yang ingin menikmati suasana rute kota Karawang.
                </p>

                <div className="cat-inclusions-title">Paket Partisipasi Termasuk:</div>
                <ul className="cat-list">
                  <li className="cat-list-item">
                    <span className="cat-dot" />
                    <span>Jersey Dry-Fit eksklusif UBP RUN 2026</span>
                  </li>
                  <li className="cat-list-item">
                    <span className="cat-dot" />
                    <span>Medali finisher logam 3D berukir motif batik</span>
                  </li>
                  <li className="cat-list-item">
                    <span className="cat-dot" />
                    <span>Nomor dada (BIB number) &amp; E-Sertifikat resmi</span>
                  </li>
                  <li className="cat-list-item">
                    <span className="cat-dot" />
                    <span>Akses water station, refreshment, &amp; kupon doorprize</span>
                  </li>
                </ul>
              </div>

              <div>
                <a
                  href="https://wanatix.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: "100%" }}
                >
                  Pilih Kategori Runner di Wanatix
                </a>
              </div>
            </div>

            {/* Kategori 2: Speed Run */}
            <div className="category-panel featured">
              <div>
                <div className="cat-top">
                  <h3 className="cat-title">Speed Run</h3>
                  <span className="cat-dist-pill speedrun">5K Competitive</span>
                </div>
                <p className="cat-desc">
                  Kategori lari kompetitif terukur bagi runners yang ingin menguji ketahanan, mencatatkan Personal Best (PB), dan bersaing memperebutkan podium juara UBP RUN 2026.
                </p>

                <div className="cat-inclusions-title">Paket Partisipasi Termasuk:</div>
                <ul className="cat-list">
                  <li className="cat-list-item">
                    <span className="cat-dot" />
                    <span>Pencatatan waktu resmi &amp; perebutan podium juara</span>
                  </li>
                  <li className="cat-list-item">
                    <span className="cat-dot" />
                    <span>Jersey Dry-Fit eksklusif UBP RUN 2026</span>
                  </li>
                  <li className="cat-list-item">
                    <span className="cat-dot" />
                    <span>Medali finisher logam 3D berukir motif batik</span>
                  </li>
                  <li className="cat-list-item">
                    <span className="cat-dot" />
                    <span>Nomor dada (BIB) berpenanda, E-Sertifikat &amp; Doorprize</span>
                  </li>
                </ul>
              </div>

              <div>
                <a
                  href="https://wanatix.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                  style={{ width: "100%" }}
                >
                  Pilih Kategori Speed Run di Wanatix
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FASILITAS & SHOWCASE INTERAKTIF */}
      <section className="section section-alt" id="fasilitas">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow-tag section-eyebrow">Race Pack &amp; Fasilitas</span>
            <h2 className="section-title">Fasilitas Peserta &amp; Desain Perlengkapan</h2>
            <p className="section-subtitle">
              Setiap peserta yang terdaftar secara resmi berhak atas race pack lengkap dan medali finisher di garis finish.
            </p>
          </div>

          <div className="facilities-layout">
            {/* Left: Facilities Breakdown */}
            <div className="facilities-card">
              <div>
                <h3 className="facilities-title">Isi Race Pack &amp; Layanan Rute</h3>
                <p className="facilities-desc">
                  Standar kenyamanan dan keamanan pelari terjamin sepanjang jalannya perlombaan:
                </p>

                <div className="facility-checklist">
                  {[
                    "Medali Logam Finisher 5K Eksklusif (Cetakan 3D)",
                    "Jersey Running Bahan Dry-Fit Ringan & Nyaman",
                    "Nomor Dada Peserta (BIB Number)",
                    "E-Sertifikat Resmi UBP RUN 2026",
                    "Water Station & Refreshment Buah/Minuman",
                    "Tim Medis & First Aid Mobile di Sepanjang Rute",
                    "Pentas Seni Tari Jaipong & Live Music",
                    "Peluang Memenangkan Hadiah Utama Doorprize",
                  ].map((item, idx) => (
                    <div className="facility-row" key={idx}>
                      <svg className="facility-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                * Pengambilan race pack (RPC) akan diinformasikan lebih lanjut melalui akun resmi Instagram @ubprun.2026.
              </div>
            </div>

            {/* Right: Dual Interactive Showcase */}
            <div className="showcase-module">
              {/* Segmented Tab Controls */}
              <div className="segmented-tabs">
                <button
                  className={`tab-btn ${showcaseTab === "medal" ? "active" : ""}`}
                  onClick={() => setShowcaseTab("medal")}
                >
                  Medali Finisher 3D
                </button>
                <button
                  className={`tab-btn ${showcaseTab === "jersey" ? "active" : ""}`}
                  onClick={() => setShowcaseTab("jersey")}
                >
                  Jersey Dry-Fit Resmi
                </button>
              </div>

              {/* View 1: Medal Showcase */}
              {showcaseTab === "medal" && (
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div className="showcase-viewport">
                    <img
                      src={medalData[selectedMedalType].path}
                      alt={`Medali UBP RUN 2026 - ${medalData[selectedMedalType].name}`}
                      className="showcase-img"
                    />
                  </div>

                  <div className="variant-controls">
                    <button
                      className={`pill-toggle-btn ${selectedMedalType === "gold" ? "active" : ""}`}
                      onClick={() => setSelectedMedalType("gold")}
                    >
                      Edisi Gold Finisher
                    </button>
                    <button
                      className={`pill-toggle-btn ${selectedMedalType === "silver" ? "active" : ""}`}
                      onClick={() => setSelectedMedalType("silver")}
                    >
                      Edisi Silver Finisher
                    </button>
                  </div>

                  <p className="showcase-caption">
                    Medali logam 3D kokoh berukir motif ornamen khas Karawang dengan tali lanyard eksklusif berslogan <em>&quot;TOGETHER WE RUN &amp; RISE!&quot;</em>.
                  </p>
                </div>
              )}

              {/* View 2: Jersey Showcase */}
              {showcaseTab === "jersey" && (
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div className="showcase-viewport">
                    <img
                      src={jerseyColors.find(j => j.id === selectedJerseyColor).path}
                      alt={`Jersey UBP RUN 2026 - ${selectedJerseyColor}`}
                      className="showcase-img"
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div className="swatch-group">
                      {jerseyColors.map((j) => (
                        <button
                          key={j.id}
                          className={`color-swatch-circle ${selectedJerseyColor === j.id ? "active" : ""}`}
                          style={{ backgroundColor: j.colorCode }}
                          onClick={() => setSelectedJerseyColor(j.id)}
                          title={j.name}
                          aria-label={`Pilih varian ${j.name}`}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--text-primary)" }}>
                      {jerseyColors.find(j => j.id === selectedJerseyColor).name}
                    </span>
                  </div>

                  <p className="showcase-caption">
                    Material dry-fit berpori mikro yang sejuk, menyerap keringat optimal, dan nyaman untuk cuaca tropis Karawang.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIZE CHART SECTION */}
      <section className="section" id="size-chart">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow-tag section-eyebrow">Panduan Ukuran</span>
            <h2 className="section-title">Ukuran Jersey &amp; Kalkulator Ukuran</h2>
            <p className="section-subtitle">
              Gunakan kalkulator di bawah ini untuk mencocokkan ukuran lebar dan panjang pakaian Anda sebelum mendaftar.
            </p>
          </div>

          <SizeRecommender
            onSelectSize={handleSelectSizeInRecommender}
            initialSelectedSize={selectedJerseySize}
          />
        </div>
      </section>

      {/* 7. PROMO KOMUNITAS LARI
      <section className="section section-alt" id="komunitas">
        <div className="container">
          <div className="community-container">
            <div className="community-header">
              <span className="eyebrow-tag section-eyebrow">Pendaftaran Kolektif</span>
              <h2 className="section-title" style={{ fontSize: "1.9rem", marginBottom: "8px" }}>
                Promo Rombongan &amp; Komunitas Lari
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Ajak klub lari, instansi, atau komunitas kampus Anda untuk mendapatkan potongan harga bertingkat dan kuota tiket gratis.
              </p>
            </div>

            <div className="community-tiers">
              <div className="tier-box">
                <div className="tier-volume">Beli 5 Tiket</div>
                <div className="tier-discount">3%</div>
                <div className="tier-perk">Diskon Kolektif</div>
              </div>
              <div className="tier-box">
                <div className="tier-volume">Beli 10 Tiket</div>
                <div className="tier-discount">6%</div>
                <div className="tier-perk">Diskon Kolektif</div>
              </div>
              <div className="tier-box">
                <div className="tier-volume">Beli 15 Tiket</div>
                <div className="tier-discount">9%</div>
                <div className="tier-perk">+1 Tiket Gratis</div>
              </div>
              <div className="tier-box">
                <div className="tier-volume">Beli 20 Tiket</div>
                <div className="tier-discount">12%</div>
                <div className="tier-perk">+1 Tiket Gratis</div>
              </div>
            </div>

            <p className="community-footer-note">
              * Skema diskon komunitas berlaku untuk periode tiket Presale &amp; Reguler. Untuk memproses invoice kolektif dan verifikasi nama klub lari Anda, hubungi koordinator pendaftaran via WhatsApp panitia.
            </p>

            <div className="community-action-row">
              <a
                href="https://api.whatsapp.com/send?phone=6287776265066&text=Halo%20Panitia%20UBP%20RUN%202026,%20saya%20ingin%20mendaftarkan%20tiket%20kolektif%20komunitas."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Daftarkan Komunitas via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* 8. PRE-FOOTER REGISTRATION CALL TO ACTION */}
      <section className="section" id="pendaftaran-portal">
        <div className="container">
          <div className="portal-banner">
            <div className="portal-content">
              <h2 className="portal-title">Amankan Slot Larimu di Wanatix Sekarang</h2>
              <p className="portal-desc">
                Pendaftaran resmi UBP RUN 2026 dilayani secara terintegrasi melalui portal Wanatix. Pilih kategori lari Anda, tentukan ukuran jersey yang sesuai, dan selesaikan pembayaran instan via QRIS, e-wallet, atau transfer bank.
              </p>
            </div>
            <div className="portal-action">
              <a
                href="https://wanatix.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-portal"
              >
                Menuju Platform Wanatix.id
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. KONTAK & LAYANAN INFORMASI */}
      <section className="section section-alt" id="contact">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow-tag section-eyebrow">Pusat Bantuan</span>
            <h2 className="section-title">Kontak &amp; Layanan Informasi</h2>
            <p className="section-subtitle">
              Ada pertanyaan seputar pendaftaran, rute, atau kerja sama sponsorship? Tim panitia siap membantu Anda.
            </p>
          </div>

          <div className="contact-grid">
            <a
              href="https://instagram.com/ubprun.2026"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cell"
            >
              <span className="contact-role">Instagram Resmi</span>
              <span className="contact-name">@ubprun.2026</span>
              <span className="contact-address">instagram.com/ubprun.2026</span>
            </a>

            <a
              href="mailto:ubprun2026@gmail.com"
              className="contact-cell"
            >
              <span className="contact-role">Surat Elektronik</span>
              <span className="contact-name">Sekretariat Panitia</span>
              <span className="contact-address">ubprun2026@gmail.com</span>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=6287776265066"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cell"
            >
              <span className="contact-role">WhatsApp Support 1</span>
              <span className="contact-name">Dinda (Panitia)</span>
              <span className="contact-address">+62 877-7626-5066</span>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=628990681145"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cell"
            >
              <span className="contact-role">WhatsApp Support 2</span>
              <span className="contact-name">Rima (Panitia)</span>
              <span className="contact-address">+62 899-0681-145</span>
            </a>
          </div>

          {/* Partners & Sponsors Running Text */}
          <div className="partners-block">
            <div className="partners-eyebrow">Diselenggarakan &amp; Didukung Oleh</div>
            <div className="marquee-wrapper">
              <div className="marquee-track">
                {[
                  "Universitas Buana Perjuangan Karawang",
                  "Fakultas Farmasi UBP",
                  "Hydro Coco",
                  "Fotoyu",
                  "Sofasco",
                  "Primaya Hospital Karawang",
                  "Kahf",
                  "Universitas Buana Perjuangan Karawang",
                  "Fakultas Farmasi UBP",
                  "Hydro Coco",
                  "Fotoyu",
                  "Sofasco",
                  "Primaya Hospital Karawang",
                  "Kahf"
                ].map((partner, idx) => (
                  <div className="partner-chip" key={idx}>
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div>
              <div className="footer-brand">UBP RUN 2026 KARAWANG</div>
              <p style={{ marginTop: "4px", fontSize: "0.76rem" }}>
                &copy; 2026 UBP RUN 2026. Hak Cipta Dilindungi Undang-Undang. #RUNWITHUS
              </p>
            </div>
            <div>
              <a href="#" className="footer-back-to-top">Kembali ke Atas ↑</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
