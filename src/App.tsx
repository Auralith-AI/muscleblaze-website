/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Wallet, 
  ShoppingBag, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Coins, 
  QrCode,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Dumbbell,
  Flame,
  Scale,
  Zap,
  Activity,
  Sprout,
  Beef,
  Salad,
  Leaf,
  Plus,
  Milk,
  FlaskConical,
  Pill,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import mbLogo from './MB-logo.jpeg';
import hero1 from './Hero-section-images/hero-1.jpeg';
import hero2 from './Hero-section-images/hero-2.jpeg';
import hero3 from './Hero-section-images/hero-3.jpeg';
import hero4 from './Hero-section-images/hero-4.jpeg';
import hero5 from './Hero-section-images/hero-5.jpeg';

// Types
type Page = 'home' | 'products';

interface Product {
  id: number;
  name: string;
  variant: string;
  price: number;
  mrp: number;
  discount: number;
  category: string;
  goal: string;
  budget: string;
  hasFreeGift?: boolean;
  inHighDemand?: boolean;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Biozyme Performance Whey 1kg", variant: "1 kg • Rich Milk Chocolate", price: 2799, mrp: 3499, discount: 20, category: "Protein", goal: "Muscle Gain", budget: "₹2500+" },
  { id: 2, name: "Biozyme Whey PR 1kg", variant: "1 kg • Chocolate Hazelnut", price: 3299, mrp: 3999, discount: 18, category: "Protein", goal: "Muscle Gain", budget: "₹2500+" },
  { id: 3, name: "Raw Whey Protein 1kg", variant: "1 kg • Unflavoured", price: 1099, mrp: 1599, discount: 31, category: "Protein", goal: "Muscle Gain", budget: "₹999-₹2499" },
  { id: 4, name: "Super Mass Gainer 1kg", variant: "1 kg • Chocolate", price: 1299, mrp: 1799, discount: 28, category: "Weight Gain", goal: "Weight Gain", budget: "₹999-₹2499" },
  { id: 5, name: "Super Gainer XXL 1kg", variant: "1 kg • Cookies & Cream", price: 899, mrp: 1199, discount: 25, category: "Weight Gain", goal: "Weight Gain", budget: "Under ₹999" },
  { id: 6, name: "CreAMP Creatine Mono 250g", variant: "250 g • Unflavoured", price: 549, mrp: 649, discount: 15, category: "Creatine", goal: "Muscle Gain", budget: "Under ₹999" },
  { id: 7, name: "CreAMP HCL Creatine 100g", variant: "100 g • Unflavoured", price: 699, mrp: 849, discount: 18, category: "Creatine", goal: "Muscle Gain", budget: "Under ₹999" },
  { id: 8, name: "Liquid L-Carnitine 450ml", variant: "450 ml • Lemon Lime", price: 499, mrp: 699, discount: 29, category: "Fat Loss", goal: "Fat Loss", budget: "Under ₹999" },
  { id: 9, name: "Thermo Cuts 90 tabs", variant: "90 Tablets", price: 1199, mrp: 1499, discount: 20, category: "Fat Loss", goal: "Fat Loss", budget: "₹999-₹2499" },
  { id: 10, name: "Pre Workout WrathX 510g", variant: "510 g • Fruit Fury", price: 1999, mrp: 2549, discount: 21, category: "Pre-Workout", goal: "Performance", budget: "₹999-₹2499", inHighDemand: true, hasFreeGift: true },
  { id: 11, name: "MB-VITE Multivitamin 60 tabs", variant: "60 Tablets", price: 399, mrp: 499, discount: 20, category: "Vitamins", goal: "Performance", budget: "Under ₹999" },
  { id: 12, name: "Biozyme Iso-Zero 2kg", variant: "2 kg • Low Carb Chocolate", price: 8459, mrp: 10499, discount: 19, category: "Protein", goal: "Muscle Gain", budget: "₹2500+" },
];

const SUPABASE_URL = 'https://umgxgvjluqqtlutugfmf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ3hndmpsdXFxdGx1dHVnZm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3Njg0ODgsImV4cCI6MjA4OTM0NDQ4OH0.8DDPiyaue5Pgy0KJ0Vned73dDcJJ00oUVTE_KecFito';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStep, setFormStep] = useState<'form' | 'success'>('form');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filters, setFilters] = useState({
    goal: 'All Goals',
    category: 'All',
    budget: 'All'
  });

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    weight: '',
    height: '',
    contact: '',
    goal: '',
    fitnessLevel: '',
    diet: '',
    budget: '',
    currentSupplements: 'Starting Fresh'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    (window as any).showProductsPage = () => setCurrentPage('products');
    (window as any).closeModal = closeModal;
  }, []);

  // Carousel Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => alert("Added to cart! ✓");
  const handleBuyNow = () => alert("Added to cart! ✓");

  const showNutritionistForm = () => {
    setIsModalOpen(true);
    setFormStep('form');
    setFormData({
      fullName: '',
      weight: '',
      height: '',
      contact: '',
      goal: '',
      fitnessLevel: '',
      diet: '',
      budget: '',
      currentSupplements: 'Starting Fresh'
    });
    setErrors({});
  };

  async function handleFormSubmit() {

    // ── STEP 1: Read values from React state ──
    const name = formData.fullName.trim();
    const weight_kg = parseFloat(formData.weight);
    const height_cm = parseFloat(formData.height);
    const contact = formData.contact.trim();
    const goal = formData.goal;
    const fitness_level = formData.fitnessLevel;
    const diet = formData.diet;
    const budget = formData.budget;
    const current_supplements = formData.currentSupplements || 'Starting Fresh';

    // ── STEP 2: Validate ──
    const newErrors: Record<string, string> = {};

    if (!name || name.length < 2) newErrors.fullName = 'Please enter your full name';
    if (!weight_kg || weight_kg < 30 || weight_kg > 200) newErrors.weight = 'Enter a valid weight between 30–200 kg';
    if (!height_cm || height_cm < 100 || height_cm > 250) newErrors.height = 'Enter a valid height between 100–250 cm';
    if (!contact || contact.length < 5) newErrors.contact = 'Please enter your WhatsApp number or email';
    if (!goal) newErrors.goal = 'Please select your fitness goal';
    if (!fitness_level) newErrors.fitnessLevel = 'Please select your fitness level';
    if (!diet) newErrors.diet = 'Please select your dietary preference';
    if (!budget) newErrors.budget = 'Please select your monthly budget';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // ── STEP 3: Show loading state ──
    const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.textContent = '⏳ Building your plan...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';
    }

    // ── STEP 4: Build payload ──
    const payload = {
      name,
      weight_kg,
      height_cm,
      contact,
      goal,
      fitness_level,
      diet,
      budget,
      current_supplements,
      submitted_at: new Date().toISOString(),
      source: 'website_form'
    };

    // ── STEP 5: POST to Supabase ──
    let submitSuccess = false;
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/customer_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 201) {
        submitSuccess = true;
      } else {
        const errorText = await response.text();
        console.error('Supabase error:', response.status, errorText);
        // Still show success to user - graceful fallback
        submitSuccess = true;
      }
    } catch (err) {
      console.error('Network error:', err);
      // Graceful fallback - show success anyway
      submitSuccess = true;
    }

    // ── STEP 6: Show success screen ──
    if (submitSuccess) {
      const modalBody = document.getElementById('modal-body');
      if (modalBody) {
        modalBody.innerHTML = `
          <div style="text-align:center; padding: 32px 16px;">
            <div style="
              width: 64px; height: 64px; background: #ECFDF3;
              border-radius: 50%; display: flex; align-items: center;
              justify-content: center; margin: 0 auto 24px;
            ">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#12B76A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>

            <h2 style="
              font-size: 24px; font-weight: 600; color: #20262E;
              margin: 0 0 12px;
            ">
              Profile Submitted!
            </h2>

            <p style="
              font-size: 15px; color: #414C58;
              line-height: 1.6; margin: 0 0 32px;
            ">
              We'll reach out on 
              <strong style="color:#20262E">${contact}</strong> 
              within 24 hours with your custom plan.
            </p>

            <div style="
              background: #FFFBEB; border: 1px solid #FFBE00;
              border-radius: 8px; padding: 16px;
              margin-bottom: 24px; text-align: left;
            ">
              <p style="margin:0; font-size:13px; color:#20262E; font-weight:600;">
                📋 Your Profile Summary
              </p>
              <p style="margin:8px 0 0; font-size:13px; color:#414C58; line-height:1.8;">
                Goal: <strong>${goal}</strong><br>
                Level: <strong>${fitness_level}</strong><br>
                Diet: <strong>${diet}</strong><br>
                Budget: <strong>${budget}</strong>
              </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <button onclick="showProductsPage(); closeModal();" style="
                background: #FFBE00; color: #20262E; border: none;
                padding: 14px; border-radius: 8px; font-weight: 600;
                cursor: pointer; font-size: 14px;
              ">
                Shop Supplements
              </button>
              <button onclick="closeModal();" style="
                background: #F2F4F7; color: #414C58; border: none;
                padding: 14px; border-radius: 8px; font-weight: 600;
                cursor: pointer; font-size: 14px;
              ">
                Close
              </button>
            </div>
          </div>
        `;
      }
    }
  }

  function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.style.display = 'none';
    setIsModalOpen(false);
  }

  const filteredProducts = PRODUCTS.filter(p => {
    const goalMatch = filters.goal === 'All Goals' || p.goal === filters.goal;
    const categoryMatch = filters.category === 'All' || p.category === filters.category;
    const budgetMatch = filters.budget === 'All' || p.budget === filters.budget;
    return goalMatch && categoryMatch && budgetMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Row 1 */}
      <nav className="sticky top-0 z-[1000] bg-white shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px] h-[116px] flex items-center justify-between px-10">
        <div className="flex items-center cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setCurrentPage('home')}>
          <img 
            src={mbLogo} 
            alt="MuscleBlaze" 
            className="h-[84px] w-auto object-contain"
          />
        </div>

        <div className="w-1/2 bg-search-bg rounded-lg h-14 flex items-center px-5">
          <Search className="text-search-text w-6 h-6 mr-4" />
          <input 
            type="text" 
            placeholder="Type a product name. e.g. Biozyme." 
            className="bg-transparent border-none outline-none w-full text-search-text text-lg placeholder:text-search-text"
          />
        </div>

        <div className="flex items-center gap-6">
          <Wallet className="w-7 h-7 text-dark cursor-pointer hover:text-yellow transition-colors" />
          <div className="relative cursor-pointer group">
            <ShoppingBag className="w-7 h-7 text-dark group-hover:text-yellow transition-colors" />
            <div className="absolute -top-1 -right-1 bg-yellow text-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</div>
          </div>
          <button className="bg-yellow text-dark font-bold px-8 py-3 rounded-[4px] hover:bg-[#E5AB00] transition-all transform active:scale-95">Login / Sign Up</button>
        </div>
      </nav>

      {/* Navbar Row 2 */}
      <div className="bg-white h-[52px] border-b border-[#EBEBEB] flex justify-center items-center gap-10">
        <a href="#" className={`nav-link ${currentPage === 'products' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>All Products ▼</a>
        <a href="#" className="nav-link">Offers</a>
        <a href="#" className="nav-link">Stores ▼</a>
        <a href="#" className="nav-link">Our Story</a>
        <a href="#" className="nav-link">Authenticity ▼</a>
        <a href="#" className="nav-link">Chat Support</a>
        <a href="#" className="nav-link">Business Enquiry</a>
      </div>

      {/* Main Content */}
      <main>
        {currentPage === 'home' ? (
          <div className="animate-in fade-in duration-500">
            {/* Hero Carousel */}
            {(() => {
              const heroImages = [hero1, hero2, hero3, hero4, hero5];
              return (
                <section className="relative h-[80vh] overflow-hidden bg-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={heroImages[currentSlide]}
                        alt={`Hero slide ${currentSlide + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 shadow-md rounded-full flex items-center justify-center z-10 hover:bg-white transition-colors"
                    onClick={() => setCurrentSlide(s => (s - 1 + heroImages.length) % heroImages.length)}
                  >
                    <ChevronLeft className="w-6 h-6 text-dark" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow shadow-md rounded-full flex items-center justify-center z-10 hover:bg-yellow/80 transition-colors"
                    onClick={() => setCurrentSlide(s => (s + 1) % heroImages.length)}
                  >
                    <ChevronRight className="w-6 h-6 text-dark" />
                  </button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroImages.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all cursor-pointer ${currentSlide === i ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
                        onClick={() => setCurrentSlide(i)}
                      />
                    ))}
                  </div>
                </section>
              );
            })()}

            {/* Popular Products */}
            <section className="py-12 px-20 bg-white">
              <div className="section-heading">
                <div className="section-heading-bar"></div>
                <h2 className="section-heading-text">Popular</h2>
              </div>

              <div className="flex gap-4 mb-8">
                <button className="bg-dark text-white border border-dark rounded-[4px] px-5 py-2 font-semibold text-base">Fitness Must Haves</button>
                <button className="bg-transparent text-black border border-dark rounded-[4px] px-5 py-2 font-semibold text-base">Proteins</button>
                <button className="bg-transparent text-black border border-dark rounded-[4px] px-5 py-2 font-semibold text-base">Gainers</button>
              </div>

              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                  {PRODUCTS.slice(0, 4).map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-image-area">
                        {product.inHighDemand && <div className="badge-demand">In High Demand</div>}
                        <Heart className="heart-icon w-5 h-5" />
                        <div className="text-center">
                          <div className="w-24 h-32 bg-gradient-to-br from-[#2a2a2a] to-[#444] mx-auto mb-2" style={{ borderRadius: '50% 50% 48% 48% / 20% 20% 80% 80%' }}></div>
                          <span className="text-[12px] text-search-text font-medium">{product.category}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-black text-[14px] font-medium leading-tight h-10 line-clamp-2">{product.name}</h3>
                        <p className="text-search-text text-[12px] mt-1">{product.variant}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-black text-[16px] font-bold">₹{product.price.toLocaleString()}</span>
                          <span className="text-[#999] text-[13px] line-through ml-2">₹{product.mrp.toLocaleString()}</span>
                          <span className="text-discount-green text-[12px] font-medium ml-1.5">{product.discount}% off</span>
                        </div>
                        {product.hasFreeGift && (
                          <div className="mt-1.5 bg-free-tag-bg text-free-tag-text text-[12px] px-2 py-1 rounded-[4px] inline-block">
                            🎁 Free Shaker worth Rs. 699
                          </div>
                        )}
                        <div className="mt-3">
                          <button className="btn-add-cart" onClick={handleAddToCart}>ADD TO CART</button>
                          <button className="btn-buy-now" onClick={handleBuyNow}>BUY NOW</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center z-10">
                  <ChevronLeft className="w-6 h-6 text-[#999]" />
                </button>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-yellow shadow-md rounded-full flex items-center justify-center z-10">
                  <ChevronRight className="w-6 h-6 text-dark" />
                </button>
              </div>

              <div className="text-center mt-8">
                <a href="#" className="text-see-all-link text-base font-medium no-underline hover:underline" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>See All Products →</a>
              </div>
            </section>

            {/* Shop By Level */}
            <section className="py-12 px-20 bg-white">
              <div className="section-heading">
                <div className="section-heading-bar"></div>
                <h2 className="section-heading-text">Shop By Level</h2>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <div key={level} className="relative h-[230px] bg-[#1A1A1A] rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-white rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <span className="text-white text-2xl font-medium relative z-10 group-hover:text-yellow transition-colors">{level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Shop By Goal */}
            <section className="py-12 px-20 bg-dark">
              <div className="section-heading">
                <div className="section-heading-bar"></div>
                <h2 className="section-heading-text text-white">Shop By Goal</h2>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {['Lean Muscle Mass', 'Fat Loss', 'Weight Gain', 'Performance'].map(goal => (
                  <div key={goal} className="bg-[#2A3340] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#364152] transition-colors">
                    <div className="w-12 h-12 bg-yellow/10 rounded-full flex items-center justify-center mb-4">
                      <ArrowRight className="text-yellow w-6 h-6" />
                    </div>
                    <span className="text-white text-lg font-medium">{goal}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Nutritionist Banner */}
            <section className="my-12 mx-20 p-16 bg-gradient-to-br from-[#fff8e7] to-white border-2 border-yellow rounded-xl flex justify-between items-center relative overflow-hidden">
              <div className="relative z-10">
                <div className="bg-yellow text-dark text-[12px] font-bold px-3 py-1 rounded-full inline-block mb-4">⚡ POWERED BY AI</div>
                <h2 className="text-[36px] font-bold text-black leading-tight">Not Sure What to Take?</h2>
                <p className="text-base text-search-text mt-3 max-w-[440px]">
                  Get a FREE personalized supplement stack built for your body, your goal, and your budget.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-[15px] text-black"><CheckCircle2 className="w-4 h-4 text-discount-green" /> Personalized for your body type & goals</li>
                  <li className="flex items-center gap-2 text-[15px] text-black"><CheckCircle2 className="w-4 h-4 text-discount-green" /> Matches your budget — zero upselling</li>
                  <li className="flex items-center gap-2 text-[15px] text-black"><CheckCircle2 className="w-4 h-4 text-discount-green" /> Backed by nutrition science + AI</li>
                </ul>
                <button className="mt-6 bg-yellow text-dark px-8 py-4 text-[17px] font-bold rounded-[4px] hover:bg-[#E5AB00] hover:scale-105 transition-all tracking-[0.3px]" onClick={showNutritionistForm}>
                  ASK AN AI NUTRITIONIST →
                </button>
              </div>
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 text-yellow opacity-10 font-bold text-[180px] select-none pointer-events-none">AI</div>
              <div className="hex-grid absolute inset-0 opacity-20 pointer-events-none"></div>
            </section>

            {/* Trust Strip */}
            <section className="py-8 px-20 bg-[#F8F8F8] flex justify-between items-center">
              <div className="flex flex-col items-center gap-3">
                <ShieldCheck className="w-10 h-10 text-dark" />
                <span className="text-[14px] font-medium text-search-text text-center">100% Safe & Secure Payments</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Truck className="w-10 h-10 text-dark" />
                <span className="text-[14px] font-medium text-search-text text-center">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Coins className="w-10 h-10 text-dark" />
                <span className="text-[14px] font-medium text-search-text text-center">Shop with us & earn MB Cash</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <QrCode className="w-10 h-10 text-dark" />
                <span className="text-[14px] font-medium text-search-text text-center">Authenticity Guaranteed</span>
              </div>
            </section>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Products Page Content */}
            <div className="px-20 py-4 text-see-all-link text-sm">
              Home &gt; All Products
            </div>

            {/* Sticky Filter Bar */}
            <div className="sticky top-[116px] z-[900] bg-white px-20 py-4 border-b border-[#EBEBEB] flex items-center gap-6">
              <span className="text-search-text text-[14px]">Filter By:</span>
              
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-search-text mr-2">Goal:</span>
                {['All Goals', 'Muscle Gain', 'Fat Loss', 'Weight Gain'].map(g => (
                  <button 
                    key={g} 
                    className={`filter-pill ${filters.goal === g ? 'active' : ''}`}
                    onClick={() => setFilters(prev => ({ ...prev, goal: g }))}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[13px] text-search-text mr-2">Category:</span>
                {['All', 'Protein', 'Creatine', 'Pre-Workout', 'Vitamins'].map(c => (
                  <button 
                    key={c} 
                    className={`filter-pill ${filters.category === c ? 'active' : ''}`}
                    onClick={() => setFilters(prev => ({ ...prev, category: c }))}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[13px] text-search-text mr-2">Budget:</span>
                {['All', 'Under ₹999', '₹999-₹2499', '₹2500+'].map(b => (
                  <button 
                    key={b} 
                    className={`filter-pill ${filters.budget === b ? 'active' : ''}`}
                    onClick={() => setFilters(prev => ({ ...prev, budget: b }))}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <button 
                className="ml-auto text-see-all-link text-[13px] hover:underline"
                onClick={() => setFilters({ goal: 'All Goals', category: 'All', budget: 'All' })}
              >
                Clear All
              </button>
            </div>

            {/* Product Grid */}
            <div className="px-20 py-8 grid grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card w-full">
                  <div className="product-image-area">
                    {product.inHighDemand && <div className="badge-demand">In High Demand</div>}
                    <Heart className="heart-icon w-5 h-5" />
                    <div className="text-center">
                      <div className="w-24 h-32 bg-gradient-to-br from-[#2a2a2a] to-[#444] mx-auto mb-2" style={{ borderRadius: '50% 50% 48% 48% / 20% 20% 80% 80%' }}></div>
                      <span className="text-[12px] text-search-text font-medium">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-black text-[14px] font-medium leading-tight h-10 line-clamp-2">{product.name}</h3>
                    <p className="text-search-text text-[12px] mt-1">{product.variant}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-black text-[16px] font-bold">₹{product.price.toLocaleString()}</span>
                      <span className="text-[#999] text-[13px] line-through ml-2">₹{product.mrp.toLocaleString()}</span>
                      <span className="text-discount-green text-[12px] font-medium ml-1.5">{product.discount}% off</span>
                    </div>
                    {product.hasFreeGift && (
                      <div className="mt-1.5 bg-free-tag-bg text-free-tag-text text-[12px] px-2 py-1 rounded-[4px] inline-block">
                        🎁 Free Shaker worth Rs. 699
                      </div>
                    )}
                    <div className="mt-3">
                      <button className="btn-add-cart" onClick={handleAddToCart}>ADD TO CART</button>
                      <button className="btn-buy-now" onClick={handleBuyNow}>BUY NOW</button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-4 py-20 text-center text-search-text text-lg">
                  No products found matching your filters.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-footer-bg diagonal-pattern py-16 px-20 text-white">
        <div className="grid grid-cols-4 gap-10">
          <div>
            <h4 className="text-base font-medium mb-6">Products</h4>
            <ul className="space-y-3">
              {['Biozyme Performance Whey', 'Biozyme Whey PR', 'Raw Whey Protein', 'High Protein Oats', 'Super Gainer XXL', 'Creatine', 'High Protein Muesli', 'MB Multivitamin'].map(link => (
                <li key={link}><a href="#" className="footer-link">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-medium mb-6">Categories</h4>
            <ul className="space-y-3">
              {['Proteins', 'Gainers', 'Pre/Post Workout', 'Ayurveda', 'Fit Foods', 'Vitamin Supplements', 'Fat Loss', 'Fitness Accessories'].map(link => (
                <li key={link}><a href="#" className="footer-link">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-medium mb-6">Useful Links</h4>
            <ul className="space-y-3">
              {['About Us', 'FAQs', 'Blog', 'Trade Partners', 'T&C', 'MB Coupons', 'Privacy Policy', 'Return Refund', 'Contact Us', 'Business Enquiry'].map(link => (
                <li key={link}><a href="#" className="footer-link">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-medium mb-6">Subscribe to Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter email" className="bg-[#2E3540] border border-[#404850] text-white px-3.5 py-2.5 rounded-[2px] w-full outline-none focus:border-yellow" />
              <button className="bg-yellow text-dark font-semibold px-5 py-2.5 rounded-[2px] hover:bg-[#E5AB00]">Submit</button>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 flex items-center justify-center">📞</div>
                <span>+91 85 277 32 632</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 flex items-center justify-center">✉️</div>
                <span>info@muscleblaze.com</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              {[Instagram, Linkedin, Twitter, Youtube, Facebook].map((Icon, i) => (
                <div key={i} className="w-10 h-10 bg-[#333333] rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-yellow hover:text-dark transition-all">
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t border-white/15 text-center">
          <p className="text-[12px] text-white/40 max-w-3xl mx-auto">
            All MuscleBlaze products are manufactured at FSSAI approved manufacturing facilities and are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </footer>

      {/* Floating AI Button */}
      <button 
        className="fixed bottom-8 right-8 z-[999] bg-yellow text-dark px-6 py-3.5 rounded-full font-bold text-[15px] shadow-[0_8px_32px_rgba(255,190,0,0.3)] hover:scale-105 transition-all flex items-center gap-2.5 group overflow-hidden"
        onClick={showNutritionistForm}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        <Sparkles className="w-5 h-5 text-dark animate-pulse" />
        <span className="relative">AI Nutritionist</span>
      </button>

      {/* AI Nutritionist Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              id="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-[6px]"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              id="modal-body"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-xl border-t-4 border-yellow w-full max-w-[560px] p-10 shadow-[0_24px_64px_rgba(0,0,0,0.25)] max-h-[90vh] overflow-y-auto"
            >
              <button 
                className="absolute top-4 right-4 text-search-text hover:text-black transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>

              {formStep === 'form' ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow/10 text-yellow text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-yellow/20">
                      <Sparkles className="w-3 h-3" />
                      AI NUTRITIONIST
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-black mt-4 tracking-tight">Build Your Perfect Supplement Stack</h2>
                  <p className="text-[15px] text-search-text mt-2 font-normal">Answer 5 quick questions. Get your plan instantly.</p>

                  <form className="mt-10 space-y-8" onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} ref={formRef} noValidate>
                    {/* SECTION 1 — PERSONAL DETAILS */}
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 gap-5">
                        <div className="relative">
                          <label className="block text-[13px] font-semibold text-dark mb-2 uppercase tracking-wider opacity-70">Full Name *</label>
                          <input 
                            id="field-name"
                            type="text" 
                            placeholder="e.g. Rahul Sharma"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className={`w-full px-4 py-3.5 bg-zinc-50 border-[1.5px] rounded-lg text-[15px] focus:bg-white focus:border-yellow outline-none transition-all ${errors.fullName ? 'border-red-500' : 'border-zinc-200'}`}
                          />
                          {errors.fullName && <p className="text-red-500 text-[11px] mt-1.5 font-medium">{errors.fullName}</p>}
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="w-1/2">
                          <label className="block text-[13px] font-semibold text-dark mb-2 uppercase tracking-wider opacity-70">Weight (kg) *</label>
                          <input 
                            id="field-weight"
                            type="number" 
                            placeholder="e.g. 75" 
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            className={`w-full px-4 py-3.5 bg-zinc-50 border-[1.5px] rounded-lg text-[15px] focus:bg-white focus:border-yellow outline-none transition-all ${errors.weight ? 'border-red-500' : 'border-zinc-200'}`} 
                          />
                          {errors.weight && <p className="text-red-500 text-[11px] mt-1.5 font-medium">{errors.weight}</p>}
                        </div>
                        <div className="w-1/2">
                          <label className="block text-[13px] font-semibold text-dark mb-2 uppercase tracking-wider opacity-70">Height (cm) *</label>
                          <input 
                            id="field-height"
                            type="number" 
                            placeholder="e.g. 175" 
                            value={formData.height}
                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                            className={`w-full px-4 py-3.5 bg-zinc-50 border-[1.5px] rounded-lg text-[15px] focus:bg-white focus:border-yellow outline-none transition-all ${errors.height ? 'border-red-500' : 'border-zinc-200'}`} 
                          />
                          {errors.height && <p className="text-red-500 text-[11px] mt-1.5 font-medium">{errors.height}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13px] font-semibold text-dark mb-2 uppercase tracking-wider opacity-70">Contact Info *</label>
                        <input 
                          id="field-contact"
                          type="text" 
                          placeholder="WhatsApp Number or Email" 
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className={`w-full px-4 py-3.5 bg-zinc-50 border-[1.5px] rounded-lg text-[15px] focus:bg-white focus:border-yellow outline-none transition-all ${errors.contact ? 'border-red-500' : 'border-zinc-200'}`} 
                        />
                        {errors.contact && <p className="text-red-500 text-[11px] mt-1.5 font-medium">{errors.contact}</p>}
                        <div className="flex items-center gap-2 mt-2 text-zinc-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <p className="text-[12px]">We'll send your personalized plan here</p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2 — FITNESS PROFILE */}
                    <div className="pt-4">
                      <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-[2px] mb-6 flex items-center gap-3">
                        <div className="h-[1px] flex-1 bg-zinc-100"></div>
                        Fitness Profile
                        <div className="h-[1px] flex-1 bg-zinc-100"></div>
                      </div>

                      <div className="space-y-8">
                        <div data-group="goal">
                          <label className="block text-[13px] font-semibold text-dark mb-3 uppercase tracking-wider opacity-70">Primary Goal? *</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              { id: 'Build Muscle', label: 'Build Muscle', icon: Dumbbell },
                              { id: 'Lose Fat', label: 'Lose Fat', icon: Flame },
                              { id: 'Gain Weight', label: 'Gain Weight', icon: Scale },
                              { id: 'Boost Performance', label: 'Boost Performance', icon: Zap },
                              { id: 'General Fitness', label: 'General Fitness', icon: Activity }
                            ].map(goal => (
                              <div 
                                key={goal.id} 
                                data-field="goal"
                                data-value={goal.id}
                                onClick={() => setFormData({ ...formData, goal: goal.id })}
                                className={`group p-4 border-[1.5px] rounded-xl cursor-pointer transition-all flex flex-col items-center gap-2.5 text-center ${formData.goal === goal.id ? 'border-yellow bg-yellow/5 shadow-sm' : 'border-zinc-100 hover:border-yellow/40 hover:bg-zinc-50'}`}
                              >
                                <goal.icon className={`w-6 h-6 transition-colors ${formData.goal === goal.id ? 'text-yellow' : 'text-zinc-400 group-hover:text-yellow/60'}`} />
                                <span className={`text-[13px] leading-tight font-medium ${formData.goal === goal.id ? 'text-dark' : 'text-zinc-600'}`}>{goal.label}</span>
                              </div>
                            ))}
                          </div>
                          {errors.goal && <p className="text-red-500 text-[11px] mt-2 font-medium">{errors.goal}</p>}
                        </div>

                        <div data-group="level">
                          <label className="block text-[13px] font-semibold text-dark mb-3 uppercase tracking-wider opacity-70">Fitness Level? *</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { id: 'Beginner', title: 'Beginner', sub: '0–6 months', icon: Sprout },
                              { id: 'Intermediate', title: 'Intermediate', sub: '6 months–2 yrs', icon: Dumbbell },
                              { id: 'Advanced', title: 'Advanced', sub: '2+ years', icon: Activity }
                            ].map(level => (
                              <div 
                                key={level.id} 
                                data-field="level"
                                data-value={level.id}
                                onClick={() => setFormData({ ...formData, fitnessLevel: level.id })}
                                className={`group p-4 border-[1.5px] rounded-xl cursor-pointer transition-all flex flex-col items-center gap-1 text-center ${formData.fitnessLevel === level.id ? 'border-yellow bg-yellow/5 shadow-sm' : 'border-zinc-100 hover:border-yellow/40 hover:bg-zinc-50'}`}
                              >
                                <level.icon className={`w-5 h-5 mb-1 transition-colors ${formData.fitnessLevel === level.id ? 'text-yellow' : 'text-zinc-400 group-hover:text-yellow/60'}`} />
                                <div className={`text-[14px] font-bold ${formData.fitnessLevel === level.id ? 'text-dark' : 'text-zinc-700'}`}>{level.title}</div>
                                <div className="text-[11px] font-medium text-zinc-400">{level.sub}</div>
                              </div>
                            ))}
                          </div>
                          {errors.fitnessLevel && <p className="text-red-500 text-[11px] mt-2 font-medium">{errors.fitnessLevel}</p>}
                        </div>

                        <div data-group="diet">
                          <label className="block text-[13px] font-semibold text-dark mb-3 uppercase tracking-wider opacity-70">Dietary Preference? *</label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { id: 'Non-Vegetarian', label: 'Non-Veg', icon: Beef },
                              { id: 'Vegetarian', label: 'Veg', icon: Salad },
                              { id: 'Vegan', label: 'Vegan', icon: Leaf }
                            ].map(diet => (
                              <div 
                                key={diet.id} 
                                data-field="diet"
                                data-value={diet.id}
                                onClick={() => setFormData({ ...formData, diet: diet.id })}
                                className={`group p-4 border-[1.5px] rounded-xl cursor-pointer transition-all flex flex-col items-center gap-2 text-center ${formData.diet === diet.id ? 'border-yellow bg-yellow/5 shadow-sm' : 'border-zinc-100 hover:border-yellow/40 hover:bg-zinc-50'}`}
                              >
                                <diet.icon className={`w-5 h-5 transition-colors ${formData.diet === diet.id ? 'text-yellow' : 'text-zinc-400 group-hover:text-yellow/60'}`} />
                                <span className={`text-[13px] font-bold ${formData.diet === diet.id ? 'text-dark' : 'text-zinc-700'}`}>{diet.label}</span>
                              </div>
                            ))}
                          </div>
                          {errors.diet && <p className="text-red-500 text-[11px] mt-2 font-medium">{errors.diet}</p>}
                        </div>

                        <div data-group="budget">
                          <label className="block text-[13px] font-semibold text-dark mb-3 uppercase tracking-wider opacity-70">Monthly Budget? *</label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: 'Under ₹1,000', label: 'Under ₹1,000' },
                              { id: '₹1,000–₹2,000', label: '₹1,000–₹2,000' },
                              { id: '₹2,000–₹4,000', label: '₹2,000–₹4,000' },
                              { id: '₹4,000+', label: '₹4,000+' }
                            ].map(budget => (
                              <div 
                                key={budget.id} 
                                data-field="budget"
                                data-value={budget.id}
                                onClick={() => setFormData({ ...formData, budget: budget.id })}
                                className={`group p-4 border-[1.5px] rounded-xl cursor-pointer transition-all flex items-center justify-center text-center ${formData.budget === budget.id ? 'border-yellow bg-yellow/5 shadow-sm' : 'border-zinc-100 hover:border-yellow/40 hover:bg-zinc-50'}`}
                              >
                                <span className={`text-[13px] font-bold ${formData.budget === budget.id ? 'text-dark' : 'text-zinc-700'}`}>{budget.label}</span>
                              </div>
                            ))}
                          </div>
                          {errors.budget && <p className="text-red-500 text-[11px] mt-2 font-medium">{errors.budget}</p>}
                        </div>

                        <div data-group="supplements">
                          <label className="block text-[13px] font-semibold text-dark mb-3 uppercase tracking-wider opacity-70">Current Supplement Usage?</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { id: 'Starting Fresh', title: 'Starting Fresh', sub: 'No supplements yet', icon: Plus },
                              { id: 'Protein Only', title: 'Protein Only', sub: 'Taking protein', icon: Milk },
                              { id: 'Protein + Creatine', title: 'Protein + Creatine', sub: 'Intermediate stack', icon: FlaskConical },
                              { id: 'Full Stack', title: 'Full Stack', sub: 'Advanced user', icon: Pill }
                            ].map(supp => (
                              <div 
                                key={supp.id} 
                                data-field="supplements"
                                data-value={supp.id}
                                onClick={() => setFormData({ ...formData, currentSupplements: supp.id })}
                                className={`group p-4 border-[1.5px] rounded-xl cursor-pointer transition-all flex flex-col items-start gap-1 ${formData.currentSupplements === supp.id ? 'border-yellow bg-yellow/5 shadow-sm' : 'border-zinc-100 hover:border-yellow/40 hover:bg-zinc-50'}`}
                              >
                                <div className="flex items-center gap-3 w-full">
                                  <supp.icon className={`w-5 h-5 transition-colors ${formData.currentSupplements === supp.id ? 'text-yellow' : 'text-zinc-400 group-hover:text-yellow/60'}`} />
                                  <div className="flex-1">
                                    <div className={`text-[14px] font-bold ${formData.currentSupplements === supp.id ? 'text-dark' : 'text-zinc-700'}`}>{supp.title}</div>
                                    <div className="text-[11px] font-medium text-zinc-400">{supp.sub}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-zinc-100">
                      <p className="text-[11px] text-zinc-400 text-center mb-4 font-medium">
                        🔒 Your information is private and used only for your recommendation.
                      </p>
                      <button 
                        id="submit-btn" 
                        type="submit" 
                        className="w-full bg-yellow text-dark py-4.5 text-[16px] font-bold rounded-xl hover:bg-[#E5AB00] transition-all shadow-[0_4px_20px_rgba(255,190,0,0.2)] active:scale-[0.98]"
                      >
                        GENERATE MY SUPPLEMENT PLAN
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-yellow" />
                  </div>
                  <h2 className="text-2xl font-bold text-black">Your Stack is Ready!</h2>
                  <p className="text-search-text mt-4 leading-relaxed">
                    We'll reach out on your contact info within 24 hours with your personalized MuscleBlaze supplement plan.
                  </p>
                  <button 
                    className="w-full bg-yellow text-dark py-4 text-[17px] font-bold rounded-[4px] hover:bg-[#E5AB00] transition-colors mt-8"
                    onClick={() => { setIsModalOpen(false); setCurrentPage('products'); }}
                  >
                    Browse Products
                  </button>
                  <button 
                    className="mt-4 text-search-text hover:text-black transition-colors text-sm font-medium"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
