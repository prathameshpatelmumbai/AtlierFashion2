"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";

// Designer Components
import { GlobalHeader } from "@/components/navigation/GlobalHeader";
import { StudioOverview } from "@/components/studio/StudioOverview";
import { ListNewProductForm } from "@/components/studio/ListNewProductForm";
import { ListedProductsView } from "@/components/studio/ListedProductsView";
import { SoldProductsView } from "@/components/studio/SoldProductsView";
import { DraftsView } from "@/components/studio/DraftsView";
import { BoostedView } from "@/components/studio/BoostedView";
import { BoostModal } from "@/components/studio/BoostModal";
import { CustomOrdersView } from "@/components/custom-orders/CustomOrdersView";
import { OrdersLogisticsView } from "@/components/logistics/OrdersLogisticsView";
import { SalesInsightsView } from "@/components/insights/SalesInsightsView";
import { ProfileView } from "@/components/profile/ProfileView";

// Customer Components
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerDiscover } from "@/components/customer/CustomerDiscover";
import { CustomerProductDetail } from "@/components/customer/CustomerProductDetail";
import { CustomerBuyNowModal } from "@/components/customer/CustomerBuyNowModal";
import { CustomerCustomRequestModal } from "@/components/customer/CustomerCustomRequestModal";
import { CustomerCustomOrders } from "@/components/customer/CustomerCustomOrders";
import { CustomerOrders } from "@/components/customer/CustomerOrders";
import { CustomerDesigners } from "@/components/customer/CustomerDesigners";
import { CustomerProfile } from "@/components/customer/CustomerProfile";
import { AltierLogo } from "@/components/common/AltierLogo";
import { CustomerNotificationsModal } from "@/components/customer/CustomerNotificationsModal";
import { AiChatbot } from "@/components/chat/AiChatbot";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function StudioShell() {
  const { 
    portalMode,
    activeSection, 
    activeStudioTab, 
    customerSection,
    selectedProductId,
    setSelectedProductId,
    toastMessage,
    showToast
  } = useStudio();

  // Customer Modals State
  const [buyNowProduct, setBuyNowProduct] = useState<ListedProduct | null>(null);
  const [customRequestProduct, setCustomRequestProduct] = useState<ListedProduct | null>(null);
  const [isCustomRequestModalOpen, setIsCustomRequestModalOpen] = useState(false);

  const handleOpenBuyNow = (product: ListedProduct) => {
    setBuyNowProduct(product);
  };

  const handleOpenCustomRequest = (product?: ListedProduct) => {
    setCustomRequestProduct(product || null);
    setIsCustomRequestModalOpen(true);
  };

  // Render Studio Subtabs (Designer)
  const renderStudioContent = () => {
    switch (activeStudioTab) {
      case "overview":
        return <ListedProductsView />;
      case "list-new":
        return <ListNewProductForm />;
      case "listed":
        return <ListedProductsView />;
      case "sold":
        return <SoldProductsView />;
      case "drafts":
        return <DraftsView />;
      case "boosted":
        return <BoostedView />;
      default:
        return <ListedProductsView />;
    }
  };

  // Render Main Hub Views (Designer)
  const renderDesignerSection = () => {
    switch (activeSection) {
      case "studio":
        return renderStudioContent();
      case "custom-orders":
        return <CustomOrdersView />;
      case "orders-logistics":
        return <OrdersLogisticsView />;
      case "sales-insights":
        return <SalesInsightsView />;
      case "profile":
        return <ProfileView />;
      default:
        return renderStudioContent();
    }
  };

  // Render Customer Section
  const renderCustomerSection = () => {
    if (selectedProductId) {
      return (
        <CustomerProductDetail
          productId={selectedProductId}
          onOpenBuyNow={handleOpenBuyNow}
          onOpenCustomRequest={handleOpenCustomRequest}
          onBack={() => setSelectedProductId(null)}
        />
      );
    }

    switch (customerSection) {
      case "discover":
        return (
          <CustomerDiscover
            onOpenBuyNow={handleOpenBuyNow}
            onOpenCustomRequest={handleOpenCustomRequest}
          />
        );
      case "designers":
        return (
          <CustomerDesigners
            onOpenCustomRequest={handleOpenCustomRequest}
            onOpenBuyNow={handleOpenBuyNow}
          />
        );
      case "custom-orders":
        return (
          <CustomerCustomOrders
            onOpenNewCommission={() => handleOpenCustomRequest()}
          />
        );
      case "orders":
        return <CustomerOrders />;
      case "profile":
        return <CustomerProfile />;
      default:
        return (
          <CustomerDiscover
            onOpenBuyNow={handleOpenBuyNow}
            onOpenCustomRequest={handleOpenCustomRequest}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#231820]">
      {/* Dynamic Header according to Portal Mode */}
      {portalMode === "designer" ? (
        <GlobalHeader />
      ) : (
        <CustomerHeader />
      )}

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={
              portalMode === "designer"
                ? activeSection === "studio"
                  ? activeStudioTab
                  : activeSection
                : selectedProductId || customerSection
            }
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {portalMode === "designer" ? renderDesignerSection() : renderCustomerSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Designer Promotion Boost Modal */}
      {portalMode === "designer" && <BoostModal />}

      {/* Customer Modals */}
      {portalMode === "customer" && (
        <>
          {/* Buy Now Modal */}
          <CustomerBuyNowModal
            product={buyNowProduct}
            onClose={() => setBuyNowProduct(null)}
            onSuccess={() => {
              // Order created
            }}
          />

          {/* Custom Request Modal */}
          {isCustomRequestModalOpen && (
            <CustomerCustomRequestModal
              product={customRequestProduct}
              onClose={() => {
                setIsCustomRequestModalOpen(false);
                setCustomRequestProduct(null);
              }}
              onSuccess={() => {
                // Inquiry submitted
              }}
            />
          )}

          {/* Customer Notifications Drawer / Modal */}
          <CustomerNotificationsModal />
        </>
      )}

      {/* Global Toast Feedback Notification with Golden Shimmer Border */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#231820] text-white text-xs shadow-xl border border-[#D4AF37]/60"
          >
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium text-[#F6DFC4]">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RAG-Powered AI Chatbot (Available for both Customer & Designer portals) */}
      <AiChatbot />

      {/* ALTIER Maison Privée Curated Footer */}
      <footer className="w-full bg-[#3a0e1e] border-t border-[#d5c2c5]/20 py-8 text-white/90 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <AltierLogo height={32} variant="horizontal" theme="dark" />
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-xs text-white/60 tracking-wider">
              {portalMode === "designer"
                ? "Haute Couture Designer Collective & Atelier"
                : "Curated Haute Couture & Bespoke Commissioning Boutique"}
            </span>
          </div>
          <div className="text-[11px] tracking-widest uppercase text-white/50">
            © 2025 ALTIER MAISON PRIVÉE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
