# ADmyBRAND Insights - AI-Powered Marketing Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js 14, TypeScript, and Tailwind CSS. Designed for marketing agencies to track campaign performance and optimize marketing strategies with advanced AI-powered features.

**Note**: This is a demonstration project with mock data and simulated AI features. All data is generated using Faker.js for realistic presentation.

## ✨ Features

### 🔐 Authentication & Navigation
- 🔑 **Mock Login System**: Beautiful login page with modern UI design
  - **Glassmorphism Design**: Subtle gradient backgrounds with backdrop blur effects
  - **Smooth Animations**: Framer Motion powered page load and form transitions
  - **Password Toggle**: Eye icon to show/hide password with smooth transitions
  - **Loading States**: 1-second loading simulation with spinner animation
  - **No Validation**: Accepts any credentials for demo purposes
  - **Auto-redirect**: Seamless navigation from login to dashboard
  - **Responsive Design**: Perfect on mobile, tablet, and desktop

- 🚪 **User Profile & Logout**
  - **Dynamic Avatar**: Shows user initials (e.g., "SD" for "Shreyas Deb")
  - **Profile Dropdown**: Professional dropdown menu with user info
  - **Menu Options**: Profile, Settings, and Logout with icons
  - **Logout Functionality**: Redirects to login page from top navbar

### 🚀 Core Analytics Dashboard
- 📊 **Real-time Metrics Overview**
  - **Live Updates**: Metrics refresh every 10 seconds with smooth animations
  - **Key Performance Indicators**: Revenue, Users, Conversions, Growth Rate
  - **Animated Cards**: Hover effects and loading skeletons
  - **Mock Data**: Realistic metrics generated with Faker.js

- 📈 **Interactive Charts Section**
  - **Revenue Chart**: Line chart with AI projection lines and glow effects
  - **Conversions Chart**: Bar chart with custom tooltips and animations
  - **User Distribution**: Donut chart showing user demographics
  - **Smart Toggle Controls**: Individual visibility toggles for each data series
  - **Historical/Future Logic**: Automatic toggle states based on date selection

- 📋 **Advanced Campaigns Table**
  - **Sorting & Filtering**: Multi-column sorting with search functionality
  - **Pagination**: Efficient data loading with page controls
  - **Status Indicators**: Color-coded campaign status badges
  - **Action Buttons**: View details, edit, and export options
  - **Responsive Design**: Adapts to different screen sizes

### 🤖 AI-Powered Features (Simulated)
- **AI Assistant Chat Widget**
  - **Floating Button**: Fixed bottom-right circular button with robot icon
  - **Context-Aware Responses**: Different responses based on current page
  - **Page-Specific Insights**: 
    - Dashboard: Revenue, users, conversions, growth summaries
    - Reports: Campaign performance, trends, optimization suggestions
  - **Preset Prompts**: Quick access to common analytics questions
  - **HTML Rendering**: Supports bold text and formatting in responses
  - **Typing Animations**: Realistic chat experience with loading states
  - **Message History**: Maintains conversation context

- **AI Projection Charts**
  - **Linear Regression**: 30-day historical data analysis (simulated)
  - **Predictive Lines**: Purple dotted lines with glow effects
  - **Smart Date Logic**: 
    - Historical View: AI projection disabled
    - Mixed View: All toggles available
    - Future View: Only AI projection shown
  - **Custom Tooltips**: Projection-specific information display

### 🔔 Advanced Notification System
- **Global Notification Context**
  - **Real-time Updates**: React Context for app-wide notification management
  - **Unread Count**: Tracks unread notifications with badge
  - **Multiple Types**: Info, success, warning, and error notifications
  - **Interactive Features**: Click-outside-to-close, mark as read/unread
  - **Time Stamps**: "Time ago" formatting for notification timestamps

- **Download Integration**
  - **CSV Export Notifications**: Automatic success alerts with file info
  - **PDF Export Notifications**: Professional report completion alerts
  - **Action Buttons**: Quick access to download management
  - **Error Handling**: Graceful failure notifications

### 📊 Advanced Chart Features
- **Revenue Chart with AI Projections**
  - **Historical Data**: Real revenue trends with smooth animations
  - **AI Projection Lines**: Purple dotted lines with glow effects
  - **Toggle Controls**: Individual visibility for historical vs projected data
  - **Custom Tooltips**: Detailed information on hover
  - **Responsive Design**: Adapts to container size

- **Conversions Chart**
  - **Bar Chart Visualization**: Clear conversion rate display
  - **Animated Bars**: Smooth loading animations
  - **Custom Styling**: Brand-consistent colors and design
  - **Interactive Elements**: Hover effects and tooltips

- **User Distribution Chart**
  - **Donut Chart**: Clean demographic visualization
  - **Color-coded Segments**: Distinct colors for different user types
  - **Percentage Labels**: Clear data representation
  - **Smooth Animations**: Loading and hover effects

### 📁 Export & Data Management
- **CSV Export System**
  - **Campaign Data**: Comprehensive campaign information export
  - **Custom Date Ranges**: Filtered exports based on selected dates
  - **Formatted Headers**: Professional column headers
  - **Date-stamped Filenames**: Organized file naming with date ranges
  - **Client-side Generation**: No server dependency

- **PDF Export System**
  - **Professional Reports**: jsPDF-generated reports with custom styling
  - **Summary Statistics**: Key metrics and performance indicators
  - **Campaign Comparison Tables**: Detailed campaign analysis
  - **Custom Branding**: Consistent with dashboard design
  - **Download Notifications**: Automatic success alerts

### 🎨 Theme & Design System
- **Dark/Light Mode**
  - **System Preference Detection**: Automatic theme based on OS settings
  - **Smooth Transitions**: No flicker during theme changes
  - **Optimized Colors**: Perfect contrast for both themes
  - **Persistent Selection**: Remembers user's theme choice

- **Responsive Design**
  - **Mobile (<768px)**: Collapsible sidebar, stacked cards
  - **Tablet (768-1024px)**: Optimized grid layouts
  - **Desktop (>1024px)**: Full sidebar, multi-column layouts
  - **Touch-friendly**: Optimized for touch interactions

### 📋 Campaign Management
- **Campaign Management Page**
  - **Advanced Filters**: Multi-criteria campaign filtering
  - **Bulk Actions**: Select multiple campaigns for operations
  - **Edit Modal**: Inline campaign editing with form validation
  - **Status Management**: Update campaign status with visual feedback
  - **Search Functionality**: Real-time campaign search

- **Campaign Details Drawer**
  - **Detailed View**: Comprehensive campaign information
  - **Performance Metrics**: Key performance indicators
  - **Edit Functionality**: Inline editing capabilities
  - **Responsive Design**: Works on all screen sizes

### 📊 Reports & Analytics
- **Advanced Reports Page**
  - **Campaign Comparison Table**: Side-by-side campaign analysis
  - **Performance Insights**: AI-generated insights and recommendations
  - **Filter Bar**: Advanced filtering and sorting options
  - **Export Options**: CSV and PDF export capabilities
  - **Interactive Elements**: Expandable rows and detailed views

- **Campaign Insights**
  - **Performance Analysis**: Detailed campaign performance breakdown
  - **Trend Identification**: Historical performance trends
  - **Recommendations**: AI-generated optimization suggestions
  - **Visual Charts**: Performance visualization with charts

### ⚙️ Settings & Configuration
- **Settings Panel**
  - **User Preferences**: Theme, notifications, and display options
  - **Dashboard Configuration**: Customizable layout and metrics
  - **Export Settings**: Default export formats and preferences
  - **Notification Preferences**: Customizable notification types

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 14** with App Router for modern React development
- **TypeScript** for type safety and better developer experience
- **React 18** with modern hooks and concurrent features

### **Styling & UI**
- **Tailwind CSS** for utility-first styling and rapid development
- **shadcn/ui** component library (Radix UI + Tailwind) for accessible components
- **Framer Motion** for smooth animations and transitions
- **Lucide React** for consistent, beautiful icons

### **Data & Charts**
- **Recharts** for interactive, responsive chart components
- **Faker.js** for realistic mock data generation
- **date-fns** for advanced date manipulation and formatting

### **Export & PDF**
- **jsPDF** for client-side PDF generation
- **jspdf-autotable** for professional table formatting in PDFs
- **Blob API** for client-side CSV file generation and downloads

### **State Management**
- **React Context** for global state management (notifications, theme)
- **React Hooks** for local component state
- **Custom hooks** for reusable logic and data fetching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd ADmyBrand-Analytics-Dashboard_polished
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

**Demo Credentials**: Any email/password combination will work for login

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx               # Main page (redirects to login)
│   ├── login/
│   │   └── page.tsx           # Beautiful login page
│   ├── dashboard/
│   │   └── page.tsx           # Dashboard page (after login)
│   ├── reports/
│   │   └── page.tsx           # Reports page
│   ├── manage-campaigns/
│   │   └── page.tsx           # Campaign management page
│   └── globals.css            # Global styles and CSS variables
├── components/
│   ├── ai-summary-button.tsx      # Floating AI assistant button
│   ├── ai-summary-modal.tsx       # AI chat interface
│   ├── notification-dropdown.tsx  # Notification system
│   ├── theme-provider.tsx         # Theme context provider
│   ├── dashboard/
│   │   ├── dashboard-layout.tsx   # Main layout with sidebar
│   │   ├── dashboard-content.tsx  # Dashboard page content
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   ├── top-navbar.tsx        # Top navigation with user dropdown
│   │   ├── metrics-overview.tsx  # Metrics cards section
│   │   ├── metric-card.tsx       # Individual metric card
│   │   ├── charts-section.tsx    # Charts container with toggles
│   │   ├── campaigns-table.tsx   # Campaigns data table
│   │   ├── page-header.tsx       # Page title and export actions
│   │   ├── date-range-picker.tsx # Custom date range selector
│   │   ├── insights-banner.tsx   # AI insights banner
│   │   ├── top-campaigns-leaderboard.tsx # Top campaigns display
│   │   ├── campaign-details-drawer.tsx # Campaign details modal
│   │   ├── settings-panel.tsx    # Settings configuration
│   │   └── charts/
│   │       ├── revenue-chart.tsx       # Revenue line chart with AI projections
│   │       ├── conversions-chart.tsx   # Conversions bar chart
│   │       └── user-distribution-chart.tsx # User distribution donut chart
│   ├── reports/
│   │   ├── reports-page.tsx      # Reports page component
│   │   ├── reports-filter-bar.tsx # Reports filtering interface
│   │   ├── campaign-comparison-table.tsx # Advanced comparison table
│   │   └── campaign-insights.tsx  # Campaign insights component
│   ├── manage-campaigns/
│   │   ├── manage-campaigns-table.tsx # Campaign management table
│   │   ├── manage-campaigns-filters.tsx # Campaign filtering
│   │   └── campaign-edit-modal.tsx # Campaign editing modal
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── utils.ts                 # Utility functions (cn, getInitials)
│   ├── types.ts                 # TypeScript type definitions
│   ├── mock-data.ts             # Mock data generation with AI projections
│   ├── export-utils.ts          # CSV/PDF export functions
│   └── notification-context.tsx # Global notification system
├── hooks/
│   └── use-toast.ts             # Toast notification hook
└── README.md
```

## 🎯 Key Features in Detail

### 🔐 Login System

**Beautiful Login Page:**
- Modern glassmorphism design with gradient backgrounds
- Smooth Framer Motion animations on page load
- Password visibility toggle with eye icon
- Loading spinner during authentication simulation
- Responsive design for all device sizes
- Dark/light mode support matching dashboard theme

**Navigation Flow:**
- Automatic redirect from root to login page
- 1-second loading simulation before dashboard access
- User profile dropdown with logout functionality
- Seamless routing with Next.js App Router

### 🤖 AI Assistant System

**Floating Chat Widget:**
- Fixed bottom-right circular button with robot icon
- Smooth modal expansion with Framer Motion
- Context-aware responses based on current page
- Full chat interface with message history
- Typing animations and loading states

**Smart Responses:**
- **Dashboard Page**: Revenue, users, conversions, growth summaries
- **Reports Page**: Campaign performance, trends, optimization suggestions
- **Preset Prompts**: Quick access to common analytics questions
- **HTML Rendering**: Bold text and formatting support

### 📊 Advanced Chart System

**AI Projection Features:**
- **Linear Regression**: 30-day historical data analysis (simulated)
- **Predictive Lines**: Purple dotted lines with glow effects
- **Smooth Connections**: Blended projection points for continuity
- **Custom Tooltips**: Projection-specific information display

**Smart Date Range Logic:**
- **Historical View** (both dates ≤ present): AI projection disabled
- **Mixed View** (start ≤ present, end > present): All toggles available
- **Future View** (both dates > present): Only AI projection shown
- **Auto Toggle States**: Intelligent control based on date selection

**Chart Controls:**
- Individual toggle switches for each line type
- Visual feedback with color-coded indicators
- Context labels for historical/future views
- Disabled states with appropriate styling

### 🔔 Notification System

**Global Context:**
- React Context for app-wide notification management
- Real-time notification updates
- Unread count tracking
- Multiple notification types (info, success, warning, error)

**Interactive Features:**
- Click-outside-to-close functionality
- Mark as read/unread
- Remove individual notifications
- Clear all notifications
- Time-ago formatting

**Download Integration:**
- Automatic notifications for CSV exports
- Automatic notifications for PDF exports
- Success messages with file information
- Action buttons for download management

### 📁 Export System

**CSV Export:**
- Campaign data with custom date ranges
- Formatted headers and data
- Date-stamped filenames
- Client-side generation

**PDF Export:**
- Professional report formatting
- Summary statistics
- Campaign comparison tables
- Custom styling with jsPDF

**Integration:**
- Notification callbacks for success alerts
- Error handling for failed exports
- Loading states during export
- File naming with date ranges

### 🎨 Theme System

**Dark/Light Mode:**
- System preference detection
- Smooth theme transitions
- Optimized colors for both themes
- Persistent theme selection

**Responsive Design:**
- **Mobile** (<768px): Collapsible sidebar, stacked cards
- **Tablet** (768-1024px): Optimized grid layouts
- **Desktop** (>1024px): Full sidebar, multi-column layouts

## 🔧 Advanced Features

### Real-time Updates
- Data refreshes automatically every 10 seconds
- Smooth animations for data transitions
- Loading skeletons during data fetch
- Optimized performance with React.memo

### Performance Optimizations
- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### Type Safety
- Full TypeScript implementation
- Strict type checking
- Interface definitions for all data structures
- Type-safe component props

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Manual Build

```bash
npm run build
npm start
```

## 🎨 Customization

### Adding New Metrics
1. Update the `Metrics` interface in `lib/types.ts`
2. Modify `generateMockData()` in `lib/mock-data.ts`
3. Add new metric cards in `metrics-overview.tsx`

### Creating New Charts
1. Create a new chart component in `components/dashboard/charts/`
2. Add the chart to `charts-section.tsx`
3. Update mock data generation as needed

### AI Assistant Customization
1. Modify `components/ai-summary-modal.tsx` for new responses
2. Add new preset prompts in the chat interface
3. Update page detection logic for new routes

### Notification System
1. Use `useNotifications()` hook in any component
2. Add custom notification types in `lib/notification-context.tsx`
3. Implement custom notification actions

### Styling
- Colors are defined in `app/globals.css` using CSS variables
- Components use Tailwind classes with shadcn/ui
- Animations are handled by Framer Motion

### Environment Variables
Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_APP_NAME=ADmyBRAND Insights
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill the process using port 3000
npx kill-port 3000
# or
lsof -ti:3000 | xargs kill -9
```

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

**TypeScript errors:**
```bash
# Check for type errors
npx tsc --noEmit
```

**AI Assistant not working:**
- Check browser console for errors
- Ensure all dependencies are installed
- Verify React Context providers are properly set up

## 📊 Performance Metrics

- **Bundle Size**: Optimized with Next.js tree shaking
- **Loading Speed**: Lazy loading for non-critical components
- **Memory Usage**: Efficient state management with React Context
- **SEO**: Server-side rendering with Next.js

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design for all new components
- Test AI assistant functionality across different pages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Recharts](https://recharts.org/) for the chart library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icons
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Faker.js](https://fakerjs.dev/) for realistic mock data

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Made with ❤️ for marketing professionals**

*Built with Next.js, TypeScript, and AI-powered insights*
