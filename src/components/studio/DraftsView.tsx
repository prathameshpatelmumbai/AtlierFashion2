"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { DraftProduct } from "@/types/studio";
import { 
  Trash2, 
  ArrowRight, 
  AlertTriangle, 
  Plus, 
  Flame, 
  CheckCircle2, 
  X,
  Camera,
  Archive,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DraftsView: React.FC = () => {
  const { 
    drafts, 
    startEditingDraft, 
    deleteDraft, 
    setActiveStudioTab, 
    startNewListing,
    listedProducts,
    showToast 
  } = useStudio();

  const [deleteConfirmDraft, setDeleteConfirmDraft] = useState<DraftProduct | null>(null);
  const [showZeroStatePreview, setShowZeroStatePreview] = useState(false);

  const handleConfirmDelete = () => {
    if (deleteConfirmDraft) {
      deleteDraft(deleteConfirmDraft.id);
      showToast(`Draft "${deleteConfirmDraft.title}" discarded from salon.`);
      setDeleteConfirmDraft(null);
    }
  };

  const getStepProgress = (step: number) => {
    switch (step) {
      case 1: return { label: "Step 1 of 5 Completed: Product Details", percent: 20 };
      case 2: return { label: "Step 2 of 5 Completed: Fit & Measurements", percent: 40 };
      case 3: return { label: "Step 3 of 5 Completed: Visual Lookbook", percent: 60 };
      case 4: return { label: "Step 4 of 5 Completed: Fabric & Care", percent: 80 };
      case 5: return { label: "Step 5 of 5 Completed: Pricing & Fulfilment", percent: 100 };
      default: return { label: "Step 1 of 5 Completed: Product Details", percent: 20 };
    }
  };

  return (
    <div className="flex flex-col w-full space-y-8 animate-fadeIn">
      
      {/* SECONDARY ATELIER SUB-NAVIGATION BAR */}
      <div className="w-full bg-[#ffeff8]/80 backdrop-blur-md px-4 sm:px-8 py-0 rounded-2xl border border-[#d5c2c5]/40 shadow-xs">
        <div className="w-full max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-y-2">
          <nav className="flex items-stretch overflow-x-auto gap-6 sm:gap-8">
            <button
              onClick={() => {
                startNewListing();
                setActiveStudioTab("list-new");
              }}
              className="group inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#837376] hover:text-[#3a0e1e] transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-[#865040]" />
              <span>List New Product</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("listed")}
              className="group inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#837376] hover:text-[#3a0e1e] transition-colors whitespace-nowrap"
            >
              <span>Listed Products</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f6e3ef] text-[#837376] text-[11px] font-semibold">24</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("sold")}
              className="group inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#837376] hover:text-[#3a0e1e] transition-colors whitespace-nowrap"
            >
              <span>Sold Products</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f6e3ef] text-[#837376] text-[11px] font-semibold">18</span>
            </button>

            {/* ACTIVE TAB: DRAFTS (3) */}
            <div className="relative inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#3a0e1e] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb9a4]"></span>
              <span>Drafts</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#542333] text-white text-[11px] font-semibold">
                {drafts.length}
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3a0e1e]"></div>
            </div>

            <button
              onClick={() => setActiveStudioTab("boosted")}
              className="group inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#837376] hover:text-[#3a0e1e] transition-colors whitespace-nowrap"
            >
              <span>Boosted for Promotion</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f6e3ef] text-[#837376] text-[11px] font-semibold">4</span>
            </button>
          </nav>

          <div className="hidden xl:flex items-center gap-2 text-[#837376] text-xs uppercase tracking-wider py-4 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#865040]" />
            <span>Archive Auto-Sync Active</span>
          </div>
        </div>
      </div>

      {/* EDITORIAL LEDGER HEADER */}
      <div className="w-full pt-4 pb-2">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#865040]">
                Atelier Curatorial Workspace
              </span>
              <span className="w-1 h-1 rounded-full bg-[#865040]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#837376]">
                Unpublished Works
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3a0e1e] tracking-tight mt-1">
              Draft Creations & In-Progress Listings
            </h1>

            <p className="text-sm text-[#837376] max-w-2xl leading-relaxed mt-1">
              Archival drafts saved in your private salon. Resume editing where you left off or discard abandoned prototypes before synchronization to the public showroom.
            </p>
          </div>

          {/* SUMMARY METRIC COUNTERS */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-[#fce9f4]/80 backdrop-blur-md p-4 rounded-xl border border-[#d5c2c5]/40 shadow-xs">
            <div className="px-4 py-2 flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#837376] font-semibold">Active Drafts</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-editorial text-2xl font-bold text-[#3a0e1e]">{drafts.length}</span>
                <span className="text-xs text-[#837376]">in progress</span>
              </div>
            </div>

            <div className="w-px h-10 bg-[#d5c2c5]/50 hidden sm:block"></div>

            <div className="px-4 py-2 flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#837376] font-semibold">Last Auto-Save</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#865040] animate-pulse"></span>
                <span className="text-xs font-semibold text-[#3a0e1e] tracking-normal">Today, 14:32</span>
              </div>
            </div>

            <div className="w-px h-10 bg-[#d5c2c5]/50 hidden sm:block"></div>

            <div className="px-4 py-2 flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#837376] font-semibold">Auto Delete</span>
              <span className="text-xs font-semibold text-[#3a0e1e] mt-1 tracking-normal">72 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* DRAFTS LEDGER BODY */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6">
        {drafts.map((draft) => {
          const stepInfo = getStepProgress(draft.currentStep || 1);
          const hasImage = draft.images && draft.images.length > 0;
          const imageSrc = hasImage ? draft.images[0] : null;
          const photoCount = draft.photoSetCount || (hasImage ? draft.images.length : 0);

          return (
            <article
              key={draft.id}
              className="group bg-white rounded-xl p-6 lg:p-8 shadow-xs hover:shadow-md border border-[#d5c2c5]/40 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#874d5e]/50"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1 min-w-0">
                {/* Thumbnail or Placeholder slot */}
                {hasImage ? (
                  <div className="relative w-full sm:w-36 h-44 sm:h-36 shrink-0 rounded-lg overflow-hidden bg-[#fce9f4] border border-[#d5c2c5]/40 shadow-inner">
                    <img
                      src={imageSrc!}
                      alt={draft.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#3a0e1e]/90 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider">
                      Photo Set ({photoCount})
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full sm:w-36 h-44 sm:h-36 shrink-0 rounded-lg overflow-hidden bg-[#fce9f4] border border-dashed border-[#837376]/40 flex flex-col items-center justify-center p-3 text-center">
                    <Camera className="w-8 h-8 text-[#837376] mb-1.5" />
                    <span className="text-[10px] font-semibold text-[#837376] uppercase tracking-wider leading-tight">
                      No Cover Image Uploaded
                    </span>
                  </div>
                )}

                {/* Metadata & Details */}
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#865040]">
                      {draft.subcategory || draft.category || "Uncategorized Draft"}
                    </span>
                    <span className="text-[#d5c2c5]">•</span>
                    <span className="text-[11px] font-mono text-[#837376]">
                      {draft.draftCode || `#DRF-2024-${draft.id.slice(-4)}`}
                    </span>
                  </div>

                  <h2 className={`font-editorial text-2xl font-semibold text-[#3a0e1e] tracking-tight truncate ${!hasImage ? "italic" : ""}`}>
                    {draft.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-[#837376]">
                    <span className={`inline-block w-2 h-2 rounded-full ${hasImage ? "bg-[#865040]" : "bg-[#837376]"}`}></span>
                    <span>{draft.lastSaved || "Saved recently"}</span>
                  </div>

                  {/* 5-Stage Step Completion Tracker */}
                  <div className="mt-3 flex flex-col gap-1.5 max-w-md">
                    <div className="flex items-center justify-between text-xs text-[#837376] uppercase tracking-wider">
                      <span className="text-[#3a0e1e] font-semibold">{stepInfo.label}</span>
                      <span className="font-semibold">{stepInfo.percent}%</span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 w-full h-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`h-full rounded-sm transition-all ${
                            s <= (draft.currentStep || 1)
                              ? "bg-[#542333]"
                              : "bg-[#f6e3ef]"
                          }`}
                          title={`Step ${s}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Valuation & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#d5c2c5]/40">
                <div className="flex flex-col sm:items-end">
                  <span className="text-[11px] uppercase tracking-wider text-[#837376] font-semibold">
                    Est. Valuation
                  </span>
                  {draft.price && draft.price > 0 ? (
                    <span className="font-editorial text-2xl font-bold text-[#3a0e1e]">
                      ₹ {draft.price.toLocaleString("en-IN")}
                    </span>
                  ) : draft.id === "draft-002" ? (
                    <span className="font-editorial text-base text-[#837376] italic">
                      Valuation: Pending
                    </span>
                  ) : (
                    <span className="font-editorial text-base text-[#837376] italic">
                      Unspecified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setDeleteConfirmDraft(draft)}
                    className="px-4 py-3 rounded-lg bg-[#ffeff8] text-[#837376] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-semibold border border-[#d5c2c5]/40"
                    title="Delete Draft"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Discard</span>
                  </button>

                  <button
                    onClick={() => startEditingDraft(draft.id)}
                    className="px-6 py-3 rounded-lg bg-[#542333] hover:bg-[#3a0e1e] text-white transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs"
                    type="button"
                  >
                    <span>Continue Editing</span>
                    <ArrowRight className="w-4 h-4 text-[#fcb2c6]" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ZERO-STATE REFERENCE SECTION / ARCHIVAL NOTICE */}
      <div className="w-full max-w-[1600px] mx-auto mt-8 pt-4">
        <div className="w-full rounded-2xl bg-[#ffeff8] border border-[#d5c2c5]/50 p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#fce9f4] border border-[#d5c2c5]/40 flex items-center justify-center shrink-0">
              <Archive className="w-8 h-8 text-[#3a0e1e]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#865040]">
                Salon Archive Status
              </span>
              <h3 className="font-editorial text-2xl font-semibold text-[#3a0e1e] mt-1">
                Ready for New Catalogued Masterpieces
              </h3>
              <p className="text-xs text-[#837376] mt-1 max-w-xl leading-relaxed">
                All your bespoke creations can be either published directly to listed products or saved locally with progressive 30-day retention guarantee.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setShowZeroStatePreview(!showZeroStatePreview)}
              className="px-5 py-3 rounded-lg bg-white border border-[#d5c2c5]/60 text-[#231820] hover:bg-[#fce9f4] transition-colors text-xs uppercase tracking-wider font-semibold"
              type="button"
            >
              {showZeroStatePreview ? "Hide Zero-State" : "Preview Zero-State"}
            </button>

            <button
              onClick={() => {
                startNewListing();
                setActiveStudioTab("list-new");
              }}
              className="px-6 py-3 rounded-lg bg-[#542333] hover:bg-[#3a0e1e] text-white transition-colors text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-xs"
              type="button"
            >
              <Plus className="w-4 h-4 text-[#fcb2c6]" />
              <span>Start New Creation</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE TOGGLEABLE ZERO-STATE PREVIEW CONTAINER */}
        <AnimatePresence>
          {showZeroStatePreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 w-full rounded-2xl bg-white p-12 text-center shadow-xs border border-[#d5c2c5]/50 overflow-hidden"
            >
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#fce9f4] flex items-center justify-center mb-6 border border-[#d5c2c5]/40">
                  <Archive className="w-10 h-10 text-[#837376]" />
                </div>
                <h4 className="font-editorial text-2xl font-semibold text-[#3a0e1e]">
                  No Active Drafts in Salon Archive
                </h4>
                <p className="text-xs text-[#837376] mt-3 leading-relaxed">
                  All your bespoke creations have been either catalogued in listed products or archived in the acquisition ledger.
                </p>
                <button
                  onClick={() => {
                    startNewListing();
                    setActiveStudioTab("list-new");
                  }}
                  className="mt-6 px-8 py-3.5 rounded-lg bg-[#542333] hover:bg-[#3a0e1e] text-white transition-colors text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 shadow-xs"
                  type="button"
                >
                  <Plus className="w-4 h-4 text-[#fcb2c6]" />
                  <span>Start New Creation</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DISCARD DRAFT CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmDraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#d5c2c5] shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#d5c2c5]/40">
                <div className="flex items-center gap-2 text-[#ba1a1a]">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-editorial text-xl font-bold text-[#231820]">
                    Discard Archival Draft?
                  </h3>
                </div>
                <button
                  onClick={() => setDeleteConfirmDraft(null)}
                  className="p-1 rounded-full text-[#837376] hover:bg-[#ffeff8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-[#837376] leading-relaxed">
                You are about to discard <strong>"{deleteConfirmDraft.title}"</strong> ({deleteConfirmDraft.draftCode || `#DRF-${deleteConfirmDraft.id}`}). Any recorded fit measurements and textile formulas will be removed permanently.
              </p>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => setDeleteConfirmDraft(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#837376] hover:text-[#3a0e1e]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2.5 rounded-lg bg-[#ba1a1a] hover:bg-rose-900 text-white text-xs uppercase tracking-wider font-semibold shadow-xs"
                >
                  Confirm Discard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
