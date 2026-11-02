"use client";

import React, { useState, useEffect } from "react";
import { useStudio } from "@/context/StudioContext";
import { Category, ProductFormData } from "@/types/studio";
import { 
  Upload, 
  X, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Bookmark, 
  ShieldCheck, 
  Diamond, 
  ListOrdered, 
  Layers, 
  Ruler, 
  Package, 
  CreditCard,
  Plus,
  Flame,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES: Category[] = [
  "Couture & Gowns",
  "Lehengas & Sets",
  "Sarees & Drapes",
  "Sherwanis & Bandhgalas",
  "Contemporary Indo-Western",
  "Luxury Prêt & Coordinates"
];

const SAMPLE_GALLERY = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBf85Mce_hIjXh6hvm3H8fRPzMuL9_053At6E0nmmwkA7HG6V1WG4O2yHFMsMziha3cUqZn8nRsZZjxDpDFpNIUeMRlr_v_2FEzYT8DGEcUq--5JCzpG6YaiAyT_Z5afkWpHzD_JrDczGYl6kE9kC42c1xbuJnz_nZZpJjzQmUP7slir4iA6GwuCKaDJ9qD7rBKJHDZdcXmv1NLXFcECaNDrE1Pr_qQpRJZRpAFd7w",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
];

export const ListNewProductForm: React.FC = () => {
  const { 
    editingDraftId, 
    drafts, 
    saveDraft, 
    publishNewProduct, 
    setActiveStudioTab, 
    listedProducts,
    showToast 
  } = useStudio();

  // Find draft if editing
  const existingDraft = drafts.find((d) => d.id === editingDraftId);

  // Form State
  const [currentStep, setCurrentStep] = useState<number>(existingDraft?.currentStep || 5);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [autosaveText, setAutosaveText] = useState("Draft saved at 14:32");

  // Form Data State
  const [formData, setFormData] = useState<ProductFormData>({
    title: existingDraft?.formData?.title || "Hand-Embroidered Zardozi Silk Corset",
    category: existingDraft?.formData?.category || "Couture & Gowns",
    subcategory: existingDraft?.formData?.subcategory || "Corsets & Bodices",
    tags: existingDraft?.formData?.tags || ["Zardozi", "Silk Organza", "Artisanal", "Bespoke"],
    images: existingDraft?.formData?.images || [SAMPLE_GALLERY[0]],
    standardSizes: existingDraft?.formData?.standardSizes || ["S", "M", "Custom"],
    measurements: {
      bust: existingDraft?.formData?.measurements?.bust || "34.5 in",
      waist: existingDraft?.formData?.measurements?.waist || "26.0 in",
      hips: existingDraft?.formData?.measurements?.hips || "36.5 in",
      length: existingDraft?.formData?.measurements?.length || "18.0 in",
      shoulder: existingDraft?.formData?.measurements?.shoulder || "14.5 in",
    },
    fitType: existingDraft?.formData?.fitType || "Tailored Regular",
    stretchability: existingDraft?.formData?.stretchability || "No Stretch (Structured)",
    isOneOfOne: existingDraft?.formData?.isOneOfOne ?? true,
    quantity: existingDraft?.formData?.quantity || 1,
    materials: existingDraft?.formData?.materials || "100% Pure Mulberry Silk Organza, Gold Zardozi Metallic Thread",
    lining: existingDraft?.formData?.lining || "Double-layered Heavy Duchess Satin (Pure Silk)",
    careInstructions: existingDraft?.formData?.careInstructions || "Specialist archival dry clean only by luxury textile restorer. Store in acid-free tissue paper.",
    price: existingDraft?.formData?.price || 45000,
    shippingMode: existingDraft?.formData?.shippingMode || "Free Shipping",
    packageDimensions: existingDraft?.formData?.packageDimensions || "45 x 35 x 15 cm",
    packageWeight: existingDraft?.formData?.packageWeight || "1.8 kg",
  });

  const [newTagInput, setNewTagInput] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState<"Inches" | "CM">("Inches");

  // Autosave simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft(formData, currentStep);
      const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      setAutosaveText(`Draft saved at ${time}`);
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData, currentStep]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = newTagInput.trim().replace(/^,+|,+$/g, "");
      if (val && !formData.tags.includes(val)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, val] }));
        setNewTagInput("");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleToggleSize = (size: string) => {
    setFormData((prev) => {
      const exists = prev.standardSizes.includes(size);
      const updated = exists 
        ? prev.standardSizes.filter((s) => s !== size)
        : [...prev.standardSizes, size];
      return { ...prev, standardSizes: updated };
    });
  };

  const handleManualSaveDraft = () => {
    saveDraft(formData, currentStep);
    showToast("Creation dossier draft saved securely in your salon archive.");
  };

  const handleFinalPublish = () => {
    publishNewProduct(formData);
    setIsReviewModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full space-y-10 animate-fadeIn">
      
      {/* Studio Secondary Sub-Navigation Tab Strip */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl border border-[#E8D2B7]/60 shadow-xs px-6 py-1">
        <div className="flex items-center justify-between overflow-x-auto gap-4">
          <nav className="flex items-center gap-6 sm:gap-8">
            <button
              onClick={() => setActiveStudioTab("list-new")}
              className="relative py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 text-[#865040]" />
              <span>List New Product</span>
              <motion.span 
                layoutId="studioSubNavActive"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#3A0E1E] rounded-full" 
              />
            </button>
            <button
              onClick={() => setActiveStudioTab("listed")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Listed Products</span>
              <span className="text-[10px] bg-[#FFF7F9] px-2 py-0.5 rounded-full border border-[#E8D2B7] text-[#837376]">({listedProducts.length})</span>
            </button>
            <button
              onClick={() => setActiveStudioTab("sold")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Sold Products</span>
              <span className="text-[10px] bg-[#FFF7F9] px-2 py-0.5 rounded-full border border-[#E8D2B7] text-[#837376]">(18)</span>
            </button>
            <button
              onClick={() => setActiveStudioTab("drafts")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Drafts</span>
              <span className="text-[10px] bg-[#FFF7F9] px-2 py-0.5 rounded-full border border-[#E8D2B7] text-[#837376]">({drafts.length})</span>
            </button>
            <button
              onClick={() => setActiveStudioTab("boosted")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Boosted for Promotion (4)</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Creation Flow Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#865040]">
              Archival Registry
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#865040]"></span>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#837376]">
              Autumn / Winter Edition
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A0E1E] tracking-tight">
            List New Creation
          </h1>

          <p className="text-sm text-[#837376] max-w-2xl leading-relaxed">
            Craft a bespoke atelier listing for your couture collection. Catalog silhouettes, artisanal details, and certified couture specifications for private salon collectors.
          </p>
        </div>

        <div className="flex items-center gap-4 self-start md:self-auto">
          {/* Draft Auto-Saving Indicator (Exact from zip) */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-[#E8D2B7]/70 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B77A68] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B77A68]"></span>
            </span>
            <span className="text-xs uppercase tracking-wider text-[#837376] font-medium">
              {autosaveText}
            </span>
          </div>

          <button
            onClick={handleManualSaveDraft}
            className="px-5 py-2.5 bg-white hover:bg-[#FFF7F9] text-[#3A0E1E] text-xs font-semibold uppercase tracking-wider shadow-xs border border-[#E8D2B7] rounded-xl transition-all flex items-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-[#D4AF37]" />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {/* 5-Perspective Media Gallery Upload (Exact from zip) */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="font-editorial text-2xl font-semibold text-[#3A0E1E]">
              Archival Imagery & Lookbook Assets
            </h2>
            <p className="text-xs text-[#837376]">
              Editorial resolution minimum 2400x3200px. Natural diffused studio lighting recommended.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#865040]">
            5 Visual Perspectives Required
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Slot 1: Primary Cover Look */}
          <div className="group relative flex flex-col aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md border border-[#E8D2B7]/70 transition-all">
            <img
              src={formData.images[0] || SAMPLE_GALLERY[0]}
              alt="Cover Look"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A0E1E]/80 via-transparent to-transparent flex flex-col justify-between p-4 pointer-events-none">
              <span className="self-start px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#3A0E1E] text-[10px] font-bold uppercase tracking-widest rounded shadow-xs">
                Cover Look (Primary)
              </span>
              <div className="flex items-center justify-between text-white text-xs">
                <span className="text-[10px] tracking-widest uppercase font-semibold">Aspect 3:4</span>
                <CheckCircle2 className="w-4 h-4 text-[#F6DFC4]" />
              </div>
            </div>
            <button
              onClick={() => showToast("Uploading replacement high-resolution cover photo...")}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#3A0E1E] shadow-md flex items-center justify-center hover:bg-[#3A0E1E] hover:text-white transition-colors border border-[#E8D2B7]"
              title="Change Cover Look"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>

          {/* Slot 2: Front Silhouette */}
          <div 
            onClick={() => showToast("Uploading Front Silhouette high-res lookbook asset...")}
            className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white hover:bg-[#FFF7F9] rounded-xl border border-dashed border-[#E8D2B7] transition-colors cursor-pointer p-6 text-center shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-[#FFF7F9] border border-[#E8D2B7] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-[#865040]" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#3A0E1E] font-bold mb-1">
              Front Silhouette
            </span>
            <span className="text-[11px] text-[#837376]">Full-length frontal perspective</span>
            <span className="mt-4 text-[11px] uppercase tracking-widest text-[#865040] font-semibold group-hover:underline">
              Upload Asset
            </span>
          </div>

          {/* Slot 3: Detail & Embroidery */}
          <div 
            onClick={() => showToast("Uploading Detail & Embroidery macro zoom photo...")}
            className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white hover:bg-[#FFF7F9] rounded-xl border border-dashed border-[#E8D2B7] transition-colors cursor-pointer p-6 text-center shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-[#FFF7F9] border border-[#E8D2B7] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-[#865040]" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#3A0E1E] font-bold mb-1">
              Detail & Embroidery
            </span>
            <span className="text-[11px] text-[#837376]">Macro artisanal stitching & trim</span>
            <span className="mt-4 text-[11px] uppercase tracking-widest text-[#865040] font-semibold group-hover:underline">
              Upload Asset
            </span>
          </div>

          {/* Slot 4: Back Drape */}
          <div 
            onClick={() => showToast("Uploading Back Drape perspective photo...")}
            className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white hover:bg-[#FFF7F9] rounded-xl border border-dashed border-[#E8D2B7] transition-colors cursor-pointer p-6 text-center shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-[#FFF7F9] border border-[#E8D2B7] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-[#865040]" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#3A0E1E] font-bold mb-1">
              Back Drape
            </span>
            <span className="text-[11px] text-[#837376]">Trailing train or rear closures</span>
            <span className="mt-4 text-[11px] uppercase tracking-widest text-[#865040] font-semibold group-hover:underline">
              Upload Asset
            </span>
          </div>

          {/* Slot 5: Model / Mannequin */}
          <div 
            onClick={() => showToast("Uploading Model / Mannequin lookbook photo...")}
            className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white hover:bg-[#FFF7F9] rounded-xl border border-dashed border-[#E8D2B7] transition-colors cursor-pointer p-6 text-center shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-[#FFF7F9] border border-[#E8D2B7] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-[#865040]" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#3A0E1E] font-bold mb-1">
              Model / Mannequin
            </span>
            <span className="text-[11px] text-[#837376]">Movement and physical drape</span>
            <span className="mt-4 text-[11px] uppercase tracking-widest text-[#865040] font-semibold group-hover:underline">
              Upload Asset
            </span>
          </div>
        </div>
      </section>

      {/* 5-Step Interactive Navigation Bar (Exact from zip) */}
      <section className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E8D2B7]/70 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { step: 1, label: "Product Details", icon: Layers },
            { step: 2, label: "Fit & Measurements", icon: Ruler },
            { step: 3, label: "Availability", icon: Diamond },
            { step: 4, label: "Fabric & Care", icon: Sparkles },
            { step: 5, label: "Pricing & Fulfilment", icon: CreditCard },
          ].map((item) => {
            const isActive = currentStep === item.step;
            const isCompleted = currentStep > item.step;
            const Icon = item.icon;

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setCurrentStep(item.step)}
                className={`text-left p-4 rounded-xl transition-all flex flex-col gap-2 ${
                  isActive
                    ? "bg-[#3A0E1E] text-white shadow-xs border border-[#D4AF37]/50"
                    : isCompleted
                    ? "bg-[#FFF7F9] hover:bg-white text-[#21171F] border border-[#E8D2B7]"
                    : "bg-[#FFF7F9]/50 hover:bg-[#FFF7F9] text-[#837376] border border-[#E8D2B7]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-[#F6DFC4]" : "text-[#865040]"}`}>
                    Step 0{item.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : "text-[#865040]"}`} />
                </div>
                <div className="font-editorial text-base font-semibold tracking-tight">
                  {item.label}
                </div>
                <div className={`h-0.5 w-full mt-1 rounded-full ${isActive ? "bg-[#D4AF37]" : isCompleted ? "bg-[#865040]" : "bg-[#E8D2B7]/40"}`} />
              </button>
            );
          })}
        </div>
      </section>

      {/* Multi-Step Form Panels */}
      <div className="bg-white rounded-2xl border border-[#E8D2B7]/70 p-6 sm:p-10 shadow-xs">
        
        {/* ================= STEP 1: PRODUCT DETAILS ================= */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-[#E8D2B7]/60">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#865040]">
                Section I · Catalog Identity
              </span>
              <h2 className="font-editorial text-3xl font-semibold text-[#3A0E1E]">
                Product Details & Taxonomy
              </h2>
              <p className="text-xs text-[#837376]">
                Define the archival title and catalog classifications used in international buyer dossiers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-sm text-[#21171F] font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all"
                    placeholder="e.g. Hand-Embroidered Zardozi Silk Corset"
                  />
                  <span className="text-[11px] text-[#837376] mt-1 block">
                    Ensure descriptive naming highlighting technique and core textile.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs text-[#21171F] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                      Subcategory *
                    </label>
                    <input
                      type="text"
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs text-[#21171F] focus:outline-none focus:border-[#D4AF37]"
                      placeholder="e.g. Corsets & Bodices"
                    />
                  </div>
                </div>

                {/* Tags / Pill Input Section */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#3A0E1E]">
                    Atelier Keywords & Search Tags
                  </label>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-[#FFF7F9] border border-[#E8D2B7] rounded-xl">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8D2B7] rounded-lg text-xs font-semibold text-[#3A0E1E] shadow-xs"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-[#837376] hover:text-[#BA1A1A] leading-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="+ Add tag and press Enter"
                      className="bg-transparent text-xs text-[#21171F] focus:outline-none px-2 py-1 placeholder:text-[#837376]/50 min-w-[180px]"
                    />
                  </div>
                  <span className="text-[11px] text-[#837376]">
                    Press enter or comma to register tags for private showroom discovery.
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Curator Notice (Exact from zip) */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#FFF7F9] border border-[#E8D2B7] rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#865040]">
                    Atelier Curatorial Standard
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#3A0E1E]">
                    Archival Cataloging Guidelines
                  </h3>
                  <p className="text-xs text-[#837376] leading-relaxed">
                    Every listed creation undergoes classification review by Maison Privée's archivist circle. Accurate nomenclature ensures inclusion in private salon trunk shows and tailored VIP client selections.
                  </p>

                  <div className="flex items-center gap-3 pt-3">
                    <div className="w-10 h-10 rounded-full bg-[#3A0E1E] flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#21171F]">
                        Certified Provenance
                      </div>
                      <div className="text-[11px] text-[#837376]">
                        Permanent ledger registration enabled
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8D2B7] bg-white p-4 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="uppercase tracking-wider text-[#837376]">Listing Quality Score</span>
                    <span className="text-[#3A0E1E] font-bold">94 / 100</span>
                  </div>
                  <div className="w-full bg-[#FFF7F9] h-2 rounded-full mt-2 border border-[#E8D2B7]/60 overflow-hidden">
                    <div className="bg-[#B77A68] h-full w-[94%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: FIT & MEASUREMENTS ================= */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-[#E8D2B7]/60">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#865040]">
                Section II · Haute Couture Proportions
              </span>
              <h2 className="font-editorial text-3xl font-semibold text-[#3A0E1E]">
                Fit & Precise Measurements
              </h2>
              <p className="text-xs text-[#837376]">
                Specify standard sizing options, architectural cut profiles, and bespoke measuring specifications.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Standard Sizes Chips */}
              <div className="flex flex-col gap-3">
                <label className="text-xs uppercase tracking-wider font-bold text-[#3A0E1E]">
                  Standard Sizes & Custom Options *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { id: "XS", sub: "UK 6 / US 2" },
                    { id: "S", sub: "UK 8 / US 4" },
                    { id: "M", sub: "UK 10 / US 6" },
                    { id: "L", sub: "UK 12 / US 8" },
                    { id: "XL", sub: "UK 14 / US 10" },
                    { id: "Custom", sub: "Made-to-Measure" },
                  ].map((sz) => {
                    const isSelected = formData.standardSizes.includes(sz.id);
                    return (
                      <button
                        type="button"
                        key={sz.id}
                        onClick={() => handleToggleSize(sz.id)}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#3A0E1E] text-white border-[#D4AF37]/50 shadow-xs"
                            : "bg-[#FFF7F9] hover:bg-white text-[#21171F] border-[#E8D2B7]"
                        }`}
                      >
                        <span className="block font-editorial text-xl font-bold">{sz.id === "Custom" ? "Bespoke" : sz.id}</span>
                        <span className={`block text-[10px] uppercase tracking-wider mt-0.5 ${isSelected ? "text-[#F6DFC4]" : "text-[#837376]"}`}>
                          {sz.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sample Piece Dimensions */}
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#3A0E1E]">
                    Sample Piece Architectural Dimensions
                  </label>
                  <div className="flex items-center gap-1.5 p-1 bg-[#FFF7F9] rounded-lg border border-[#E8D2B7]">
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit("Inches")}
                      className={`px-3 py-1 rounded text-[11px] font-semibold transition-all ${
                        measurementUnit === "Inches"
                          ? "bg-[#3A0E1E] text-white"
                          : "text-[#837376]"
                      }`}
                    >
                      Inches
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit("CM")}
                      className={`px-3 py-1 rounded text-[11px] font-semibold transition-all ${
                        measurementUnit === "CM"
                          ? "bg-[#3A0E1E] text-white"
                          : "text-[#837376]"
                      }`}
                    >
                      CM
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#837376]">Bust</span>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        value={formData.measurements.bust}
                        onChange={(e) => setFormData({ ...formData, measurements: { ...formData.measurements, bust: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs font-semibold text-[#21171F] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="absolute right-3 top-2 text-xs text-[#837376]">
                        {measurementUnit === "Inches" ? "in" : "cm"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#837376]">Waist</span>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        value={formData.measurements.waist}
                        onChange={(e) => setFormData({ ...formData, measurements: { ...formData.measurements, waist: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs font-semibold text-[#21171F] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="absolute right-3 top-2 text-xs text-[#837376]">
                        {measurementUnit === "Inches" ? "in" : "cm"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#837376]">Hip</span>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        value={formData.measurements.hips}
                        onChange={(e) => setFormData({ ...formData, measurements: { ...formData.measurements, hips: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs font-semibold text-[#21171F] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="absolute right-3 top-2 text-xs text-[#837376]">
                        {measurementUnit === "Inches" ? "in" : "cm"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#837376]">Garment Length</span>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        value={formData.measurements.length}
                        onChange={(e) => setFormData({ ...formData, measurements: { ...formData.measurements, length: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs font-semibold text-[#21171F] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="absolute right-3 top-2 text-xs text-[#837376]">
                        {measurementUnit === "Inches" ? "in" : "cm"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Silhouette & Stretchability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                    Silhouette & Fit Type
                  </label>
                  <select
                    value={formData.fitType}
                    onChange={(e) => setFormData({ ...formData, fitType: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs text-[#21171F] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Structured / Corseted Boning">Structured / Corseted Boning</option>
                    <option value="Tailored Architectural">Tailored Architectural</option>
                    <option value="Relaxed Silhouette">Relaxed Silhouette</option>
                    <option value="Fluid Bias-Cut Drape">Fluid Bias-Cut Drape</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                    Textile Stretchability
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "No Stretch (Structured)", label: "Non-Stretch" },
                      { id: "Slight Give (1-2%)", label: "Slight Give" },
                      { id: "Comfort Stretch", label: "Comfort Stretch" },
                    ].map((st) => (
                      <button
                        type="button"
                        key={st.id}
                        onClick={() => setFormData({ ...formData, stretchability: st.id as any })}
                        className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                          formData.stretchability === st.id
                            ? "bg-[#3A0E1E] text-white border-[#D4AF37]/50 shadow-xs"
                            : "bg-[#FFF7F9] hover:bg-white text-[#21171F] border-[#E8D2B7]"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: AVAILABILITY ================= */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-[#E8D2B7]/60">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#865040]">
                Section III · Atelier Scarcity
              </span>
              <h2 className="font-editorial text-3xl font-semibold text-[#3A0E1E]">
                Availability & Allocation
              </h2>
              <p className="text-xs text-[#837376]">
                Designate the creation as an exclusive one-of-one masterwork or configure a numbered limited-run edition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 1: One-of-One Piece */}
              <div
                onClick={() => setFormData({ ...formData, isOneOfOne: true, quantity: 1 })}
                className={`p-6 sm:p-8 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-6 ${
                  formData.isOneOfOne
                    ? "bg-[#3A0E1E] text-white border-[#D4AF37]/50 shadow-md"
                    : "bg-[#FFF7F9] hover:bg-white text-[#21171F] border-[#E8D2B7]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${formData.isOneOfOne ? "text-[#F6DFC4]" : "text-[#865040]"}`}>
                      Unique Masterpiece
                    </span>
                    <h3 className="font-editorial text-2xl font-bold mt-1">One-of-One Piece</h3>
                  </div>
                  <input
                    type="radio"
                    checked={formData.isOneOfOne}
                    onChange={() => {}}
                    className="w-5 h-5 accent-[#D4AF37]"
                  />
                </div>
                <p className={`text-xs leading-relaxed ${formData.isOneOfOne ? "text-white/80" : "text-[#837376]"}`}>
                  Single exclusive artifact crafted once. Once acquired by a patron, this creation is cataloged into private vaults and permanently marked Sold Out.
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                  <Diamond className={`w-4 h-4 ${formData.isOneOfOne ? "text-[#D4AF37]" : "text-[#865040]"}`} />
                  <span className="text-[11px] uppercase tracking-widest font-semibold">
                    Guaranteed Singularity
                  </span>
                </div>
              </div>

              {/* Option 2: Limited-Run Quantity */}
              <div
                onClick={() => setFormData({ ...formData, isOneOfOne: false, quantity: Math.max(2, formData.quantity) })}
                className={`p-6 sm:p-8 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-6 ${
                  !formData.isOneOfOne
                    ? "bg-[#3A0E1E] text-white border-[#D4AF37]/50 shadow-md"
                    : "bg-[#FFF7F9] hover:bg-white text-[#21171F] border-[#E8D2B7]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${!formData.isOneOfOne ? "text-[#F6DFC4]" : "text-[#865040]"}`}>
                      Numbered Edition
                    </span>
                    <h3 className="font-editorial text-2xl font-bold mt-1">Limited-Run Quantity</h3>
                  </div>
                  <input
                    type="radio"
                    checked={!formData.isOneOfOne}
                    onChange={() => {}}
                    className="w-5 h-5 accent-[#D4AF37]"
                  />
                </div>
                <p className={`text-xs leading-relaxed ${!formData.isOneOfOne ? "text-white/80" : "text-[#837376]"}`}>
                  Strict numbered batch produced per order or pre-crafted by the atelier. Specify unit count and allocation thresholds.
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                  <ListOrdered className={`w-4 h-4 ${!formData.isOneOfOne ? "text-[#D4AF37]" : "text-[#865040]"}`} />
                  <span className="text-[11px] uppercase tracking-widest font-semibold">
                    Hand-Numbered Editions
                  </span>
                </div>
              </div>
            </div>

            {/* Units Input for Limited-Run */}
            {!formData.isOneOfOne && (
              <div className="p-6 rounded-2xl bg-[#FFF7F9] border border-[#E8D2B7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-[#3A0E1E]">
                    Available Units in Edition *
                  </label>
                  <p className="text-xs text-[#837376]">
                    Maximum capacity your craftspeople can execute within this production cycle.
                  </p>
                </div>
                <div className="w-36">
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8D2B7] text-center font-editorial text-xl font-bold text-[#3A0E1E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 4: FABRIC & CARE ================= */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-[#E8D2B7]/60">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#865040]">
                Section IV · Material Provenance
              </span>
              <h2 className="font-editorial text-3xl font-semibold text-[#3A0E1E]">
                Textiles & Conservation Protocols
              </h2>
              <p className="text-xs text-[#837376]">
                Disclose yarn origins, lining weaves, metal threads, and museum-grade care mandates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                    Primary Materials & Weaves *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.materials}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs text-[#21171F] font-medium focus:outline-none focus:border-[#D4AF37]"
                    placeholder="e.g. 100% Pure Mulberry Silk Organza, Gold Zardozi Metallic Thread"
                  />
                  <span className="text-[11px] text-[#837376] mt-1 block">
                    List primary textile weight, thread purity, and lace origins.
                  </span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                    Interior Lining & Reinforcement
                  </label>
                  <input
                    type="text"
                    value={formData.lining}
                    onChange={(e) => setFormData({ ...formData, lining: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs text-[#21171F] font-medium focus:outline-none focus:border-[#D4AF37]"
                    placeholder="e.g. Double-layered Heavy Duchess Satin (Pure Silk)"
                  />
                  <span className="text-[11px] text-[#837376] mt-1 block">
                    Specify skin-contact layers and breathability characteristics.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                  Care Instructions & Preservation Mandate *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.careInstructions}
                  onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                  className="w-full p-4 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] text-xs text-[#21171F] focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                />
                <span className="text-[11px] text-[#837376] mt-1 block">
                  These instructions appear on the collector's certificate and shipping dossier.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: PRICING & FULFILMENT ================= */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-[#E8D2B7]/60">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#865040]">
                Section V · Valuation & White-Glove Dispatch
              </span>
              <h2 className="font-editorial text-3xl font-semibold text-[#3A0E1E]">
                Pricing & Fulfilment Logistics
              </h2>
              <p className="text-xs text-[#837376]">
                Set patron investment in Indian Rupees (INR) and configure secure climate-controlled packaging parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Valuation & Delivery */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-1.5">
                    Creation Valuation (Price in INR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-lg font-bold text-[#3A0E1E]">₹</span>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] font-editorial text-2xl font-bold text-[#3A0E1E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#837376] mt-1">
                    <span>Inclusive of bespoke atelier certification</span>
                    <span>Estimated Net Settlement: ₹ {Math.round(formData.price * 0.93).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3A0E1E] mb-2">
                    White-Glove Shipping Arrangement *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setFormData({ ...formData, shippingMode: "Free Shipping" })}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        formData.shippingMode === "Free Shipping"
                          ? "bg-[#3A0E1E] text-white border-[#D4AF37]/50 shadow-xs"
                          : "bg-[#FFF7F9] hover:bg-white text-[#21171F] border-[#E8D2B7]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-editorial text-base font-bold">Complimentary Delivery</span>
                        <input
                          type="radio"
                          checked={formData.shippingMode === "Free Shipping"}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#D4AF37]"
                        />
                      </div>
                      <span className={`text-[11px] ${formData.shippingMode === "Free Shipping" ? "text-white/80" : "text-[#837376]"}`}>
                        Absorbed by Maison Privée Atelier (Recommended for couture tier)
                      </span>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, shippingMode: "Shipping Paid by Customer" })}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        formData.shippingMode === "Shipping Paid by Customer"
                          ? "bg-[#3A0E1E] text-white border-[#D4AF37]/50 shadow-xs"
                          : "bg-[#FFF7F9] hover:bg-white text-[#21171F] border-[#E8D2B7]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-editorial text-base font-bold">Shipping by Customer</span>
                        <input
                          type="radio"
                          checked={formData.shippingMode === "Shipping Paid by Customer"}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#D4AF37]"
                        />
                      </div>
                      <span className={`text-[11px] ${formData.shippingMode === "Shipping Paid by Customer" ? "text-white/80" : "text-[#837376]"}`}>
                        Calculated dynamically at checkout based on destination distance
                      </span>
                    </div>
                  </div>
                </div>

                {/* Box Dimensions & Weight */}
                <div className="flex flex-col gap-3 pt-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#3A0E1E]">
                    Archival Box Dimensions & Deadweight
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#837376]">Length (cm)</span>
                      <input
                        type="text"
                        value="45"
                        disabled
                        className="w-full px-3 py-2 rounded-lg bg-[#FFF7F9] border border-[#E8D2B7] text-xs font-semibold text-[#21171F] mt-1"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#837376]">Width (cm)</span>
                      <input
                        type="text"
                        value="35"
                        disabled
                        className="w-full px-3 py-2 rounded-lg bg-[#FFF7F9] border border-[#E8D2B7] text-xs font-semibold text-[#21171F] mt-1"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#837376]">Height (cm)</span>
                      <input
                        type="text"
                        value="15"
                        disabled
                        className="w-full px-3 py-2 rounded-lg bg-[#FFF7F9] border border-[#E8D2B7] text-xs font-semibold text-[#21171F] mt-1"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#837376]">Weight (kg)</span>
                      <input
                        type="text"
                        value={formData.packageWeight}
                        onChange={(e) => setFormData({ ...formData, packageWeight: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#FFF7F9] border border-[#E8D2B7] text-xs font-semibold text-[#21171F] mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Final Publication Trigger Card (Exact from zip) */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#3A0E1E] rounded-2xl p-6 sm:p-8 text-white border border-[#D4AF37]/50 shadow-xl">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#F6DFC4]">
                      Publication Dossier
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#865040] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-xs">
                      Ready for Review
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="font-editorial text-2xl font-bold text-[#F6DFC4]">
                      {formData.title}
                    </div>
                    <div className="text-xs text-white/80">
                      {formData.category} · {formData.isOneOfOne ? "One-of-One Piece" : `${formData.quantity} Units Edition`}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 py-4 bg-white/10 rounded-xl p-4 border border-white/15">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Archival Valuation:</span>
                      <span className="font-bold text-[#F6DFC4]">₹ {formData.price.toLocaleString("en-IN")} INR</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Logistics Profile:</span>
                      <span className="font-medium text-white">Insured Priority Air Cargo</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Authentication Card:</span>
                      <span className="font-medium text-white">Gold Wax Seal Included</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Upon publishing, this listing undergoes automated algorithmic verification before appearing in international patron searches within 3 minutes.
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F6DFC4] to-[#E8D2B7] hover:from-[#E8D2B7] hover:to-[#D9C3A9] text-[#21171F] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#3A0E1E]" />
                    <span>Review & Publish Creation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-8 border-t border-[#E8D2B7]/60 mt-8">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            className="px-5 py-2.5 rounded-xl border border-[#E8D2B7] text-xs uppercase tracking-wider font-semibold text-[#837376] hover:text-[#3A0E1E] hover:bg-[#FFF7F9] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Section</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
              className="px-6 py-2.5 rounded-full bg-[#3A0E1E] hover:bg-[#271C0B] text-white text-xs uppercase tracking-wider font-semibold shadow-xs border border-[#D4AF37]/50 transition-all flex items-center gap-2"
            >
              <span>Next Section</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#F6DFC4] to-[#E8D2B7] text-[#21171F] text-xs uppercase tracking-wider font-bold shadow-md border border-[#D4AF37] hover:brightness-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#3A0E1E]" />
              <span>Proceed to Publish</span>
            </button>
          )}
        </div>
      </div>

      {/* Review & Publish Confirmation Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/65 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 border border-[#E8D2B7] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E8D2B7]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#865040]">
                    Atelier Verification
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#3A0E1E]">
                    Confirm Live Boutique Publication
                  </h3>
                </div>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="p-1.5 rounded-full text-[#837376] hover:bg-[#FFF7F9]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-[#837376]">
                <p>
                  You are about to publish <strong>"{formData.title}"</strong> to the Maison Privée public boutique at <strong>₹ {formData.price.toLocaleString("en-IN")} INR</strong>.
                </p>

                <div className="p-4 rounded-xl bg-[#FFF7F9] border border-[#E8D2B7] space-y-2">
                  <div className="flex items-center gap-2 text-[#3A0E1E] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Archival specifications will lock automatically</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#3A0E1E] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>5 Lookbook assets verified at 2400x3200px</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#3A0E1E] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Certificate of Authenticity generated</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8D2B7]">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#837376] hover:text-[#3A0E1E]"
                >
                  Return to Edit
                </button>
                <button
                  type="button"
                  onClick={handleFinalPublish}
                  className="px-6 py-3 rounded-full bg-[#3A0E1E] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#271C0B] shadow-md border border-[#D4AF37]/50"
                >
                  Publish to Boutique
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
