# Betrayal Detection Quiz Application

## Overview

This is a full-stack web application that presents an interactive quiz designed to help users identify potential signs of infidelity in their relationships. The application features a modern, mobile-responsive design with a dark theme and smooth animations. Built using React with TypeScript on the frontend and Express.js on the backend, it utilizes a PostgreSQL database with Drizzle ORM for data management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Styling**: Custom CSS variables for theming with dark mode support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement via Vite integration

### Component Structure
The application follows a component-based architecture with:
- Page-level components for different quiz stages
- Reusable UI components from shadcn/ui
- Custom components for quiz-specific functionality
- Shared schema definitions between client and server

## Key Components

### Quiz Flow Components
1. **WelcomePage**: Initial landing page with quiz introduction
2. **NameInputPage**: Collects user's name for personalization
3. **QuestionPage**: Displays individual quiz questions with answer options
4. **ResultsPage**: Shows personalized results with testimonials and CTA
5. **ProgressBar**: Visual indicator of quiz completion progress

### Supporting Components
- **TestimonialsSection**: Displays user testimonials with avatars
- **FAQSection**: Expandable FAQ with smooth animations
- **CTASection**: Call-to-action for the paid service

### UI Infrastructure
- Comprehensive shadcn/ui component library
- Custom toast notifications system
- Mobile-responsive design utilities
- Accessibility-focused components

## Data Flow

1. **Quiz Initialization**: User starts on welcome page
2. **Name Collection**: User provides name for personalization
3. **Question Flow**: 12 sequential questions about relationship behaviors
4. **Answer Storage**: Responses stored in local state during quiz
5. **Results Generation**: Personalized results displayed based on answers
6. **CTA Presentation**: Payment integration placeholder for premium service

### Question Structure
Each question includes:
- Emoji icon for visual appeal
- Behavioral indicator question text
- Three response options: Yes, No, Sometimes
- Smooth transitions between questions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **@replit/vite-plugin-***: Replit-specific development tools

### UI Dependencies
- **class-variance-authority**: Type-safe variant management
- **clsx**: Conditional class name utility
- **date-fns**: Date manipulation utilities
- **lucide-react**: Icon library

## Deployment Strategy

### Development Environment
- Vite dev server with hot module replacement
- TypeScript compilation checking
- Replit integration for cloud development
- Error overlay for runtime debugging

### Production Build
- Frontend: Vite builds optimized static assets
- Backend: esbuild bundles Node.js application
- Database: Drizzle migrations for schema management
- Assets: Served via Express static middleware

### Environment Configuration
- `NODE_ENV` for environment detection
- `DATABASE_URL` for PostgreSQL connection
- Drizzle configuration for database dialect and credentials

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```