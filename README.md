# Traffic Prediction System

A real-time traffic monitoring and prediction system built with Next.js, featuring AI-powered congestion forecasting, route optimization, and comprehensive system monitoring capabilities.

## 🚀 Overview

The Traffic Prediction System is a modern web application that provides real-time traffic analysis, intelligent route recommendations, and predictive traffic modeling. The system simulates a comprehensive traffic management platform with features including:

- **Real-time Traffic Dashboard**: Live monitoring of traffic segments with congestion levels
- **AI-Powered Predictions**: Machine learning-based traffic forecasting for 15, 30, and 60-minute horizons
- **Route Optimization**: Intelligent route comparison and recommendations based on current traffic conditions
- **System Monitoring**: Comprehensive health metrics and performance tracking
- **Alert Management**: Real-time notifications for traffic incidents and system events

## 🏗️ Architecture

### Tech Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9 with custom animations
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Data Fetching**: SWR for real-time data updates
- **Charts & Visualization**: Recharts for data visualization
- **Icons**: Lucide React

### Project Structure

```
Traffic-Prediction-System/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   └── traffic/
│   │       ├── alerts/           # Traffic alerts endpoint
│   │       ├── metrics/          # System metrics endpoint
│   │       ├── predictions/      # Traffic predictions endpoint
│   │       ├── routes/           # Route optimization endpoint
│   │       └── segments/         # Traffic segments endpoint
│   ├── monitoring/               # System monitoring page
│   ├── predictions/              # Predictions visualization page
│   ├── routes/                   # Route optimization page
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Main dashboard page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Base UI components (shadcn/ui)
│   ├── accuracy-trends.tsx       # Prediction accuracy visualization
│   ├── alerts-panel.tsx          # Traffic alerts display
│   ├── nav-header.tsx            # Navigation header
│   ├── performance-chart.tsx     # System performance charts
│   ├── prediction-*.tsx          # Prediction-related components
│   ├── queue-monitor.tsx         # Message queue monitoring
│   ├── route-*.tsx               # Route-related components
│   ├── system-health.tsx         # System health status
│   ├── traffic-*.tsx             # Traffic monitoring components
│   └── ...
├── lib/                          # Utility libraries
│   ├── route-generator.ts        # Route generation algorithms
│   ├── traffic-simulator.ts      # Traffic data simulation
│   ├── types.ts                  # TypeScript type definitions
│   └── ...
├── hooks/                        # Custom React hooks
│   └── use-traffic-data.ts       # SWR-based data fetching hooks
└── package.json                  # Project dependencies
```

## 📊 Core Features

### 1. Traffic Dashboard

The main dashboard (`/`) provides:
- Real-time traffic segment visualization
- Interactive traffic map
- Live traffic statistics (average speed, congestion levels, vehicle counts)
- Active alerts panel
- Detailed traffic segments list

### 2. Route Optimization (`/routes`)

Route optimization features include:
- Multiple route comparison (up to 6 routes)
- Real-time route recommendations
- Estimated time and distance calculations
- Congestion-aware routing
- Interactive route visualization
- Detailed segment-by-segment breakdown

### 3. Traffic Predictions (`/predictions`)

AI-powered prediction system with:
- Multi-horizon predictions (15, 30, 60 minutes)
- Confidence scores for each prediction
- Prediction timeline visualization
- Prediction accuracy metrics
- Heatmap visualization of predicted congestion
- Historical prediction trends

### 4. System Monitoring (`/monitoring`)

Comprehensive system monitoring dashboard:
- Real-time performance metrics
- System health status
- Data ingestion rates
- Processing latency tracking
- Prediction accuracy trends
- Message queue depth monitoring
- Service uptime tracking

## 🔌 API Endpoints

All API endpoints are located under `/api/traffic/`:

### GET `/api/traffic/segments`
Returns real-time traffic segment data.

**Response:**
```typescript
TrafficSegment[] {
  id: string
  roadName: string
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  currentSpeed: number
  averageSpeed: number
  congestionLevel: "low" | "moderate" | "high" | "severe"
  vehicleCount: number
  timestamp: Date
}
```

### GET `/api/traffic/predictions`
Returns AI-generated traffic predictions.

**Response:**
```typescript
TrafficPrediction[] {
  segmentId: string
  roadName: string
  predictedCongestion: "low" | "moderate" | "high" | "severe"
  confidence: number
  timeHorizon: number  // minutes ahead
  predictedSpeed: number
  timestamp: Date
}
```

### GET `/api/traffic/routes`
Returns optimized route suggestions.

**Response:**
```typescript
Route[] {
  id: string
  name: string
  segments: string[]
  totalDistance: number  // km
  estimatedTime: number  // minutes
  congestionScore: number
  alternative: boolean
}
```

### GET `/api/traffic/metrics`
Returns system performance metrics.

**Response:**
```typescript
SystemMetrics {
  timestamp: Date
  dataIngestionRate: number  // events per second
  processingLatency: number  // milliseconds
  predictionAccuracy: number  // percentage
  activeStreams: number
  queueDepth: number
}
```

### GET `/api/traffic/alerts`
Returns active traffic and system alerts.

**Response:**
```typescript
Alert[] {
  id: string
  type: "congestion" | "incident" | "prediction" | "system"
  severity: "info" | "warning" | "critical"
  message: string
  location?: string
  timestamp: Date
}
```

## 🎨 Data Models

### Core Types

The system uses the following TypeScript interfaces (defined in `lib/types.ts`):

- **TrafficSegment**: Represents a road segment with real-time traffic data
- **TrafficPrediction**: AI-generated traffic forecast for a segment
- **Route**: Optimized route with segments and timing information
- **SystemMetrics**: System performance and health metrics
- **Alert**: Traffic or system alert/notification

## 🔄 Data Flow

1. **Data Generation**: `traffic-simulator.ts` generates simulated traffic data including:
   - Traffic segments for 8 major roads
   - 3-5 segments per road with realistic speed variations
   - Predictions for multiple time horizons
   - System metrics and health indicators

2. **API Layer**: Next.js API routes serve data through RESTful endpoints

3. **Data Fetching**: Custom hooks (`use-traffic-data.ts`) use SWR for:
   - Automatic revalidation
   - Real-time updates (3-10 second intervals)
   - Optimistic UI updates
   - Error handling

4. **Visualization**: React components render data using:
   - Recharts for graphs and charts
   - Custom components for specialized visualizations
   - Real-time updates without page refresh

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Traffic-Prediction-System.git
cd Traffic-Prediction-System
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎯 Key Components

### Traffic Monitoring Components

- **TrafficMap**: Interactive map visualization of traffic segments
- **TrafficStats**: Aggregated traffic statistics cards
- **TrafficSegmentsList**: Detailed list view of all segments
- **AlertsPanel**: Real-time alerts and notifications

### Prediction Components

- **PredictionChart**: Line charts showing predicted traffic trends
- **PredictionTimeline**: Timeline view of predictions
- **PredictionHeatmap**: Heatmap visualization of congestion predictions
- **PredictionAccuracy**: Accuracy metrics and confidence scores

### Route Components

- **RouteComparison**: Side-by-side route comparison cards
- **RouteMap**: Interactive map with route visualization
- **RouteDetails**: Detailed breakdown of a selected route

### Monitoring Components

- **SystemHealth**: Service health status dashboard
- **PerformanceChart**: Real-time performance metrics charts
- **QueueMonitor**: Message queue depth visualization
- **AccuracyTrends**: ML model accuracy over time
- **SystemMetricsCards**: Key metric cards (ingestion rate, latency, etc.)

## 🎨 UI/UX Features

- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Real-time Updates**: Automatic data refresh using SWR
- **Interactive Visualizations**: Click, hover, and zoom interactions
- **Theme Support**: Ready for light/dark theme implementation
- **Accessibility**: Built with Radix UI primitives for WCAG compliance
- **Loading States**: Proper loading and error states for all data fetching
- **Animations**: Smooth transitions using Tailwind CSS animations

## 🔧 Configuration

### Next.js Configuration

The project uses custom Next.js configuration (`next.config.mjs`):
- ESLint checks disabled during builds for flexibility
- TypeScript errors ignored during builds
- Image optimization disabled for static export compatibility

### Tailwind CSS

Custom Tailwind configuration with:
- Extended color palette with CSS variables
- Custom animations from `tw-animate-css`
- Component-specific styling utilities

## 🧪 Simulated Services

The system simulates a real-world traffic management infrastructure:

- **Kafka Broker**: Message streaming (simulated health status)
- **Spark Streaming**: Real-time data processing
- **ML Prediction Service**: AI-powered traffic forecasting
- **PostgreSQL Database**: Data persistence
- **API Gateway**: Request routing and management

## 📈 Performance

- **Data Refresh Rates**:
  - Traffic segments: Every 5 seconds
  - System metrics: Every 3 seconds
  - Predictions: Every 10 seconds
  - Routes: Every 10 seconds
  - Alerts: Every 5 seconds

- **Typical Metrics**:
  - Data ingestion: 800-1200 events/second
  - Processing latency: 50-150ms
  - Prediction accuracy: 82-92%
  - Active streams: 8-12
  - Queue depth: 0-1000 messages

## 🛠️ Development

### Adding New Features

1. **New API Endpoint**: Add route handler in `app/api/traffic/[feature]/route.ts`
2. **New Page**: Create page component in `app/[feature]/page.tsx`
3. **New Component**: Add component in `components/[feature].tsx`
4. **Data Hook**: Extend `hooks/use-traffic-data.ts` for data fetching
5. **Types**: Update `lib/types.ts` for new data structures

### Code Style

- TypeScript strict mode enabled
- Components use TypeScript React.FC pattern
- Custom hooks for data fetching
- Server and client components properly separated
- CSS modules and Tailwind for styling

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel

The project is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with default settings

Alternatively, deploy to any Node.js hosting platform that supports Next.js.

## 📝 License

This project is part of a traffic prediction system demonstration.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👥 Authors

- Generated with [v0.app](https://v0.dev)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
