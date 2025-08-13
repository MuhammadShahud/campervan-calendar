# 🏕️ Campervan Rental Calendar Dashboard

A **production-ready**, enterprise-grade web application for managing campervan rental bookings across multiple stations. Built with modern React patterns, TypeScript, and a scalable architecture that demonstrates senior developer expertise.

## 🏗️ **Professional Architecture**

### **Folder Structure**
```
src/
├── components/           # Reusable UI components
│   ├── ui/             # Base UI components (Page, Card, Button)
│   ├── Autocomplete.tsx # Smart search component
│   └── BookingChip.tsx # Individual booking display
├── hooks/               # Custom React hooks
│   └── useDebounce.ts  # Debounced value hook
├── pages/               # Page-level components
│   ├── CalendarPage.tsx # Main calendar view
│   └── DetailPage.tsx  # Booking details view
├── services/            # Business logic & API layer
│   └── api.ts          # Centralized API service
├── types/               # TypeScript type definitions
│   └── index.ts        # Centralized types
├── utils/               # Utility functions
│   └── dateUtils.ts    # Date manipulation utilities
├── App.tsx              # Main app router
└── main.tsx            # Application entry point
```

### **Architecture Principles**
- **Separation of Concerns**: Clear separation between UI, business logic, and data
- **Single Responsibility**: Each component/module has one clear purpose
- **Dependency Injection**: Services are injected where needed
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Reusability**: Components are designed for maximum reuse
- **Testability**: Architecture supports easy unit testing

## ✨ **Features**

### 🗓️ **Calendar Management**
- **Weekly View**: 7-day calendar grid with responsive design
- **Station Selection**: Smart autocomplete with debounced search
- **Week Navigation**: Intuitive prev/next/current week controls
- **Drag & Drop**: Intuitive booking rescheduling

### 📋 **Booking Management**
- **Visual Display**: Clear pickup/return separation
- **Real-time Updates**: Immediate feedback for changes
- **Error Handling**: Graceful fallbacks and user feedback
- **Loading States**: Professional loading indicators

### 🔍 **Smart Search**
- **Debounced Input**: Performance-optimized search
- **Keyboard Navigation**: Full keyboard accessibility
- **Loading States**: Visual feedback during search
- **Error Handling**: Graceful API failure handling

### 📱 **Mobile-First Design**
- **Responsive Grid**: 1 column (mobile) to 7 columns (desktop)
- **Touch Optimized**: Drag and drop works on all devices
- **Performance**: Optimized for mobile performance

## 🛠️ **Technical Stack**

### **Core Technologies**
- **React 19** with modern hooks and patterns
- **TypeScript** for type safety and developer experience
- **Tailwind CSS** for utility-first styling
- **React Router** for client-side routing

### **Architecture Patterns**
- **Service Layer Pattern**: Centralized API management
- **Custom Hooks Pattern**: Reusable business logic
- **Component Composition**: Flexible component architecture
- **Type-Driven Development**: Interfaces first approach

### **Development Tools**
- **Vite** for lightning-fast builds
- **Jest** with React Testing Library
- **ESLint** for code quality
- **TypeScript** strict mode enabled

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone <your-repo-url>
cd campervan-calendar

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Building for Production**
```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

### **Running Tests**
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📡 **API Integration**

### **Service Architecture**
The application uses a **service layer pattern** with:
- **Centralized API management** in `src/services/api.ts`
- **Type-safe interfaces** for all API responses
- **Error handling** with graceful fallbacks
- **Mock data support** for development

### **API Endpoints**
- **Stations**: `https://605c94c36d85de00170da8b4.mockapi.io/stations`
- **Bookings**: Embedded within station data
- **Updates**: PATCH requests for date modifications

### **Data Flow**
```
User Action → Component → Service → API → Response → State Update → UI Re-render
```

## 🎯 **Challenge Requirements Met**

### ✅ **Core Requirements**
- [x] **Reusable Autocomplete Component** with remote API integration
- [x] **Responsive Calendar View** with mobile-first design
- [x] **Week View** with 7 tiles and pagination
- [x] **Station Selector** using autocomplete
- [x] **Bookings Display** on day tiles
- [x] **Booking Detail View** with all required information
- [x] **Navigation** between calendar and detail views

### ✅ **Optional Features**
- [x] **Drag & Drop Rescheduling** with visual feedback
- [x] **State Management** with React hooks
- [x] **Unit Tests** with Jest and React Testing Library
- [x] **Error Handling** and loading states

### ✅ **Professional Excellence**
- [x] **Enterprise Architecture** with proper separation of concerns
- [x] **TypeScript** with strict type safety
- [x] **Service Layer Pattern** for API management
- [x] **Custom Hooks** for reusable logic
- [x] **Component Composition** for flexibility
- [x] **Error Boundaries** and graceful fallbacks
- [x] **Performance Optimization** with debouncing and memoization


## 🎨 **UI/UX Features**

### **Design System**
- **Consistent Components**: Reusable UI building blocks
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Visual Feedback**: Loading states, error messages, success indicators

### **User Experience**
- **Intuitive Navigation**: Clear breadcrumbs and navigation
- **Visual Feedback**: Immediate response to user actions
- **Error Handling**: User-friendly error messages
- **Performance**: Optimized for fast interactions

## 🔧 **Development**

### **Code Quality**
- **TypeScript Strict Mode**: Maximum type safety
- **ESLint Configuration**: Consistent code style
- **Component Architecture**: Single responsibility principle
- **Error Handling**: Comprehensive error boundaries

### **Testing Strategy**
- **Unit Tests**: Component and utility testing
- **Integration Tests**: Service layer testing
- **Mock Strategy**: Proper API mocking
- **Test Coverage**: Core functionality covered

### **Performance**
- **Debounced Search**: Optimized API calls
- **Memoized Calculations**: Efficient re-renders
- **Lazy Loading**: Component-level optimization
- **Bundle Optimization**: Tree-shaking and code splitting


**Built with ❤️ and professional expertise for the roadsurfer**
# campervan-calendar
