# SkinScan Web Frontend

A modern, responsive web application for the SkinScan project, providing users with a dashboard to track their skin health, perform scans, and view detailed analysis reports.

## Features

- **Interactive Dashboard**: Overview of scan history and monthly insights using Recharts.
- **AI Skin Scan**: Interface to upload skin images and receive instant AI analysis.
- **Detailed Reports**: Visual heatmap overlays and disease-specific suggestions.
- **PDF Generation**: Downloadable analysis reports using jsPDF.
- **Responsive Design**: Clean and premium UI built with Tailwind CSS and Radix UI.
- **State Management**: Robust state handling using Redux Toolkit.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Library**: Radix UI (Shadcn-like components)
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: Redux Toolkit

## Getting Started

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd skinscan-web-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

### Running the App

Start the development server:

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Folder Structure

- `src/components`: UI components and page layouts.
- `src/api`: API service layer for backend communication.
- `src/store`: Redux store and slices.
- `src/utils.ts`: Shared utility functions.