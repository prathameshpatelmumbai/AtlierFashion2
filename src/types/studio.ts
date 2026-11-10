export type Category = 
  | "Bridal & Heritage Lehengas"
  | "Royal Sherwanis & Bandhgalas"
  | "Contemporary Indo-Western Couture"
  | "Couture & Gowns" 
  | "Lehengas & Sets" 
  | "Sarees & Drapes" 
  | "Sherwanis & Bandhgalas" 
  | "Contemporary Indo-Western"
  | "Luxury Prêt & Coordinates";

export interface ListedProduct {
  id: string;
  title: string;
  designerName: string;
  brandName: string;
  designerId: string;
  category: Category;
  subcategory: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  currency: string;
  availableStock: number;
  initialStock: number;
  isOneOfOne: boolean;
  images: string[];
  sizes: string[];
  measurements: {
    bust?: string;
    waist?: string;
    hips?: string;
    length?: string;
    shoulder?: string;
  };
  fitType: "Slim Fit" | "Tailored Regular" | "Relaxed Silhouette" | "Custom Fit" | string;
  stretchability: "No Stretch (Structured)" | "Slight Give (1-2%)" | "Comfort Stretch" | string;
  materials: string;
  lining: string;
  careInstructions: string;
  shippingMode: "Free Shipping" | "Shipping Paid by Customer";
  packageDimensions: string;
  packageWeight: string;
  status: "ACTIVE" | "DELISTED" | "SOLD_OUT";
  isBoosted?: boolean;
  boostExpiry?: string;
  viewsCount: number;
  orderCount: number;
  createdAt: string;
  description?: string;
}

export interface SoldProduct {
  id: string;
  productId: string;
  title: string;
  category: Category;
  thumbnail: string;
  soldPrice: number;
  currency: string;
  soldDate: string;
  customerCity: string;
  orderNumber: string;
  editionNumber?: string;
  dispatchReference: string;
  archiveCode?: string;
  collectionName?: string;
}

export interface DraftProduct {
  id: string;
  title: string;
  draftCode?: string;
  category?: Category;
  subcategory?: string;
  tags?: string[];
  images: string[];
  currentStep: number;
  lastSaved: string;
  price?: number;
  isOneOfOne?: boolean;
  availableStock?: number;
  photoSetCount?: number;
  formData: Partial<ProductFormData>;
}

export interface BoostCampaign {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  planName: string;
  status: "ACTIVE" | "COMPLETED" | "SCHEDULED";
  startDate: string;
  endDate: string;
  cost: number;
  impressions: number;
  clicks: number;
  saves: number;
  inquiries?: number;
  daysRemaining?: number;
  paymentMethod?: string;
  receiptNumber?: string;
}

export interface ProductFormData {
  title: string;
  category: Category;
  subcategory: string;
  tags: string[];
  images: string[];
  standardSizes: string[];
  measurements: {
    bust?: string;
    waist?: string;
    hips?: string;
    length?: string;
    shoulder?: string;
  };
  fitType: "Slim Fit" | "Tailored Regular" | "Relaxed Silhouette" | "Custom Fit" | string;
  stretchability: "No Stretch (Structured)" | "Slight Give (1-2%)" | "Comfort Stretch" | string;
  isOneOfOne: boolean;
  quantity: number;
  materials: string;
  lining: string;
  careInstructions: string;
  price: number;
  shippingMode: "Free Shipping" | "Shipping Paid by Customer";
  packageDimensions: string;
  packageWeight: string;
}

// ==========================================
// CUSTOM ORDERS (SHARED BACKEND ARCHITECTURE)
// ==========================================

export type CustomOrderInquiryType = "YOUR_LISTED_PRODUCT" | "NEW_CUSTOMIZED_ORDER";

export type CustomOrderLifecycleStatus = 
  | "INQUIRY_RECEIVED" 
  | "QUOTATION_SENT" 
  | "CUSTOMER_ACCEPTED" 
  | "CUSTOMER_DECLINED" 
  | "AWAITING_ADVANCE_PAYMENT" 
  | "ADVANCE_PAYMENT_RECEIVED" 
  | "ORDER_STARTED" 
  | "IN_PROGRESS" 
  | "COMPLETED";

export interface QuotationData {
  customerSize: string;
  measurements: {
    bust?: string;
    waist?: string;
    hips?: string;
    height?: string;
    shoulder?: string;
    armLength?: string;
    length?: string;
    customNotes?: string;
  };
  finalPrice: number;
  estimatedCompletionDays: number;
  completionDeadline: string;
  customizationDetails: string;
  shippingInfo?: string;
  sentDate?: string;
  status?: "Pending Customer Review" | "Accepted" | "Declined" | string;
}

export interface CustomOrder {
  id: string;
  orderNumber: string;
  inquiryType: CustomOrderInquiryType;
  lifecycleStatus: CustomOrderLifecycleStatus;
  
  // Client info
  customerName: string;
  customerCity: string;
  customerPhone?: string;
  customerEmail?: string;
  customerNotes?: string;
  designerName?: string;
  brandName?: string;

  // If based on an existing listed product
  baseProduct?: {
    id: string;
    title: string;
    thumbnail: string;
    originalPrice: number;
    shippingMode: string;
    status: "LISTED" | "SOLD_OUT";
    category: string;
    designerName?: string;
    brandName?: string;
  };

  // If a brand new custom garment
  newGarmentReference?: {
    referenceImage: string;
    requestedDesign: string;
    measurements: string;
    colour: string;
    fabric: string;
    alterationDetails: string;
    customerNotes?: string;
  };

  // Customization specifications requested
  requestedAlterations: {
    requestedSize?: string;
    requestedColour?: string;
    requestedFabric?: string;
    otherAlterations?: string;
    measurements?: {
      bust?: string;
      waist?: string;
      hips?: string;
      length?: string;
      height?: string;
    };
  };

  // Quotation & Agreement
  quotation?: QuotationData;
  advancePaymentAmount?: number;
  advancePaymentConfirmed?: boolean;

  // In-Progress tracking & countdown
  startedAt?: string;
  deadlineTimestamp?: number;
  hoursRemaining?: number;
  isOverdue?: boolean;
  actualCompletedDate?: string;
  orderHistory: {
    stage: string;
    timestamp: string;
    note?: string;
  }[];
}

// ==========================================
// ORDERS & LOGISTICS
// ==========================================

export type LogisticsLifecycleStatus = 
  | "READY_TO_DISPATCH" 
  | "SHIPPED_AND_DELIVERED" 
  | "RETURNS_AND_EXCHANGES";

export type ShipmentTrackingStatus = 
  | "ORDER_CONFIRMED" 
  | "PICKED_UP_DISPATCHED" 
  | "IN_TRANSIT" 
  | "DELIVERED";

export interface CourierPickupSchedule {
  courierCompany: "BlueDart Apex Luxury" | "DHL Express Worldwide" | "FedEx Priority";
  pickupDate: string;
  pickupTimeSlot: "10:00 AM - 01:00 PM" | "02:00 PM - 05:00 PM" | "05:00 PM - 08:00 PM";
  confirmedAt?: string;
}

export interface ReturnExchangeRequest {
  requestType: "Return" | "Exchange";
  customerReason: string;
  customerComments: string;
  supportingImages: string[];
  requestDate: string;
  status: "Under Review" | "Accepted" | "Disputed" | "Pickup Arranged" | "Exchange Processed" | "Refund Initiated";
}

export interface LogisticsOrder {
  id: string;
  orderNumber: string;
  productTitle: string;
  productThumbnail: string;
  productDetails: string;
  designerName: string;
  brandName: string;
  price: number;
  quantity?: number;
  shippingTag: "Free Shipping" | "Shipping Paid by Customer";
  orderConfirmed: boolean;
  status: LogisticsLifecycleStatus;
  
  // Destination & Courier info
  customerName: string;
  shippingAddress: string;
  courierInfo?: CourierPickupSchedule;
  trackingId?: string;
  trackingStatus?: ShipmentTrackingStatus;
  timeline: {
    stage: ShipmentTrackingStatus;
    label: string;
    timestamp?: string;
    completed: boolean;
  }[];

  // Return & Exchange details
  returnExchange?: ReturnExchangeRequest;
}

// ==========================================
// DESIGNER & CUSTOMER PROFILE TYPES
// ==========================================

export interface DesignerProfile {
  id: string;
  personalDetails: {
    designerName: string;
    phoneNumber: string;
    email: string;
    profilePhoto: string;
  };
  brandDetails: {
    brandName: string;
    logo: string;
    brandStory: string;
    speciality: string;
    fashionCategories: string[];
    coverImage?: string;
    location?: string;
  };
  businessAddress: {
    workshopAddress: string;
    pickupAddress: string;
    city: string;
    state: string;
    postalCode: string;
  };
  bankDetails: {
    accountNumberMasked: string;
    rawAccountNumber?: string;
    ifscCode: string;
    bankName: string;
    upiId: string;
    gstin: string;
  };
}

export interface CustomerProfile {
  customerName: string;
  profilePhoto: string;
  phone: string;
  email: string;
  deliveryAddress: {
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
  };
  accountSecurity: {
    twoFactorEnabled: boolean;
    memberSince: string;
  };
}

export interface NotificationItem {
  id: string;
  category: 
    | "New custom inquiry" 
    | "Quotation response" 
    | "Advance payment received" 
    | "Product order" 
    | "Courier update" 
    | "Return/exchange request" 
    | "Product review" 
    | "Subscription/account notification"
    | "Quotation received"
    | "Advance payment confirmation"
    | "Custom order started"
    | "Custom order progress"
    | "Custom order completed"
    | "Order confirmed"
    | "Order shipped"
    | "Order delivered"
    | "Return/exchange update";
  title: string;
  shortDescription: string;
  timestamp: string;
  read: boolean;
  audience: "designer" | "customer";
}

export interface TransactionRecord {
  id: string;
  date: string;
  transactionReference: string;
  transactionType: "Customer payment" | "Platform commission" | "Refund" | "Designer payout";
  relatedOrder: string;
  amount: number;
  commissionDeduction?: number;
  netPayout?: number;
  status: "Settled" | "Processing" | "Deducted" | "In Escrow";
}

export type SubscriptionTier = "FREE" | "BASIC" | "PRO";

export interface SubscriptionInfo {
  currentTier: SubscriptionTier;
  billingPeriod: "Monthly" | "Active";
  renewsOn: string;
}
