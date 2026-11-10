"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ListedProduct,
  SoldProduct,
  DraftProduct,
  BoostCampaign,
  ProductFormData,
  CustomOrder,
  QuotationData,
  LogisticsOrder,
  CourierPickupSchedule,
  ReturnExchangeRequest,
  DesignerProfile,
  CustomerProfile,
  NotificationItem,
  TransactionRecord,
  SubscriptionTier,
  SubscriptionInfo
} from "@/types/studio";
import {
  INITIAL_LISTED_PRODUCTS,
  INITIAL_SOLD_PRODUCTS,
  INITIAL_DRAFTS,
  INITIAL_BOOST_CAMPAIGNS,
  INITIAL_CUSTOM_ORDERS,
  INITIAL_LOGISTICS_ORDERS,
  INITIAL_DESIGNERS,
  INITIAL_CUSTOMER_PROFILE,
  INITIAL_NOTIFICATIONS,
  INITIAL_TRANSACTIONS,
  INITIAL_SUBSCRIPTION_INFO
} from "@/lib/mock-data";

interface StudioContextType {
  // Mode Switcher: Designer vs Customer
  portalMode: "designer" | "customer";
  setPortalMode: (mode: "designer" | "customer") => void;

  // Designer Navigation
  activeSection: "studio" | "custom-orders" | "orders-logistics" | "sales-insights" | "profile";
  setActiveSection: (sec: "studio" | "custom-orders" | "orders-logistics" | "sales-insights" | "profile") => void;
  activeStudioTab: "overview" | "list-new" | "listed" | "sold" | "drafts" | "boosted";
  setActiveStudioTab: (tab: "overview" | "list-new" | "listed" | "sold" | "drafts" | "boosted") => void;

  // Customer Navigation: Discover | Catalog | Uvibe | Designers | Orders | Custom Orders
  customerSection: "discover" | "catalog" | "uvibe" | "designers" | "orders" | "custom-orders" | "profile";
  setCustomerSection: (sec: "discover" | "catalog" | "uvibe" | "designers" | "orders" | "custom-orders" | "profile") => void;
  activeGender: "men" | "women" | "kids";
  setActiveGender: (gender: "men" | "women" | "kids") => void;
  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (cat: string | null) => void;
  catalogLayout: "grid" | "dense";
  setCatalogLayout: (layout: "grid" | "dense") => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedDesignerId: string | null;
  setSelectedDesignerId: (id: string | null) => void;

  // Cart Management
  cartItems: Array<{ id: string; title: string; price: number; image: string; size: string; color: string; quantity: number }>;
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: { id: string; title: string; price: number; image: string; size?: string; color?: string; quantity?: number }) => void;
  removeFromCart: (id: string) => void;

  // Uvibe AI Engine State
  uvibePrompt: string;
  setUvibePrompt: (p: string) => void;

  // Product Catalogue (Shared)
  listedProducts: ListedProduct[];
  designers: DesignerProfile[];
  updateStock: (productId: string, newStock: number) => void;
  delistProduct: (productId: string) => void;
  relistProduct: (productId: string) => void;
  deleteProduct: (productId: string) => void;

  // Listing creation & drafts (Designer)
  editingDraftId: string | null;
  startNewListing: () => void;
  startEditingDraft: (draftId: string) => void;
  publishNewProduct: (formData: ProductFormData) => void;
  soldProducts: SoldProduct[];
  drafts: DraftProduct[];
  saveDraft: (formData: Partial<ProductFormData>, step: number, draftId?: string) => string;
  deleteDraft: (draftId: string) => void;

  // Boost Flow (Designer)
  boostCampaigns: BoostCampaign[];
  boostModalProduct: ListedProduct | null;
  openBoostModal: (product: ListedProduct) => void;
  closeBoostModal: () => void;
  applyBoost: (productId: string, plan: "Atelier Curated Spotlight" | "Fashion Week Premier Carousel" | "High-End Collectors Reach", cost: number) => void;

  // Notifications & Toast
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: (audience: "designer" | "customer") => void;
  designerNotificationCount: number;
  customerNotificationCount: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Header Utilities Modal
  activeUtilityModal: "notifications" | "transactions" | "subscription" | null;
  openUtilityModal: (m: "notifications" | "transactions" | "subscription") => void;
  closeUtilityModal: () => void;

  // Customer Utilities: Search & Notifications Modal
  customerSearchQuery: string;
  setCustomerSearchQuery: (q: string) => void;
  customerNotificationsOpen: boolean;
  setCustomerNotificationsOpen: (open: boolean) => void;

  // Transactions & Subscription (Designer)
  transactions: TransactionRecord[];
  subscription: SubscriptionInfo;
  changeSubscriptionTier: (tier: SubscriptionTier) => void;

  // Profile Management (Designer & Customer)
  designerProfile: DesignerProfile;
  customerProfile: CustomerProfile;
  updatePersonalDetails: (personal: DesignerProfile["personalDetails"]) => void;
  updateBrandDetails: (brand: DesignerProfile["brandDetails"]) => void;
  updateBusinessAddress: (addr: DesignerProfile["businessAddress"]) => void;
  updateBankDetails: (newAcc: string, newIfsc: string, upi: string) => void;
  updateCustomerProfile: (prof: Partial<CustomerProfile>) => void;

  // ==========================================
  // CUSTOM ORDERS (CONNECTED FOR BOTH SIDES)
  // ==========================================
  customOrders: CustomOrder[];
  activeCustomOrdersTab: "new-inquiries" | "in-progress" | "completed";
  setActiveCustomOrdersTab: (tab: "new-inquiries" | "in-progress" | "completed") => void;
  activeInquirySubTab: "your-listed-product" | "new-customized-order";
  setActiveInquirySubTab: (subTab: "your-listed-product" | "new-customized-order") => void;

  // Custom Order Actions
  submitExistingProductCustomization: (productId: string, request: {
    requestedSize: string;
    requestedColour: string;
    requestedFabric: string;
    otherAlterations: string;
    measurements?: { bust?: string; waist?: string; hips?: string; length?: string };
    customerNotes?: string;
  }) => void;
  submitNewCustomizedOrder: (request: {
    referenceImage: string;
    requestedDesign: string;
    measurements: string;
    colour: string;
    fabric: string;
    alterationDetails: string;
    customerNotes?: string;
  }) => void;
  sendQuotation: (orderId: string, quote: QuotationData) => void;
  cancelCustomOrder: (orderId: string, reason?: string) => void;
  customerAcceptQuotation: (orderId: string) => void;
  customerDeclineQuotation: (orderId: string) => void;
  customerPayAdvancePayment: (orderId: string) => void;
  startCustomOrder: (orderId: string) => void;
  completeCustomOrder: (orderId: string) => void;

  // ==========================================
  // DIRECT LISTED PRODUCT BUY NOW (CUSTOMER)
  // ==========================================
  customerBuyNowProduct: (productId: string, quantity: number, deliveryInfo: { address: string; city: string; state: string; pin: string }) => string;

  // ==========================================
  // ORDERS & LOGISTICS (SHARED)
  // ==========================================
  logisticsOrders: LogisticsOrder[];
  activeLogisticsTab: "ready-to-dispatch" | "shipped-delivered" | "returns-exchanges";
  setActiveLogisticsTab: (tab: "ready-to-dispatch" | "shipped-delivered" | "returns-exchanges") => void;
  schedulePickup: (orderId: string, schedule: CourierPickupSchedule) => void;
  submitCustomerReturnExchange: (orderId: string, request: {
    requestType: "Return" | "Exchange";
    customerReason: string;
    customerComments: string;
    supportingImages?: string[];
  }) => void;
  updateReturnExchangeStatus: (orderId: string, actionType: "Accept" | "Dispute" | "Arrange Return Pickup" | "Process Exchange" | "Refund") => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  // Top Level Mode: "customer" (default) vs "designer"
  const [portalMode, setPortalModeState] = useState<"designer" | "customer">("customer");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("atelier_portal_mode") as "designer" | "customer" | null;
      if (saved && (saved === "designer" || saved === "customer")) {
        setPortalModeState(saved);
      } else {
        setPortalModeState("customer");
      }
    }
  }, []);

  const setPortalMode = (mode: "designer" | "customer") => {
    setPortalModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("atelier_portal_mode", mode);
    }
  };

  // Designer Navigation State
  const [activeSection, setActiveSection] = useState<"studio" | "custom-orders" | "orders-logistics" | "sales-insights" | "profile">("studio");
  const [activeStudioTab, setActiveStudioTab] = useState<"overview" | "list-new" | "listed" | "sold" | "drafts" | "boosted">("listed");

  // Customer Navigation State
  const [customerSection, setCustomerSection] = useState<"discover" | "catalog" | "uvibe" | "designers" | "orders" | "custom-orders" | "profile">("discover");
  const [activeGender, setActiveGender] = useState<"men" | "women" | "kids">("men");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [catalogLayout, setCatalogLayout] = useState<"grid" | "dense">("grid");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedDesignerId, setSelectedDesignerId] = useState<string | null>(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [customerNotificationsOpen, setCustomerNotificationsOpen] = useState(false);

  // Cart State (Initialized with 3 items matching badges across reference screenshots)
  const [cartItems, setCartItems] = useState<Array<{ id: string; title: string; price: number; image: string; size: string; color: string; quantity: number }>>([
    {
      id: "cart-1",
      title: "Double-Breasted Cashmere Peacoat",
      price: 62000,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      size: "48 EU",
      color: "Midnight Charcoal",
      quantity: 1
    },
    {
      id: "cart-2",
      title: "The Organza Saree Reimagined",
      price: 48000,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
      size: "Free Size",
      color: "Mulberry Gold",
      quantity: 1
    },
    {
      id: "cart-3",
      title: "Gilded Velvet Gala Column Gown",
      price: 68000,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop",
      size: "S (IT 40)",
      color: "Deep Burgundy",
      quantity: 1
    }
  ]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: { id: string; title: string; price: number; image: string; size?: string; color?: string; quantity?: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i));
      }
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          size: item.size || "Standard",
          color: item.color || "Atelier Classic",
          quantity: item.quantity || 1
        }
      ];
    });
    showToast(`Added "${item.title}" to your Atelier Private Bag`);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast("Item removed from your bag");
  };

  // Uvibe Prompt State
  const [uvibePrompt, setUvibePrompt] = useState("An elegant burgundy velvet gown with gold embroidery");

  // Core Data
  const [listedProducts, setListedProducts] = useState<ListedProduct[]>(INITIAL_LISTED_PRODUCTS);
  const [designers] = useState<DesignerProfile[]>(INITIAL_DESIGNERS);
  const [soldProducts, setSoldProducts] = useState<SoldProduct[]>(INITIAL_SOLD_PRODUCTS);
  const [drafts, setDrafts] = useState<DraftProduct[]>(INITIAL_DRAFTS);
  const [boostCampaigns, setBoostCampaigns] = useState<BoostCampaign[]>(INITIAL_BOOST_CAMPAIGNS);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [boostModalProduct, setBoostModalProduct] = useState<ListedProduct | null>(null);

  // Notifications, Toast & Utilities
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeUtilityModal, setActiveUtilityModal] = useState<"notifications" | "transactions" | "subscription" | null>(null);

  // Transactions & Subscription
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [subscription, setSubscription] = useState<SubscriptionInfo>(INITIAL_SUBSCRIPTION_INFO);
  const [designerProfile, setDesignerProfile] = useState<DesignerProfile>(INITIAL_DESIGNERS[0]);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(INITIAL_CUSTOMER_PROFILE);

  // Custom Orders State
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(INITIAL_CUSTOM_ORDERS);
  const [activeCustomOrdersTab, setActiveCustomOrdersTab] = useState<"new-inquiries" | "in-progress" | "completed">("new-inquiries");
  const [activeInquirySubTab, setActiveInquirySubTab] = useState<"your-listed-product" | "new-customized-order">("your-listed-product");

  // Logistics State
  const [logisticsOrders, setLogisticsOrders] = useState<LogisticsOrder[]>(INITIAL_LOGISTICS_ORDERS);
  const [activeLogisticsTab, setActiveLogisticsTab] = useState<"ready-to-dispatch" | "shipped-delivered" | "returns-exchanges">("ready-to-dispatch");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const designerNotificationCount = notifications.filter((n) => !n.read && n.audience === "designer").length;
  const customerNotificationCount = notifications.filter((n) => !n.read && n.audience === "customer").length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = (audience: "designer" | "customer") => {
    setNotifications((prev) => prev.map((n) => n.audience === audience ? { ...n, read: true } : n));
    showToast("Notifications marked as read.");
  };

  const openUtilityModal = (m: "notifications" | "transactions" | "subscription") => {
    setActiveUtilityModal(m);
  };

  const closeUtilityModal = () => {
    setActiveUtilityModal(null);
  };

  const changeSubscriptionTier = (tier: SubscriptionTier) => {
    setSubscription((prev) => ({ ...prev, currentTier: tier }));
    showToast(`Atelier subscription plan updated to ${tier}.`);
  };

  // Designer Profile actions
  const updatePersonalDetails = (personal: DesignerProfile["personalDetails"]) => {
    setDesignerProfile((prev) => ({ ...prev, personalDetails: personal }));
    showToast("Personal details saved successfully.");
  };

  const updateBrandDetails = (brand: DesignerProfile["brandDetails"]) => {
    setDesignerProfile((prev) => ({ ...prev, brandDetails: brand }));
    showToast("Brand credentials updated.");
  };

  const updateBusinessAddress = (addr: DesignerProfile["businessAddress"]) => {
    setDesignerProfile((prev) => ({ ...prev, businessAddress: addr }));
    showToast("Pickup and workshop address updated.");
  };

  const updateBankDetails = (newAcc: string, newIfsc: string, upi: string) => {
    const masked = `•••• •••• •••• ${newAcc.slice(-4) || "0000"}`;
    setDesignerProfile((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        accountNumberMasked: masked,
        rawAccountNumber: newAcc,
        ifscCode: newIfsc,
        upiId: upi
      }
    }));
    showToast("Settlement bank details confirmed and updated.");
  };

  const updateCustomerProfile = (prof: Partial<CustomerProfile>) => {
    setCustomerProfile((prev) => ({ ...prev, ...prof }));
    showToast("Customer profile details updated successfully.");
  };

  // Designer Catalog Actions
  const updateStock = (productId: string, newStock: number) => {
    setListedProducts((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
            ...item,
            availableStock: newStock,
            status: newStock === 0 ? "SOLD_OUT" : "ACTIVE",
          }
          : item
      )
    );
    showToast(`Stock updated to ${newStock} units`);
  };

  const delistProduct = (productId: string) => {
    setListedProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, status: "DELISTED" } : item
      )
    );
    showToast("Product removed from customer-facing catalogue");
  };

  const relistProduct = (productId: string) => {
    setListedProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, status: "ACTIVE" } : item
      )
    );
    showToast("Product re-activated in catalogue");
  };

  const deleteProduct = (productId: string) => {
    setListedProducts((prev) => prev.filter((item) => item.id !== productId));
    showToast("Product listing deleted permanently");
  };

  const startNewListing = () => {
    setEditingDraftId(null);
    setActiveStudioTab("list-new");
  };

  const startEditingDraft = (draftId: string) => {
    setEditingDraftId(draftId);
    setActiveStudioTab("list-new");
  };

  const saveDraft = (formData: Partial<ProductFormData>, step: number, draftId?: string): string => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}, ${now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const idToUse = draftId || editingDraftId || `draft-${Date.now()}`;

    setDrafts((prev) => {
      const existing = prev.find((d) => d.id === idToUse);
      if (existing) {
        return prev.map((d) =>
          d.id === idToUse
            ? {
              ...d,
              title: formData.title || d.title || "Untitled Creation Draft",
              category: formData.category || d.category,
              subcategory: formData.subcategory || d.subcategory,
              tags: formData.tags || d.tags,
              images: formData.images || d.images,
              currentStep: step,
              lastSaved: formattedDate,
              price: formData.price,
              isOneOfOne: formData.isOneOfOne,
              availableStock: formData.isOneOfOne ? 1 : formData.quantity || 1,
              formData: { ...d.formData, ...formData },
            }
            : d
        );
      } else {
        const newDraft: DraftProduct = {
          id: idToUse,
          title: formData.title || "Untitled Creation Draft",
          category: formData.category,
          subcategory: formData.subcategory,
          tags: formData.tags || [],
          images: formData.images || [],
          currentStep: step,
          lastSaved: formattedDate,
          price: formData.price,
          isOneOfOne: formData.isOneOfOne,
          availableStock: formData.isOneOfOne ? 1 : formData.quantity || 1,
          formData,
        };
        return [newDraft, ...prev];
      }
    });

    setEditingDraftId(idToUse);
    return idToUse;
  };

  const deleteDraft = (draftId: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== draftId));
    if (editingDraftId === draftId) {
      setEditingDraftId(null);
    }
    showToast("Draft deleted");
  };

  const publishNewProduct = (formData: ProductFormData) => {
    const newProduct: ListedProduct = {
      id: `prod-${Date.now()}`,
      title: formData.title,
      designerName: designerProfile.personalDetails.designerName,
      brandName: designerProfile.brandDetails.brandName,
      designerId: designerProfile.id,
      category: formData.category,
      subcategory: formData.subcategory,
      tags: formData.tags,
      price: formData.price,
      currency: "INR",
      availableStock: formData.isOneOfOne ? 1 : formData.quantity,
      initialStock: formData.isOneOfOne ? 1 : formData.quantity,
      isOneOfOne: formData.isOneOfOne,
      images: formData.images.length > 0 ? formData.images : [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
      ],
      sizes: formData.standardSizes,
      measurements: formData.measurements,
      fitType: formData.fitType,
      stretchability: formData.stretchability,
      materials: formData.materials,
      lining: formData.lining,
      careInstructions: formData.careInstructions,
      shippingMode: formData.shippingMode,
      packageDimensions: formData.packageDimensions,
      packageWeight: formData.packageWeight,
      status: "ACTIVE",
      isBoosted: false,
      viewsCount: 1,
      orderCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    if (editingDraftId) {
      setDrafts((prev) => prev.filter((d) => d.id !== editingDraftId));
      setEditingDraftId(null);
    }

    setListedProducts((prev) => [newProduct, ...prev]);
    setActiveStudioTab("listed");
    showToast("Creation listed successfully in your Atelier catalogue!");
  };

  const openBoostModal = (product: ListedProduct) => {
    setBoostModalProduct(product);
  };

  const closeBoostModal = () => {
    setBoostModalProduct(null);
  };

  const applyBoost = (
    productId: string,
    plan: "Atelier Curated Spotlight" | "Fashion Week Premier Carousel" | "High-End Collectors Reach",
    cost: number
  ) => {
    const product = listedProducts.find((p) => p.id === productId);
    if (!product) return;

    setListedProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
            ...p,
            isBoosted: true,
            boostExpiry: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
          }
          : p
      )
    );

    const newCampaign: BoostCampaign = {
      id: `boost-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productImage: product.images[0] || "",
      planName: plan,
      status: "ACTIVE",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      cost,
      impressions: 120,
      clicks: 14,
      saves: 6,
    };

    setBoostCampaigns((prev) => [newCampaign, ...prev]);
    closeBoostModal();
    setActiveStudioTab("boosted");
    showToast(`Promotion campaign activated for "${product.title}"`);
  };

  // ==========================================
  // CUSTOM ORDERS ACTIONS (CROSS-PORTAL)
  // ==========================================

  // Customer requests customisation on an existing listed product
  const submitExistingProductCustomization = (productId: string, request: {
    requestedSize: string;
    requestedColour: string;
    requestedFabric: string;
    otherAlterations: string;
    measurements?: { bust?: string; waist?: string; hips?: string; length?: string };
    customerNotes?: string;
  }) => {
    const product = listedProducts.find((p) => p.id === productId);
    if (!product) return;

    const newOrderNumber = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCustomOrder: CustomOrder = {
      id: `co-${Date.now()}`,
      orderNumber: newOrderNumber,
      inquiryType: "YOUR_LISTED_PRODUCT",
      lifecycleStatus: "INQUIRY_RECEIVED",
      customerName: customerProfile.customerName,
      customerCity: `${customerProfile.deliveryAddress.city}, ${customerProfile.deliveryAddress.state}`,
      customerPhone: customerProfile.phone,
      customerEmail: customerProfile.email,
      customerNotes: request.customerNotes,
      designerName: product.designerName,
      brandName: product.brandName,
      baseProduct: {
        id: product.id,
        title: product.title,
        thumbnail: product.images[0],
        originalPrice: product.price,
        shippingMode: product.shippingMode,
        status: product.status === "SOLD_OUT" ? "SOLD_OUT" : "LISTED",
        category: product.category,
        designerName: product.designerName,
        brandName: product.brandName
      },
      requestedAlterations: {
        requestedSize: request.requestedSize,
        requestedColour: request.requestedColour,
        requestedFabric: request.requestedFabric,
        otherAlterations: request.otherAlterations,
        measurements: request.measurements
      },
      orderHistory: [
        {
          stage: "Inquiry Submitted",
          timestamp: new Date().toLocaleString(),
          note: `Customer submitted custom alteration request for ${product.title}.`
        }
      ]
    };

    // Add to shared customOrders
    setCustomOrders((prev) => [newCustomOrder, ...prev]);

    // Send notification to designer
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "New custom inquiry",
      title: "New Customization Request",
      shortDescription: `${customerProfile.customerName} requested custom alterations for "${product.title}".`,
      timestamp: "Just now",
      read: false,
      audience: "designer"
    };
    setNotifications((prev) => [notif, ...prev]);

    // Switch customer to Custom Orders section
    setSelectedProductId(null);
    setCustomerSection("custom-orders");
    showToast(`Customization request #${newOrderNumber} sent to ${product.designerName}!`);
  };

  // Customer creates a 100% brand new customized garment
  const submitNewCustomizedOrder = (request: {
    referenceImage: string;
    requestedDesign: string;
    measurements: string;
    colour: string;
    fabric: string;
    alterationDetails: string;
    customerNotes?: string;
  }) => {
    const newOrderNumber = `BESP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCustomOrder: CustomOrder = {
      id: `co-${Date.now()}`,
      orderNumber: newOrderNumber,
      inquiryType: "NEW_CUSTOMIZED_ORDER",
      lifecycleStatus: "INQUIRY_RECEIVED",
      customerName: customerProfile.customerName,
      customerCity: `${customerProfile.deliveryAddress.city}, ${customerProfile.deliveryAddress.state}`,
      customerPhone: customerProfile.phone,
      customerEmail: customerProfile.email,
      customerNotes: request.customerNotes,
      designerName: designerProfile.personalDetails.designerName,
      brandName: designerProfile.brandDetails.brandName,
      newGarmentReference: {
        referenceImage: request.referenceImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
        requestedDesign: request.requestedDesign,
        measurements: request.measurements,
        colour: request.colour,
        fabric: request.fabric,
        alterationDetails: request.alterationDetails,
        customerNotes: request.customerNotes
      },
      requestedAlterations: {
        otherAlterations: request.alterationDetails
      },
      orderHistory: [
        {
          stage: "Bespoke Request Submitted",
          timestamp: new Date().toLocaleString(),
          note: `Customer submitted new bespoke garment specifications.`
        }
      ]
    };

    setCustomOrders((prev) => [newCustomOrder, ...prev]);

    // Add designer notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "New custom inquiry",
      title: "New Bespoke Commission Request",
      shortDescription: `${customerProfile.customerName} submitted a new bespoke commission inquiry.`,
      timestamp: "Just now",
      read: false,
      audience: "designer"
    };
    setNotifications((prev) => [notif, ...prev]);

    setCustomerSection("custom-orders");
    showToast(`Bespoke request #${newOrderNumber} sent! The designer will review and issue a quotation.`);
  };

  // Designer sends a quotation
  const sendQuotation = (orderId: string, quote: QuotationData) => {
    const quoteWithDate: QuotationData = { 
      ...quote, 
      sentDate: new Date().toLocaleDateString("en-GB"),
      status: "Pending Customer Review" 
    };

    setCustomOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          lifecycleStatus: "QUOTATION_SENT",
          quotation: quoteWithDate,
          advancePaymentAmount: Math.round(quote.finalPrice * 0.4), // 40% advance standard
          orderHistory: [
            ...order.orderHistory,
            {
              stage: "Quotation Sent",
              timestamp: new Date().toLocaleString(),
              note: `Designer quoted ₹${quote.finalPrice.toLocaleString("en-IN")}, estimated completion ${quote.estimatedCompletionDays} days.`
            }
          ]
        };
      })
    );

    // Notify Customer
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Quotation received",
      title: "Quotation Received",
      shortDescription: `You received a designer quotation of ₹${quote.finalPrice.toLocaleString("en-IN")} for custom order #${orderId}.`,
      timestamp: "Just now",
      read: false,
      audience: "customer"
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast("Quotation sent to the customer for review.");
  };

  // Customer accepts quotation -> moves to AWAITING_ADVANCE_PAYMENT
  const customerAcceptQuotation = (orderId: string) => {
    setCustomOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const advance = order.advancePaymentAmount || Math.round((order.quotation?.finalPrice || 20000) * 0.4);
        return {
          ...order,
          lifecycleStatus: "CUSTOMER_ACCEPTED",
          advancePaymentAmount: advance,
          advancePaymentConfirmed: false,
          quotation: order.quotation ? { ...order.quotation, status: "Accepted" } : undefined,
          orderHistory: [
            ...order.orderHistory,
            {
              stage: "Quotation Accepted",
              timestamp: new Date().toLocaleString(),
              note: "Customer accepted terms and design specifications. Awaiting advance payment."
            }
          ]
        };
      })
    );

    // Notify Designer
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Quotation response",
      title: "Quotation Accepted by Patron",
      shortDescription: `Customer accepted quote for order #${orderId}. Awaiting advance payment to begin.`,
      timestamp: "Just now",
      read: false,
      audience: "designer"
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast("Quotation accepted! Please complete the advance payment to start production.");
  };

  // Customer declines quotation
  const customerDeclineQuotation = (orderId: string) => {
    setCustomOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          lifecycleStatus: "CUSTOMER_DECLINED",
          quotation: order.quotation ? { ...order.quotation, status: "Declined" } : undefined,
          orderHistory: [
            ...order.orderHistory,
            {
              stage: "Quotation Declined",
              timestamp: new Date().toLocaleString(),
              note: "Customer declined the proposed quotation terms."
            }
          ]
        };
      })
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Quotation response",
      title: "Quotation Declined",
      shortDescription: `Customer declined quotation for order #${orderId}.`,
      timestamp: "Just now",
      read: false,
      audience: "designer"
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast("Quotation declined.");
  };

  // Customer completes advance payment
  const customerPayAdvancePayment = (orderId: string) => {
    setCustomOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          lifecycleStatus: "ADVANCE_PAYMENT_RECEIVED",
          advancePaymentConfirmed: true,
          orderHistory: [
            ...order.orderHistory,
            {
              stage: "Advance Payment Received",
              timestamp: new Date().toLocaleString(),
              note: `₹${(order.advancePaymentAmount || 10000).toLocaleString("en-IN")} advance payment received via Atelier Escrow.`
            }
          ]
        };
      })
    );

    // Notify both
    const notifDesigner: NotificationItem = {
      id: `notif-${Date.now()}-d`,
      category: "Advance payment received",
      title: "Advance Payment Received",
      shortDescription: `Advance payment confirmed for custom order #${orderId}. Ready to Start Order.`,
      timestamp: "Just now",
      read: false,
      audience: "designer"
    };
    const notifCustomer: NotificationItem = {
      id: `notif-${Date.now()}-c`,
      category: "Advance payment confirmation",
      title: "Advance Payment Verified",
      shortDescription: `Your escrow payment for order #${orderId} is confirmed. The designer will now start tailoring.`,
      timestamp: "Just now",
      read: false,
      audience: "customer"
    };
    setNotifications((prev) => [notifDesigner, notifCustomer, ...prev]);

    showToast("Advance payment confirmed! The designer has been notified to start your order.");
  };

  // Designer officially starts the order
  const startCustomOrder = (orderId: string) => {
    const order = customOrders.find((o) => o.id === orderId);
    if (!order) return;

    const days = order.quotation?.estimatedCompletionDays || 14;
    const deadlineMs = Date.now() + days * 24 * 3600 * 1000;

    setCustomOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
            ...o,
            lifecycleStatus: "IN_PROGRESS",
            startedAt: new Date().toISOString().split("T")[0],
            deadlineTimestamp: deadlineMs,
            hoursRemaining: days * 24,
            isOverdue: false,
            orderHistory: [
              ...o.orderHistory,
              {
                stage: "Start Order",
                timestamp: new Date().toLocaleString(),
                note: "Designer officially started the order. Production countdown initiated."
              }
            ]
          }
          : o
      )
    );

    // Notify Customer
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Custom order started",
      title: "Garment Crafting Initiated",
      shortDescription: `The designer has officially commenced production for order #${order.orderNumber}.`,
      timestamp: "Just now",
      read: false,
      audience: "customer"
    };
    setNotifications((prev) => [notif, ...prev]);

    setActiveCustomOrdersTab("in-progress");
    showToast(`Order #${order.orderNumber} started! Countdown timer activated.`);
  };

  // Designer completes the custom order
  const completeCustomOrder = (orderId: string) => {
    const order = customOrders.find((o) => o.id === orderId);
    if (!order) return;

    setCustomOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
            ...o,
            lifecycleStatus: "COMPLETED",
            actualCompletedDate: new Date().toLocaleDateString("en-GB"),
            hoursRemaining: 0,
            orderHistory: [
              ...o.orderHistory,
              {
                stage: "Completed",
                timestamp: new Date().toLocaleString(),
                note: "Custom order marked completed. Garment packaged in archival dust-bag."
              }
            ]
          }
          : o
      )
    );

    // Notify Customer
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Custom order completed",
      title: "Couture Garment Completed",
      shortDescription: `Your custom creation #${order.orderNumber} is finished and entering logistics inspection.`,
      timestamp: "Just now",
      read: false,
      audience: "customer"
    };
    setNotifications((prev) => [notif, ...prev]);

    setActiveCustomOrdersTab("completed");
    showToast(`Order #${order.orderNumber} successfully marked completed and moved to archive.`);
  };

  // Designer cancels the custom inquiry/request
  const cancelCustomOrder = (orderId: string, reason?: string) => {
    const order = customOrders.find((o) => o.id === orderId);
    if (!order) return;

    setCustomOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              lifecycleStatus: "CUSTOMER_DECLINED",
              orderHistory: [
                ...o.orderHistory,
                {
                  stage: "Request Cancelled",
                  timestamp: new Date().toLocaleString(),
                  note: reason || "Custom commission request was cancelled by designer."
                }
              ]
            }
          : o
      )
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Quotation response",
      title: "Custom Inquiry Cancelled",
      shortDescription: `Inquiry #${order.orderNumber} for ${order.baseProduct?.title || order.newGarmentReference?.requestedDesign || "Bespoke Request"} was cancelled.`,
      timestamp: "Just now",
      read: false,
      audience: "customer"
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Request #${order.orderNumber} for ${order.customerName} has been cancelled.`);
  };

  // ==========================================
  // DIRECT LISTED PRODUCT BUY NOW (CUSTOMER)
  // ==========================================
  const customerBuyNowProduct = (
    productId: string,
    quantity: number,
    deliveryInfo: { address: string; city: string; state: string; pin: string }
  ): string => {
    const product = listedProducts.find((p) => p.id === productId);
    if (!product) return "";

    const newOrderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newLogistics: LogisticsOrder = {
      id: `log-${Date.now()}`,
      orderNumber: newOrderNumber,
      productTitle: product.title,
      productThumbnail: product.images[0],
      productDetails: `Quantity: ${quantity} • Category: ${product.category}`,
      designerName: product.designerName,
      brandName: product.brandName,
      price: product.price * quantity,
      quantity,
      shippingTag: product.shippingMode,
      orderConfirmed: true,
      status: "READY_TO_DISPATCH",
      customerName: customerProfile.customerName,
      shippingAddress: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state} — ${deliveryInfo.pin}`,
      timeline: [
        {
          stage: "ORDER_CONFIRMED",
          label: "Order Confirmed & Paid",
          timestamp: new Date().toLocaleString(),
          completed: true
        },
        { stage: "PICKED_UP_DISPATCHED", label: "Picked Up / Dispatched", completed: false },
        { stage: "IN_TRANSIT", label: "In Transit", completed: false },
        { stage: "DELIVERED", label: "Delivered", completed: false }
      ]
    };

    // Decrement stock if limited run, or mark sold out if 1-of-1
    setListedProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const remaining = Math.max(0, p.availableStock - quantity);
        return {
          ...p,
          availableStock: remaining,
          status: remaining === 0 ? "SOLD_OUT" : "ACTIVE"
        };
      })
    );

    // Queue in logistics
    setLogisticsOrders((prev) => [newLogistics, ...prev]);

    // Send notifications
    const notifDesigner: NotificationItem = {
      id: `notif-${Date.now()}-d`,
      category: "Product order",
      title: "New Product Order Received",
      shortDescription: `New confirmed purchase for "${product.title}" (${newOrderNumber}). Ready to schedule courier.`,
      timestamp: "Just now",
      read: false,
      audience: "designer"
    };

    const notifCustomer: NotificationItem = {
      id: `notif-${Date.now()}-c`,
      category: "Order confirmed",
      title: "Order Confirmed",
      shortDescription: `Your purchase of "${product.title}" is confirmed. Order #${newOrderNumber}.`,
      timestamp: "Just now",
      read: false,
      audience: "customer"
    };

    setNotifications((prev) => [notifDesigner, notifCustomer, ...prev]);

    // Navigate customer to Orders
    setSelectedProductId(null);
    setCustomerSection("orders");
    showToast(`Order #${newOrderNumber} placed successfully!`);

    return newOrderNumber;
  };

  // ==========================================
  // LOGISTICS & SHIPMENT ACTIONS
  // ==========================================
  const schedulePickup = (orderId: string, schedule: CourierPickupSchedule) => {
    const generatedTracking = `${schedule.courierCompany === "BlueDart Apex Luxury" ? "BD-LUX-" : schedule.courierCompany === "DHL Express Worldwide" ? "DHL-SEC-" : "FDX-EXP-"}${Math.floor(1000000 + Math.random() * 9000000)}`;

    setLogisticsOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          status: "SHIPPED_AND_DELIVERED",
          courierInfo: { ...schedule, confirmedAt: new Date().toLocaleDateString("en-GB") },
          trackingId: generatedTracking,
          trackingStatus: "IN_TRANSIT",
          timeline: order.timeline.map((t) =>
            t.stage === "PICKED_UP_DISPATCHED"
              ? { ...t, completed: true, timestamp: `${schedule.pickupDate} (${schedule.pickupTimeSlot})` }
              : t.stage === "IN_TRANSIT"
              ? { ...t, completed: true, timestamp: "In Transit with Courier" }
              : t
          )
        };
      })
    );

    // Notify Customer
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Order shipped",
      title: "Shipment Dispatched",
      shortDescription: `Order #${orderId} has been dispatched with ${schedule.courierCompany}. Tracking AWB: ${generatedTracking}.`,
      timestamp: "Just now",
      read: false,
      audience: "customer"
    };
    setNotifications((prev) => [notif, ...prev]);

    setActiveLogisticsTab("shipped-delivered");
    showToast(`Courier pickup confirmed with ${schedule.courierCompany}. Order moved to Shipped & Delivered.`);
  };

  // Customer requests return or exchange
  const submitCustomerReturnExchange = (orderId: string, request: {
    requestType: "Return" | "Exchange";
    customerReason: string;
    customerComments: string;
    supportingImages?: string[];
  }) => {
    setLogisticsOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          status: "RETURNS_AND_EXCHANGES",
          returnExchange: {
            requestType: request.requestType,
            customerReason: request.customerReason,
            customerComments: request.customerComments,
            supportingImages: request.supportingImages || [],
            requestDate: new Date().toLocaleDateString("en-GB"),
            status: "Under Review"
          }
        };
      })
    );

    // Notify Designer
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Return/exchange request",
      title: `Customer ${request.requestType} Requested`,
      shortDescription: `${request.requestType} submitted for order #${orderId}: "${request.customerReason}".`,
      timestamp: "Just now",
      read: false,
      audience: "designer"
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`${request.requestType} request submitted for review under Atelier Quality Policy.`);
  };

  const updateReturnExchangeStatus = (orderId: string, actionType: "Accept" | "Dispute" | "Arrange Return Pickup" | "Process Exchange" | "Refund") => {
    let nextStatus: ReturnExchangeRequest["status"] = "Under Review";
    if (actionType === "Accept") nextStatus = "Accepted";
    if (actionType === "Dispute") nextStatus = "Disputed";
    if (actionType === "Arrange Return Pickup") nextStatus = "Pickup Arranged";
    if (actionType === "Process Exchange") nextStatus = "Exchange Processed";
    if (actionType === "Refund") nextStatus = "Refund Initiated";

    setLogisticsOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId || !order.returnExchange) return order;
        return {
          ...order,
          returnExchange: {
            ...order.returnExchange,
            status: nextStatus
          }
        };
      })
    );

    // Notify Customer
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      category: "Return/exchange update",
      title: "Return/Exchange Status Updated",
      shortDescription: `Your return/exchange request for order #${orderId} was updated to: ${nextStatus}.`,
      timestamp: "Just now",
      read: false,
      audience: "customer"
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Return/Exchange request updated: ${actionType} action executed.`);
  };

  return (
    <StudioContext.Provider
      value={{
        portalMode,
        setPortalMode,
        activeSection,
        setActiveSection,
        activeStudioTab,
        setActiveStudioTab,
        customerSection,
        setCustomerSection,
        activeGender,
        setActiveGender,
        activeCategoryFilter,
        setActiveCategoryFilter,
        catalogLayout,
        setCatalogLayout,
        selectedProductId,
        setSelectedProductId,
        selectedDesignerId,
        setSelectedDesignerId,
        cartItems,
        cartCount: cartItems.reduce((acc, curr) => acc + curr.quantity, 0),
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        uvibePrompt,
        setUvibePrompt,
        customerSearchQuery,
        setCustomerSearchQuery,
        customerNotificationsOpen,
        setCustomerNotificationsOpen,
        listedProducts,
        designers,
        updateStock,
        delistProduct,
        relistProduct,
        deleteProduct,
        editingDraftId,
        startNewListing,
        startEditingDraft,
        publishNewProduct,
        soldProducts,
        drafts,
        saveDraft,
        deleteDraft,
        boostCampaigns,
        boostModalProduct,
        openBoostModal,
        closeBoostModal,
        applyBoost,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        designerNotificationCount,
        customerNotificationCount,
        toastMessage,
        showToast,
        activeUtilityModal,
        openUtilityModal,
        closeUtilityModal,
        transactions,
        subscription,
        changeSubscriptionTier,
        designerProfile,
        customerProfile,
        updatePersonalDetails,
        updateBrandDetails,
        updateBusinessAddress,
        updateBankDetails,
        updateCustomerProfile,

        // Custom Orders
        customOrders,
        activeCustomOrdersTab,
        setActiveCustomOrdersTab,
        activeInquirySubTab,
        setActiveInquirySubTab,
        submitExistingProductCustomization,
        submitNewCustomizedOrder,
        sendQuotation,
        cancelCustomOrder,
        customerAcceptQuotation,
        customerDeclineQuotation,
        customerPayAdvancePayment,
        startCustomOrder,
        completeCustomOrder,

        // Direct Listed Purchase
        customerBuyNowProduct,

        // Orders & Logistics
        logisticsOrders,
        activeLogisticsTab,
        setActiveLogisticsTab,
        schedulePickup,
        submitCustomerReturnExchange,
        updateReturnExchangeStatus
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
}
