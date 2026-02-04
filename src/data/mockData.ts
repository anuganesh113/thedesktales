import mousepadsImg from '../assets/mousepads.png';
import deskmatsImg from '../assets/deskmats.png';
import postersImg from '../assets/posters.png';
import customDeskmatImg from '../assets/custom-deskmat.png';
import mousepadImg from '../assets/mousepad.png';
import customPosterImg from '../assets/custom-poster.png';

// Mock Data for The Desk Tales eCommerce

export interface Product {
  id: string;
  name: string;
  category: 'desk-mat' | 'mousepad' | 'poster' | 'custom';
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: { name: string; value: string }[];
  designer?: Designer;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  limited?: boolean;
  material: string;
  reviews: Review[];
  frameColors?: { name: string; value: string }[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Designer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  designCount: number;
  totalSales: number;
  commissionRate: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'DeskMats',
    slug: 'desk-mat',
    description: 'Premium full-desk coverage for the ultimate workspace',
    image: deskmatsImg,
    productCount: 42,
  },
  {
    id: '2',
    name: 'Mousepads',
    slug: 'mousepad',
    description: 'Precision surfaces for gamers and creatives',
    image: mousepadsImg,
    productCount: 32,
  },
  {
    id: '3',
    name: 'Posters',
    slug: 'poster',
    description: 'Inspiring art prints to elevate your room aesthetics',
    image: postersImg,
    productCount: 15,
  },
  {
    id: '4',
    name: 'Custom Prints',
    slug: 'custom',
    description: 'Design your own premium workspace accessories',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    productCount: 1,
  },
];

export const designers: Designer[] = [
  {
    id: 'd1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Minimalist designer specializing in geometric patterns and clean aesthetics.',
    designCount: 45,
    totalSales: 1250,
    commissionRate: 15,
    featured: true,
  },
  {
    id: 'd2',
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    bio: 'Digital artist creating vibrant, nature-inspired workspace designs.',
    designCount: 32,
    totalSales: 890,
    commissionRate: 12,
    featured: true,
  },
  {
    id: 'd3',
    name: 'Mike Torres',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    bio: 'Gaming and tech enthusiast designing bold, futuristic patterns.',
    designCount: 28,
    totalSales: 720,
    commissionRate: 12,
  },
  {
    id: 'd4',
    name: 'Emma Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    bio: 'Botanical illustrator bringing organic beauty to desk accessories.',
    designCount: 22,
    totalSales: 540,
    commissionRate: 10,
  },
];

export const products: Product[] = [
  {
    id: 'p-custom',
    name: 'Custom Deskmat',
    category: 'custom',
    price: 3299,
    image: customDeskmatImg,
    images: [customDeskmatImg],
    description: 'Our premium "Build Your Own" experience. Upload your high-resolution artwork or use our design studio to create a one-of-a-kind workspace centerpiece.',
    sizes: ['MEDIUM (28CM X 60CM)', 'LARGE (30CM X 82CM)', 'EXTRA LARGE (42CM X 90CM)'],
    colors: [
      { name: 'Custom Design', value: '#F97316' },
    ],
    // Correcting to match Product interface
    rating: 5.0,
    reviewCount: 124,
    reviews: [],
    inStock: true,
    material: 'Premium Microfiber + Natural Rubber Base',
    bestseller: true,
    newArrival: false,
    limited: false,
    frameColors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Brown', value: '#5C4033' },
    ]
  },
  {
    id: 'p-custom-mousepad',
    name: 'Custom Mousepad',
    category: 'custom',
    price: 899,
    image: mousepadImg,
    images: [mousepadImg],
    description: 'Design your own professional-grade mousepad. Perfect for gaming or office use, with your own personal touch.',
    sizes: ['Standard (32x27cm)', 'Large (45x40cm)'],
    colors: [
      { name: 'Custom Design', value: '#F97316' },
    ],
    rating: 4.8,
    reviewCount: 86,
    reviews: [],
    inStock: true,
    material: 'Smooth Cloth Surface + Non-Slip Rubber Base',
    bestseller: false,
    newArrival: true,
    limited: false,
  },
  {
    id: 'p-custom-poster',
    name: 'Custom Framed Poster',
    category: 'custom',
    price: 1499,
    image: customPosterImg,
    images: [customPosterImg],
    description: 'Transform your favorite memories or digital art into gallery-quality framed posters. Printed on premium matte paper with a sleek, modern frame.',
    sizes: ['A3', 'A4'],
    colors: [
      { name: 'Custom Design', value: '#F97316' },
    ],
    frameColors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Brown', value: '#5C4033' },
    ],
    rating: 4.9,
    reviewCount: 42,
    reviews: [],
    inStock: true,
    material: '200gsm Museum-Quality Matte Paper + Lightweight Wood Frame',
    bestseller: false,
    newArrival: true,
    limited: false,
  },
  {
    id: 'p1',
    name: 'Midnight Geometry DeskMat',
    category: 'desk-mat',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1550684400-0196726f8cc1?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=800'],
    description: 'Transform your workspace with this stunning geometric pattern featuring deep blues and subtle gold accents. Premium microfiber surface provides smooth mouse tracking.',
    sizes: ['MEDIUM (28CM X 60CM)', 'LARGE (30CM X 82CM)', 'EXTRA LARGE (42CM X 90CM)'],
    colors: [
      { name: 'Midnight Blue', value: '#1E3A8A' },
      { name: 'Charcoal', value: '#374151' },
      { name: 'Forest Green', value: '#166534' },
    ],
    material: 'Premium Microfiber',
    designer: designers[0],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    bestseller: true,
    newArrival: true,
    reviews: [
      {
        id: 'r1',
        userName: 'David Miller',
        userAvatar: 'https://i.pravatar.cc/150?u=david',
        rating: 5,
        date: 'Jan 15, 2024',
        comment: 'Absolutely stunning design! The microfiber feels incredibly smooth under my mouse. Definitely worth the premium price.'
      },
      {
        id: 'r2',
        userName: 'Elena Rodriguez',
        userAvatar: 'https://i.pravatar.cc/150?u=elena',
        rating: 4,
        date: 'Dec 22, 2023',
        comment: 'Great quality and colors. It stays perfectly in place on my desk. Just wish it arrived a bit sooner.'
      },
      {
        id: 'r3',
        userName: 'Saman Thapa',
        userAvatar: 'https://i.pravatar.cc/150?u=saman',
        rating: 5,
        date: 'Feb 10, 2024',
        comment: 'The stitching is perfect. Best deskmat I have ever owned. High quality and feels premium.'
      },
      {
        id: 'r4',
        userName: 'Priya Rai',
        userAvatar: 'https://i.pravatar.cc/150?u=priya',
        rating: 5,
        date: 'Feb 14, 2024',
        comment: 'Vibrant colors and great texture. My desk setup looks amazing now!'
      },
      {
        id: 'r5',
        userName: 'Anish Giri',
        userAvatar: 'https://i.pravatar.cc/150?u=anish',
        rating: 4,
        date: 'Jan 30, 2024',
        comment: 'Good value for money. The surface is easy to clean.'
      },
      {
        id: 'r6',
        userName: 'Sunita KC',
        userAvatar: 'https://i.pravatar.cc/150?u=sunita',
        rating: 5,
        date: 'Jan 05, 2024',
        comment: 'Love the minimalist packaging and the product itself is top-notch.'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Sunset Gradient DeskMat',
    category: 'desk-mat',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&q=80&w=800'],
    description: 'A beautiful gradient design that transitions from warm sunset oranges to deep purple twilight. Perfect for creative professionals.',
    sizes: ['MEDIUM (28CM X 60CM)', 'LARGE (30CM X 82CM)', 'EXTRA LARGE (42CM X 90CM)'],
    colors: [
      { name: 'Sunset', value: '#F59E0B' },
      { name: 'Ocean', value: '#0EA5E9' },
      { name: 'Forest', value: '#22C55E' },
    ],
    material: 'Ultra-Smooth Polyester',
    designer: designers[1],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    newArrival: true,
    reviews: [
      {
        id: 'r3',
        userName: 'Sophie Turner',
        userAvatar: 'https://i.pravatar.cc/150?u=sophie',
        rating: 5,
        date: 'Feb 02, 2024',
        comment: 'The gradient is so vibrant! It makes my desk setup look professional and creative at the same time.'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Neon Circuit Gaming Mousepad',
    category: 'mousepad',
    price: 999,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'],
    description: 'High-performance gaming surface with futuristic circuit board design. Optimized for both optical and laser mice.',
    sizes: ['Standard (32x27cm)', 'Extended (90x40cm)'],
    colors: [
      { name: 'Neon Green', value: '#22C55E' },
      { name: 'Cyber Pink', value: '#EC4899' },
      { name: 'Electric Blue', value: '#3B82F6' },
    ],
    material: 'Speed-Canvas Rubber',
    designer: designers[2],
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    bestseller: true,
    limited: true,
    reviews: [
      {
        id: 'r4',
        userName: 'Marcus Wright',
        userAvatar: 'https://i.pravatar.cc/150?u=marcus',
        rating: 5,
        date: 'Jan 10, 2024',
        comment: 'The best mousepad for FPS games. Zero drag and the neon effect is really cool under my setup lighting.'
      },
      {
        id: 'r5',
        userName: 'Alex Kim',
        userAvatar: 'https://i.pravatar.cc/150?u=alex',
        rating: 4,
        date: 'Dec 05, 2023',
        comment: 'Solid build, doesn\'t fray at the edges. Very responsive surface.'
      }
    ]
  },
  {
    id: 'p4',
    name: 'Botanical Garden DeskMat',
    category: 'desk-mat',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800'],
    description: 'Hand-illustrated botanical patterns bring a touch of nature to your desk. Features delicate leaves and flowers on a cream background.',
    sizes: ['MEDIUM (28CM X 60CM)', 'LARGE (30CM X 82CM)', 'EXTRA LARGE (42CM X 90CM)'],
    colors: [
      { name: 'Cream', value: '#FEF3C7' },
      { name: 'Sage', value: '#D1FAE5' },
    ],
    material: 'Natural Cork Wrapper',
    designer: designers[3],
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    reviews: [
      {
        id: 'r6',
        userName: 'Isabella Ross',
        userAvatar: 'https://i.pravatar.cc/150?u=isabella',
        rating: 5,
        date: 'Mar 12, 2024',
        comment: 'So elegant and calming. The natural cork base is a great touch and it feels very premium.'
      }
    ]
  },
  {
    id: 'p5',
    name: 'Minimalist Grid Mousepad',
    category: 'mousepad',
    price: 699,
    image: 'https://images.unsplash.com/photo-1506784926709-b2f9c216faab?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1506784926709-b2f9c216faab?auto=format&fit=crop&q=80&w=800'],
    description: 'Clean, understated design with a subtle grid pattern. Perfect for professionals who appreciate simplicity.',
    sizes: ['Standard (32x27cm)'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#111827' },
      { name: 'Gray', value: '#6B7280' },
    ],
    material: 'Non-Slip Rubber Base',
    designer: designers[0],
    rating: 4.6,
    reviewCount: 145,
    inStock: true,
    reviews: []
  },
  {
    id: 'p6',
    name: 'Waves of Ocean Poster',
    category: 'poster',
    price: 899,
    image: 'https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?q=80&w=800&auto=format&fit=crop'],
    description: 'High-quality matte art print featuring calming ocean waves.',
    sizes: ['A3', 'A4'],
    colors: [{ name: 'Blue', value: '#0ea5e9' }],
    material: '300GSM Matte Paper',
    designer: designers[1],
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    newArrival: true,
    reviews: [],
    frameColors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Brown', value: '#5C4033' },
    ]
  },
  {
    id: 'p7',
    name: 'Abstract Modern Poster',
    category: 'poster',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop'],
    description: 'Modern abstract art print for contemporary spaces.',
    sizes: ['A3', 'A4'],
    colors: [{ name: 'Multi', value: '#333' }],
    material: 'Textured Canvas',
    designer: designers[2],
    rating: 4.7,
    reviewCount: 23,
    inStock: true,
    reviews: [],
    frameColors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Brown', value: '#5C4033' },
    ]
  },
  {
    id: 'p8',
    name: 'Cyberpunk City DeskMat',
    category: 'desk-mat',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1555679427-1f6dfcce943b?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1555679427-1f6dfcce943b?q=80&w=800&auto=format&fit=crop'],
    description: 'Immerse yourself in a neon-drenched cityscape. High-precision surface for gaming and productivity.',
    sizes: ['MEDIUM (28CM X 60CM)', 'LARGE (30CM X 82CM)', 'EXTRA LARGE (42CM X 90CM)'],
    colors: [{ name: 'Neon', value: '#db2777' }],
    material: 'Waterproof Hybrid Surface',
    designer: designers[2],
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
    reviews: []
  },
  {
    id: 'p9',
    name: 'Vintage Cartography DeskMat',
    category: 'desk-mat',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=800&auto=format&fit=crop'],
    description: 'Detailed vintage map design for the explorer at heart. Premium stitching and classic aesthetic.',
    sizes: ['MEDIUM (28CM X 60CM)', 'LARGE (30CM X 82CM)', 'EXTRA LARGE (42CM X 90CM)'],
    colors: [{ name: 'Sepia', value: '#78350f' }],
    material: 'Premium Microfiber',
    designer: designers[0],
    rating: 4.9,
    reviewCount: 95,
    inStock: true,
    reviews: []
  },
  {
    id: 'p10',
    name: 'Astro Nebula DeskMat',
    category: 'desk-mat',
    price: 2699,
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop'],
    description: 'A breathtaking deep space nebula design. Premium micro-woven surface for peak performance and aesthetics.',
    sizes: ['MEDIUM (28CM X 60CM)', 'LARGE (30CM X 82CM)', 'EXTRA LARGE (42CM X 90CM)'],
    colors: [{ name: 'Cosmic', value: '#1e1b4b' }],
    material: 'High-Density Micro-Woven Cloth',
    designer: designers[2],
    rating: 5.0,
    reviewCount: 12,
    inStock: true,
    newArrival: true,
    reviews: []
  },
  {
    id: 'p11',
    name: 'Zen Garden Mousepad',
    category: 'mousepad',
    price: 599,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'],
    description: 'Minimalist sand patterns inspired by Japanese Zen gardens. Provides a calm and focused atmosphere for your workspace.',
    sizes: ['Standard (32x27cm)'],
    colors: [{ name: 'Sand', value: '#e7e5e4' }],
    material: 'Natural Rubber Base & Fine Grain Surface',
    designer: designers[0],
    rating: 4.9,
    reviewCount: 8,
    inStock: true,
    newArrival: true,
    reviews: []
  },
  {
    id: 'p12',
    name: 'Cyberpunk Oni Poster',
    category: 'poster',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'],
    description: 'A striking fusion of traditional Japanese Oni motifs and cyberpunk aesthetics. High-quality velvet matte finish.',
    sizes: ['A3', 'A4'],
    colors: [{ name: 'Neon Red', value: '#ef4444' }],
    material: '250GSM Velvet Matte Paper',
    designer: designers[2],
    rating: 4.8,
    reviewCount: 15,
    inStock: true,
    reviews: [],
    frameColors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Brown', value: '#5C4033' },
    ]
  },
  {
    id: 'p13',
    name: 'Pastel Dreams DeskMat',
    category: 'desk-mat',
    price: 2399,
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop'],
    description: 'Soft pastel gradients that bring a dreamlike quality to your setup. Water-resistant and easy to clean.',
    sizes: ['MEDIUM (28CM X 60CM)', 'LARGE (30CM X 82CM)', 'EXTRA LARGE (42CM X 90CM)'],
    colors: [{ name: 'Cloud', value: '#bae6fd' }],
    material: 'Spill-Resistant Hybrid Surface',
    designer: designers[1],
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    reviews: []
  },
];

export const getBestsellers = () => products.filter(p => p.bestseller);
export const getNewArrivals = () => products.filter(p => p.newArrival);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getFeaturedDesigners = () => designers.filter(d => d.featured);
