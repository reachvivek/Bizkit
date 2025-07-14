import { Component, OnInit } from '@angular/core';

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  provider: string;
  image?: string;
  features: string[];
  isLicense: boolean;
}

interface LoginForm {
  email: string;
  password: string;
}

interface SellerForm {
  businessName: string;
  contactNo: string;
  email: string;
  spocName: string;
  city: string;
  industry: string;
  solutions: string;
}

interface EnquiryForm {
  businessName: string;
  contactNo: string;
  email: string;
  spocName: string;
  city: string;
  industry: string;
  requirements: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App implements OnInit {
  title = 'bizkit-platform';

  // Search and filter properties
  searchQuery: string = '';
  selectedCategory: string = 'ALL';
  categories: string[] = [
    'ALL',
    'Free Tools',
    'Licenses',
    'SaaS Solutions',
    'Services',
    'Latest Updates',
  ];

  // Modal states
  showLoginModal: boolean = false;
  showSellerModal: boolean = false;
  showEnquiryModal: boolean = false;

  // UI states
  isLoading: boolean = false;
  showSuccessToast: boolean = false;
  successMessage: string = '';

  // Cart
  cartItems: number = 0;

  // Forms
  loginForm: LoginForm = {
    email: '',
    password: '',
  };

  sellerForm: SellerForm = {
    businessName: '',
    contactNo: '',
    email: '',
    spocName: '',
    city: '',
    industry: '',
    solutions: '',
  };

  enquiryForm: EnquiryForm = {
    businessName: '',
    contactNo: '',
    email: '',
    spocName: '',
    city: '',
    industry: '',
    requirements: '',
  };

  selectedService: Service | null = null;
  private searchTimeout: any;

  // Sample services data with enhanced images
  services: Service[] = [
    {
      id: 1,
      name: 'Microsoft Office 365',
      description: 'Complete office suite with cloud collaboration tools',
      category: 'Licenses',
      price: '₹8,250/year',
      rating: 4.8,
      provider: 'Microsoft India',
      image:
        'https://img.freepik.com/free-vector/microsoft-office-logo_1199-122.jpg?w=740',
      features: ['Word', 'Excel', 'PowerPoint', 'Teams', 'OneDrive'],
      isLicense: true,
    },
    {
      id: 2,
      name: 'Salesforce CRM',
      description: "World's leading customer relationship management platform",
      category: 'SaaS Solutions',
      price: '₹1,800/month',
      rating: 4.6,
      provider: 'Salesforce',
      image:
        'https://img.freepik.com/free-vector/crm-concept-illustration_114360-1537.jpg?w=740',
      features: [
        'Lead Management',
        'Contact Management',
        'Analytics',
        'Mobile App',
      ],
      isLicense: false,
    },
    {
      id: 3,
      name: 'Digital Marketing Services',
      description: 'Complete digital marketing solutions for your business',
      category: 'Services',
      price: '₹25,000/month',
      rating: 4.5,
      provider: 'Digital Growth Agency',
      image:
        'https://img.freepik.com/free-vector/digital-marketing-concept-illustration_114360-1531.jpg?w=740',
      features: ['SEO', 'Social Media', 'PPC', 'Content Marketing'],
      isLicense: false,
    },
    {
      id: 4,
      name: 'Adobe Creative Suite',
      description: 'Professional creative tools for design and multimedia',
      category: 'Licenses',
      price: '₹1,675/month',
      rating: 4.7,
      provider: 'Adobe Systems',
      image:
        'https://img.freepik.com/free-vector/creative-design-concept-illustration_114360-1542.jpg?w=740',
      features: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'],
      isLicense: true,
    },
    {
      id: 5,
      name: 'Zoom Business',
      description: 'Video conferencing and collaboration platform',
      category: 'SaaS Solutions',
      price: '₹1,200/month',
      rating: 4.4,
      provider: 'Zoom',
      image:
        'https://img.freepik.com/free-vector/video-conference-concept-illustration_114360-1533.jpg?w=740',
      features: ['HD Video', 'Screen Sharing', 'Recording', 'Webinars'],
      isLicense: false,
    },
    {
      id: 6,
      name: 'IT Support Services',
      description: '24/7 technical support and maintenance services',
      category: 'Services',
      price: '₹15,000/month',
      rating: 4.3,
      provider: 'TechSupport Pro',
      image:
        'https://img.freepik.com/free-vector/technical-support-concept-illustration_114360-1534.jpg?w=740',
      features: ['24/7 Support', 'Remote Assistance', 'Hardware Maintenance'],
      isLicense: false,
    },
    {
      id: 7,
      name: 'Canva Pro',
      description: 'Professional design platform with premium features',
      category: 'Free Tools',
      price: 'Free',
      rating: 4.6,
      provider: 'Canva',
      image:
        'https://img.freepik.com/free-vector/graphic-design-concept-illustration_114360-1535.jpg?w=740',
      features: [
        'Templates',
        'Stock Photos',
        'Brand Kit',
        'Team Collaboration',
      ],
      isLicense: false,
    },
    {
      id: 8,
      name: 'QuickBooks Online',
      description: 'Cloud-based accounting software for small businesses',
      category: 'SaaS Solutions',
      price: '₹1,500/month',
      rating: 4.5,
      provider: 'Intuit',
      image:
        'https://img.freepik.com/free-vector/accounting-concept-illustration_114360-1536.jpg?w=740',
      features: ['Invoicing', 'Expense Tracking', 'Tax Preparation', 'Reports'],
      isLicense: false,
    },
    {
      id: 9,
      name: 'Slack Enterprise',
      description: 'Team collaboration and communication platform',
      category: 'SaaS Solutions',
      price: '₹850/month',
      rating: 4.5,
      provider: 'Slack Technologies',
      image:
        'https://img.freepik.com/free-vector/team-collaboration-concept-illustration_114360-1538.jpg?w=740',
      features: ['Channels', 'Direct Messages', 'File Sharing', 'Integrations'],
      isLicense: false,
    },
    {
      id: 10,
      name: 'AutoCAD License',
      description: 'Professional computer-aided design software',
      category: 'Licenses',
      price: '₹15,400/year',
      rating: 4.6,
      provider: 'Autodesk',
      image:
        'https://img.freepik.com/free-vector/engineering-concept-illustration_114360-1539.jpg?w=740',
      features: [
        '2D Drafting',
        '3D Modeling',
        'Documentation',
        'Collaboration',
      ],
      isLicense: true,
    },
    {
      id: 11,
      name: 'Web Development Services',
      description: 'Custom website and web application development',
      category: 'Services',
      price: '₹50,000/project',
      rating: 4.7,
      provider: 'WebCraft Solutions',
      image:
        'https://img.freepik.com/free-vector/web-development-concept-illustration_114360-1540.jpg?w=740',
      features: ['Responsive Design', 'E-commerce', 'CMS', 'SEO Optimization'],
      isLicense: false,
    },
    {
      id: 12,
      name: 'HubSpot Marketing',
      description: 'Inbound marketing and sales platform',
      category: 'SaaS Solutions',
      price: '₹3,600/month',
      rating: 4.4,
      provider: 'HubSpot',
      image:
        'https://img.freepik.com/free-vector/marketing-automation-concept-illustration_114360-1541.jpg?w=740',
      features: [
        'Email Marketing',
        'Lead Generation',
        'Analytics',
        'CRM Integration',
      ],
      isLicense: false,
    },
    {
      id: 13,
      name: 'Google Workspace',
      description: 'Cloud-based productivity and collaboration tools',
      category: 'Licenses',
      price: '₹672/month',
      rating: 4.5,
      provider: 'Google',
      image:
        'https://img.freepik.com/free-vector/cloud-computing-concept-illustration_114360-1543.jpg?w=740',
      features: ['Gmail', 'Drive', 'Docs', 'Meet', 'Calendar'],
      isLicense: true,
    },
    {
      id: 14,
      name: 'Cybersecurity Consulting',
      description: 'Comprehensive cybersecurity assessment and solutions',
      category: 'Services',
      price: '₹40,000/month',
      rating: 4.8,
      provider: 'SecureIT Consultants',
      image:
        'https://img.freepik.com/free-vector/cybersecurity-concept-illustration_114360-1544.jpg?w=740',
      features: [
        'Security Audit',
        'Threat Detection',
        'Compliance',
        'Training',
      ],
      isLicense: false,
    },
    {
      id: 15,
      name: 'Figma Professional',
      description: 'Collaborative interface design tool',
      category: 'Free Tools',
      price: 'Free/₹900/month',
      rating: 4.6,
      provider: 'Figma',
      image:
        'https://img.freepik.com/free-vector/ui-ux-design-concept-illustration_114360-1545.jpg?w=740',
      features: [
        'Design Systems',
        'Prototyping',
        'Real-time Collaboration',
        'Version Control',
      ],
      isLicense: false,
    },
    {
      id: 16,
      name: 'Shopify Plus',
      description: 'Enterprise e-commerce platform',
      category: 'SaaS Solutions',
      price: '₹16,500/month',
      rating: 4.3,
      provider: 'Shopify',
      image:
        'https://img.freepik.com/free-vector/ecommerce-concept-illustration_114360-1546.jpg?w=740',
      features: [
        'Online Store',
        'Payment Processing',
        'Inventory Management',
        'Analytics',
      ],
      isLicense: false,
    },
  ];

  ngOnInit(): void {
    this.loadServices();
    // Set up scroll to top functionality after view init
    setTimeout(() => {
      this.setupScrollToTop();
    }, 100);
  }

  loadServices(): void {
    this.isLoading = true;
    // Simulate loading services from API
    setTimeout(() => {
      this.isLoading = false;
      console.log('Services loaded successfully');
    }, 1000);
  }

  setupScrollToTop(): void {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollButton.style.opacity = '1';
        } else {
          scrollButton.style.opacity = '0';
        }
      });

      scrollButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }
  }

  get filteredServices(): Service[] {
    let filtered = this.services;

    // Filter by category
    if (this.selectedCategory !== 'ALL') {
      filtered = filtered.filter(
        (service) => service.category === this.selectedCategory
      );
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.provider.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    console.log('Selected category:', category);
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      Licenses: 'bg-blue-500/90 text-white border-blue-400',
      'SaaS Solutions': 'bg-green-500/90 text-white border-green-400',
      Services: 'bg-purple-500/90 text-white border-purple-400',
      'Free Tools': 'bg-yellow-500/90 text-white border-yellow-400',
      'Latest Updates': 'bg-red-500/90 text-white border-red-400',
    };
    return colors[category] || 'bg-gray-500/90 text-white border-gray-400';
  }

  // Modal methods
  toggleLogin(): void {
    this.showLoginModal = !this.showLoginModal;
    if (this.showLoginModal) {
      this.resetLoginForm();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  toggleSellerModal(): void {
    this.showSellerModal = !this.showSellerModal;
    if (this.showSellerModal) {
      this.resetSellerForm();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  openEnquiry(service: Service): void {
    this.selectedService = service;
    this.showEnquiryModal = true;
    this.resetEnquiryForm();
    document.body.style.overflow = 'hidden';
  }

  closeEnquiry(): void {
    this.showEnquiryModal = false;
    this.selectedService = null;
    document.body.style.overflow = 'auto';
  }

  // Form methods
  login(): void {
    if (this.loginForm.email && this.loginForm.password) {
      this.isLoading = true;
      console.log('Login attempt:', this.loginForm);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccessMessage('Login successful! Welcome back.');
        this.toggleLogin();
      }, 1500);
    } else {
      this.showSuccessMessage('Please fill in all required fields');
    }
  }

  registerSeller(): void {
    if (
      this.sellerForm.businessName &&
      this.sellerForm.contactNo &&
      this.sellerForm.email
    ) {
      this.isLoading = true;
      console.log('Seller registration:', this.sellerForm);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccessMessage(
          'Registration successful! Our team will contact you within 24 hours.'
        );
        this.toggleSellerModal();
      }, 2000);
    } else {
      this.showSuccessMessage('Please fill in all required fields');
    }
  }

  submitEnquiry(): void {
    if (
      this.enquiryForm.businessName &&
      this.enquiryForm.contactNo &&
      this.enquiryForm.email
    ) {
      this.isLoading = true;
      console.log('Enquiry submitted:', {
        service: this.selectedService?.name,
        enquiry: this.enquiryForm,
      });

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccessMessage(
          `Thank you! Your enquiry for ${this.selectedService?.name} has been submitted. The service provider will contact you within 2 business days.`
        );
        this.closeEnquiry();
      }, 1500);
    } else {
      this.showSuccessMessage('Please fill in all required fields');
    }
  }

  addToCart(service: Service): void {
    this.cartItems++;
    console.log('Added to cart:', service.name);
    this.showSuccessMessage(`${service.name} added to cart!`);
  }

  // Utility methods
  onImageError(event: any, service: Service): void {
    const fallbackImages: { [key: string]: string } = {
      Licenses:
        'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=License+Software',
      'SaaS Solutions':
        'https://via.placeholder.com/400x250/10B981/FFFFFF?text=SaaS+Platform',
      Services:
        'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Professional+Service',
      'Free Tools':
        'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Free+Tool',
      'Latest Updates':
        'https://via.placeholder.com/400x250/EF4444/FFFFFF?text=Latest+Update',
    };

    event.target.src =
      fallbackImages[service.category] ||
      'https://via.placeholder.com/400x250/6B7280/FFFFFF?text=Service+Image';
  }

  saveForLater(service: Service): void {
    console.log('Saved for later:', service.name);
    this.showSuccessMessage(`${service.name} saved to wishlist!`);
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccessToast = true;

    setTimeout(() => {
      this.showSuccessToast = false;
    }, 4000);
  }

  onSearchChange(): void {
    console.log('Search query changed:', this.searchQuery);
    // Debounce search for better performance
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      // Perform search operations here if needed
    }, 300);
  }

  // Form reset methods
  resetLoginForm(): void {
    this.loginForm = {
      email: '',
      password: '',
    };
  }

  resetSellerForm(): void {
    this.sellerForm = {
      businessName: '',
      contactNo: '',
      email: '',
      spocName: '',
      city: '',
      industry: '',
      solutions: '',
    };
  }

  resetEnquiryForm(): void {
    this.enquiryForm = {
      businessName: '',
      contactNo: '',
      email: '',
      spocName: '',
      city: '',
      industry: '',
      requirements: '',
    };
  }

  // Additional utility methods
  shareService(service: Service): void {
    console.log('Sharing service:', service.name);
    if (navigator.share) {
      navigator
        .share({
          title: service.name,
          text: service.description,
          url: window.location.href,
        })
        .catch((err) => {
          console.log('Error sharing:', err);
          this.copyToClipboard(service);
        });
    } else {
      this.copyToClipboard(service);
    }
  }

  private copyToClipboard(service: Service): void {
    const url = `${window.location.href}?service=${service.id}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          this.showSuccessMessage('Service link copied to clipboard!');
        })
        .catch(() => {
          this.showSuccessMessage('Unable to copy link');
        });
    } else {
      this.showSuccessMessage('Sharing not supported');
    }
  }

  viewServiceDetails(service: Service): void {
    console.log('Viewing service details:', service);
    this.showSuccessMessage(`Loading details for ${service.name}...`);
  }

  contactProvider(service: Service): void {
    console.log('Contacting provider:', service.provider);
    this.showSuccessMessage(`Connecting you with ${service.provider}...`);
  }

  filterByPrice(minPrice: number, maxPrice: number): void {
    console.log('Filtering by price range:', minPrice, maxPrice);
    // Implementation for price filtering can be added here
  }

  sortServices(sortBy: string): void {
    console.log('Sorting services by:', sortBy);
    // Implementation for sorting services can be added here
    switch (sortBy) {
      case 'price-low':
        // Sort by price ascending
        break;
      case 'price-high':
        // Sort by price descending
        break;
      case 'rating':
        // Sort by rating
        break;
      case 'name':
        // Sort by name
        break;
      default:
        // Default sorting
        break;
    }
  }
}
