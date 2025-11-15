# Monthly Falls Review & Goal Tracker

A comprehensive React application for documenting fall trends, setting measurable goals, and driving accountability in healthcare facilities. This tool helps healthcare teams systematically review monthly fall incidents, track progress on goals, and implement data-driven improvement strategies.

## 🎯 Features

- **Meeting Information Tracking**: Document facility details, review periods, and key attendees
- **Previous Goals Progress**: Review and report on goals from previous meetings with accountability tracking
- **Trend Analysis**: Identify and document fall trends with data-driven insights
- **Solution Documentation**: Capture team discussions and proposed interventions
- **Goal Setting**: Create specific, measurable goals with:
  - Multiple metric categories (Time-Based, Location-Based, Resident-Specific, Injury-Related, Overall Metrics)
  - Target definitions and timeframes
  - Responsible person assignments
  - Dynamic goal addition/removal
- **Action Items**: Track follow-up tasks with clear accountability
- **Meeting Summary**: Real-time summary of review status and goals set
- **Responsive Design**: Beautiful, modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Lucide React** - Beautiful icon library

## 📋 Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd goals-feature
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

Build the application for production:
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
goals-feature/
├── src/
│   ├── components/
│   │   ├── FallsReviewTracker.tsx  # Main component
│   │   └── index.ts                 # Component exports
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── utils/
│   │   └── index.ts                 # Utility functions
│   ├── App.tsx                      # Root component
│   └── main.tsx                     # Application entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── README.md                        # This file
```

## 🎨 Key Components

### FallsReviewTracker

The main component that handles:
- Form state management
- Dynamic goal addition/removal
- Form validation
- Data submission (ready for backend integration)

### Type Definitions

- `Goal`: Interface for individual goal entries
- `FallsReviewFormData`: Complete form data structure

## 📝 Usage

1. **Enter Meeting Information**: Fill in home name, review month, and attendees
2. **Review Previous Goals**: Document progress on goals from the previous month
3. **Identify Trends**: Analyze fall data and document observed patterns
4. **Document Solutions**: Record team discussions and proposed interventions
5. **Set New Goals**: Create specific, measurable goals with metrics and accountability
6. **Define Action Items**: List follow-up tasks with responsible parties
7. **Submit Review**: Submit the completed monthly review (currently logs to console)

## 🔄 Future Enhancements

- Backend API integration for data persistence
- Authentication and user management
- Multi-facility support
- Historical data visualization
- Export to PDF functionality
- Goal tracking dashboard
- Email notifications for action items

## 🤝 Contributing

This is a private project. For contributions, please contact the project maintainer.

## 📄 License

Private project - All rights reserved

## 👥 Support

For questions or issues, please contact the development team.

---

**Note**: This application is designed for healthcare facilities to improve fall prevention practices through systematic review and goal-setting processes.

