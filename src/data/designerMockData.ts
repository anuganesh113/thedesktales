// Designer Dashboard Mock Data

export interface DesignSubmission {
  id: string;
  name: string;
  category: 'desktop-mat' | 'laptop-mat' | 'mousepad' | 'accessory';
  image: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision';
  submittedAt: string;
  feedback?: string;
}

export interface SaleRecord {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  salePrice: number;
  commission: number;
  date: string;
  status: 'completed' | 'processing' | 'refunded';
}

export interface EarningsSummary {
  totalEarnings: number;
  pendingPayout: number;
  lastPayout: number;
  lastPayoutDate: string;
  thisMonth: number;
  lastMonth: number;
  totalDesigns: number;
  approvedDesigns: number;
  totalSales: number;
}

export interface DesignerNotification {
  id: string;
  type: 'approval' | 'rejection' | 'sale' | 'payout' | 'revision';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const mockDesignSubmissions: DesignSubmission[] = [
  {
    id: 'ds1',
    name: 'Cosmic Nebula Pattern',
    category: 'desktop-mat',
    image: '/placeholder.svg',
    status: 'approved',
    submittedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'ds2',
    name: 'Retro Wave Gradient',
    category: 'mousepad',
    image: '/placeholder.svg',
    status: 'pending',
    submittedAt: '2024-01-18T14:20:00Z',
  },
  {
    id: 'ds3',
    name: 'Sakura Blossom',
    category: 'laptop-mat',
    image: '/placeholder.svg',
    status: 'revision',
    submittedAt: '2024-01-10T09:15:00Z',
    feedback: 'Please increase the resolution of the main pattern and adjust colors for better print quality.',
  },
  {
    id: 'ds4',
    name: 'Tech Grid Pattern',
    category: 'mousepad',
    image: '/placeholder.svg',
    status: 'rejected',
    submittedAt: '2024-01-05T16:45:00Z',
    feedback: 'This design is too similar to an existing product in our catalog.',
  },
  {
    id: 'ds5',
    name: 'Mountain Sunset',
    category: 'desktop-mat',
    image: '/placeholder.svg',
    status: 'approved',
    submittedAt: '2024-01-02T11:00:00Z',
  },
];

export const mockSalesRecords: SaleRecord[] = [
  {
    id: 'sr1',
    productName: 'Cosmic Nebula Desktop Mat',
    productImage: '/placeholder.svg',
    quantity: 2,
    salePrice: 79.99,
    commission: 23.99,
    date: '2024-01-19T15:30:00Z',
    status: 'completed',
  },
  {
    id: 'sr2',
    productName: 'Mountain Sunset Desktop Mat',
    productImage: '/placeholder.svg',
    quantity: 1,
    salePrice: 89.99,
    commission: 13.49,
    date: '2024-01-18T10:20:00Z',
    status: 'completed',
  },
  {
    id: 'sr3',
    productName: 'Cosmic Nebula Desktop Mat',
    productImage: '/placeholder.svg',
    quantity: 3,
    salePrice: 79.99,
    commission: 35.99,
    date: '2024-01-17T14:45:00Z',
    status: 'processing',
  },
  {
    id: 'sr4',
    productName: 'Mountain Sunset Desktop Mat',
    productImage: '/placeholder.svg',
    quantity: 1,
    salePrice: 89.99,
    commission: 13.49,
    date: '2024-01-16T09:10:00Z',
    status: 'completed',
  },
  {
    id: 'sr5',
    productName: 'Cosmic Nebula Desktop Mat',
    productImage: '/placeholder.svg',
    quantity: 1,
    salePrice: 79.99,
    commission: 11.99,
    date: '2024-01-15T16:55:00Z',
    status: 'refunded',
  },
  {
    id: 'sr6',
    productName: 'Mountain Sunset Desktop Mat',
    productImage: '/placeholder.svg',
    quantity: 2,
    salePrice: 89.99,
    commission: 26.99,
    date: '2024-01-14T11:30:00Z',
    status: 'completed',
  },
];

export const mockEarningsSummary: EarningsSummary = {
  totalEarnings: 4250.75,
  pendingPayout: 325.45,
  lastPayout: 890.50,
  lastPayoutDate: '2024-01-01T00:00:00Z',
  thisMonth: 425.93,
  lastMonth: 890.50,
  totalDesigns: 45,
  approvedDesigns: 38,
  totalSales: 1250,
};

export const mockNotifications: DesignerNotification[] = [
  {
    id: 'n1',
    type: 'sale',
    title: 'New Sale!',
    message: 'Your "Cosmic Nebula Desktop Mat" was purchased. Commission: Rs. 23.99',
    date: '2024-01-19T15:30:00Z',
    read: false,
  },
  {
    id: 'n2',
    type: 'approval',
    title: 'Design Approved',
    message: 'Your "Cosmic Nebula Pattern" design has been approved and is now live!',
    date: '2024-01-15T14:00:00Z',
    read: false,
  },
  {
    id: 'n3',
    type: 'revision',
    title: 'Revision Requested',
    message: 'Your "Sakura Blossom" design needs some adjustments before approval.',
    date: '2024-01-10T10:00:00Z',
    read: true,
  },
  {
    id: 'n4',
    type: 'payout',
    title: 'Payout Processed',
    message: 'Your payout of Rs. 890.50 has been processed and sent to your bank account.',
    date: '2024-01-01T09:00:00Z',
    read: true,
  },
  {
    id: 'n5',
    type: 'rejection',
    title: 'Design Not Approved',
    message: 'Your "Tech Grid Pattern" was not approved. Check feedback for details.',
    date: '2024-01-05T17:00:00Z',
    read: true,
  },
];

// Monthly earnings data for charts
export const monthlyEarningsData = [
  { month: 'Aug', earnings: 320 },
  { month: 'Sep', earnings: 450 },
  { month: 'Oct', earnings: 580 },
  { month: 'Nov', earnings: 720 },
  { month: 'Dec', earnings: 890 },
  { month: 'Jan', earnings: 426 },
];

// Sales by product category
export const salesByCategory = [
  { category: 'Desktop Mats', sales: 45, revenue: 3599.55 },
  { category: 'Laptop Mats', sales: 28, revenue: 1539.72 },
  { category: 'Mousepads', sales: 62, revenue: 2169.38 },
  { category: 'Accessories', sales: 15, revenue: 1049.85 },
];
