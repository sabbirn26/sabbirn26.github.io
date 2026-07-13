export const profile = {
  name: 'Sabbir Nasir',
  monogram: 'SN',
  role: 'Software Engineer',
  eyebrow: 'iOS Software Engineer · Fintech · Dhaka, Bangladesh',
  tagline: 'Crafting exceptional mobile experiences',
  intro:
    'Passionate iOS developer with 3+ years of fintech experience. Specializing in Swift, SwiftUI, and secure mobile applications that users love.',
  summary:
    'An iOS-focused engineering toolkit spanning native development, architecture, frontend foundations, API integration, data, DevOps workflows, and technologies I am actively learning.',
  email: 'nsabbir26@gmail.com',
  phone: '+880 152 123 4980',
  phoneHref: 'tel:+8801521234980',
  github: 'https://github.com/sabbirn26',
  linkedin: 'https://linkedin.com/in/sabbirn26',
  resume: '/assets/cv.pdf',
  image: '/assets/profile.png',
}

export const projects = [
  {
    title: 'ZiCharge',
    category: 'Mobile wallet',
    description:
      'A multilingual mobile financial services product with secure authentication, crypto flows, P2P transfers, notifications, and payment tools.',
    mobileSummary: 'Wallet for payments and crypto.',
    impact: 'Production iOS app',
    tech: ['Swift', 'UIKit', 'Biometrics', 'Fintech'],
    screenshot: '/assets/projects/zicharge.jpg',
    screenshotReady: false,
    primaryLink: 'https://apps.apple.com/in/app/zicharge/id1611304451',
    primaryLabel: 'App Store',
    primaryPlatform: 'app-store',
    featured: true,
    theme: 'mint',
  },
  {
    title: 'FastPay Wallet',
    category: 'Digital payments',
    description:
      'A secure wallet for Iraq with eKYC, biometric transaction authorization, QR payments, transfers, recharge, and lifestyle services.',
    mobileSummary: 'QR pay, transfers and top-ups.',
    impact: 'Production iOS app',
    tech: ['Swift', 'UIKit', 'eKYC', 'Payments'],
    screenshot: '/assets/projects/fastpay-wallet.jpg',
    screenshotReady: false,
    primaryLink: 'https://apps.apple.com/in/app/fastpay-wallet/id1255784969',
    primaryLabel: 'App Store',
    primaryPlatform: 'app-store',
    featured: true,
    theme: 'coral',
  },
  {
    title: 'iQDX Crypto Trading',
    category: 'Crypto trading',
    description:
      'A modern trading experience with live market data, portfolio management, identity verification, and security-first account flows.',
    mobileSummary: 'Live crypto trading and portfolios.',
    impact: 'SwiftUI product',
    tech: ['SwiftUI', 'Combine', 'MVVM', 'REST APIs'],
    screenshot: '/assets/projects/iqdx-crypto.jpg',
    screenshotReady: false,
    primaryLink: 'https://www.newroztech.com/product/crypto-wallet',
    primaryLabel: 'Product',
    primaryPlatform: 'product',
    featured: true,
    theme: 'violet',
  },
  {
    title: 'FastPay React Native SDK',
    category: 'Developer tooling',
    description:
      'A payment integration package with deep-link support and a predictable callback API for React Native applications.',
    mobileSummary: 'React Native checkout for FastPay.',
    impact: 'Published npm package',
    tech: ['React Native', 'JavaScript', 'Deep Links', 'SDK'],
    screenshot: '/assets/projects/fastpay-react-sdk.jpg',
    screenshotReady: false,
    primaryLink: 'https://www.npmjs.com/package/fastpay-react-package',
    primaryLabel: 'npm',
    primaryPlatform: 'npm',
    featured: true,
    theme: 'blue',
  },
  {
    title: 'SwyptoTracker',
    category: 'Open source',
    description:
      'A SwiftUI cryptocurrency tracker for prices, portfolio monitoring, and compact market analytics.',
    mobileSummary: 'Crypto prices and portfolio tools.',
    tech: ['SwiftUI', 'MVVM', 'REST APIs'],
    screenshot: '/assets/projects/swyptotracker.jpg',
    screenshotReady: false,
    primaryLink: 'https://github.com/sabbirn26/crypto-swiftui',
    primaryLabel: 'GitHub',
    primaryPlatform: 'github',
    theme: 'mint',
  },
  {
    title: 'TaskNest',
    category: 'Open source',
    description:
      'A focused task manager with persistent storage, a calm visual system, and native SwiftUI interactions.',
    mobileSummary: 'Create, reorder and save tasks.',
    tech: ['SwiftUI', 'Persistence', 'Animation'],
    screenshot: '/assets/projects/tasknest.jpg',
    screenshotReady: false,
    primaryLink: 'https://github.com/sabbirn26/to-do-swiftui',
    primaryLabel: 'GitHub',
    primaryPlatform: 'github',
    theme: 'yellow',
  },
  {
    title: 'MapApp',
    category: 'Open source',
    description:
      'An iOS exploration app for discovering locations and moving naturally between maps and place details.',
    mobileSummary: 'Explore places on a map.',
    tech: ['SwiftUI', 'MapKit', 'MVVM'],
    screenshot: '/assets/projects/mapapp.jpg',
    screenshotReady: false,
    primaryLink: 'https://github.com/sabbirn26/map-app',
    primaryLabel: 'GitHub',
    primaryPlatform: 'github',
    theme: 'blue',
  },
  {
    title: 'XOXO',
    category: 'Open source',
    description:
      'A tactile Tic Tac Toe game demonstrating MVVM, haptic feedback, and polished state transitions.',
    mobileSummary: 'Tic Tac Toe with scores and haptics.',
    tech: ['SwiftUI', 'MVVM', 'Haptics'],
    screenshot: '/assets/projects/xoxo.jpg',
    screenshotReady: false,
    primaryLink: 'https://github.com/sabbirn26/tictactoe_game_swiftui',
    primaryLabel: 'GitHub',
    primaryPlatform: 'github',
    theme: 'coral',
  },
  {
    title: 'Currency Converter',
    category: 'Open source',
    description:
      'A lightweight SwiftUI currency tool with current rates, clear inputs, and fluid native interactions.',
    mobileSummary: 'Live rates and quick swaps.',
    tech: ['SwiftUI', 'API', 'Networking'],
    screenshot: '/assets/projects/currency-converter.jpg',
    screenshotReady: false,
    primaryLink: 'https://github.com/sabbirn26/currency-converter-swiftui',
    primaryLabel: 'GitHub',
    primaryPlatform: 'github',
    theme: 'violet',
  },
]

// Add approved LinkedIn quotes here using:
// { quote, name, title, company, linkedinUrl, avatar: '/optional/path.jpg' }
// The UI handles an empty array without fake testimonials.
export const recommendations = []

export const skills = [
  {
    label: 'Languages',
    items: ['Swift', 'Java (Learning)', 'Python', 'C', 'C++', 'C#'],
  },
  {
    label: 'Mobile',
    items: ['SwiftUI', 'UIKit', 'Storyboard', 'Combine', 'React Native'],
  },
  {
    label: 'Frontend',
    items: ['HTML', 'CSS', 'React', 'React Native', 'Flutter (Basic)'],
  },
  {
    label: 'Backend',
    items: ['Java (Learning)', 'Spring Boot (Learning)', 'REST APIs'],
    status: 'Currently learning',
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'Core Data'],
  },
  {
    label: 'Tools & DevOps',
    items: ['Git', 'CI/CD', 'Sourcetree', 'Bitbucket', 'Linux', 'App Store Connect'],
  },
  {
    label: 'Architecture & testing',
    items: ['MVC', 'MVVM', 'VIPER', 'Clean Architecture', 'Software Testing', 'Performance Debugging'],
  },
]

export const experience = [
  {
    role: 'Software Engineer',
    company: 'Newroz Technologies Limited',
    start: 'January 2026',
    end: 'Present',
    currentStart: '2026-01-01',
    location: 'Dhaka, Bangladesh · On-site',
    summary:
      'Leading delivery for production fintech products with an emphasis on maintainable architecture, product quality, and dependable releases.',
    highlights: [
      'Lead iOS development initiatives across key fintech products.',
      'Mentor junior developers and raise quality through code review.',
      'Shape scalable SwiftUI solutions using Clean Architecture.',
      'Improve delivery workflows and release reliability.',
    ],
  },
  {
    role: 'Junior Software Engineer (iOS)',
    company: 'Newroz Technologies Limited',
    start: 'March 2023',
    end: 'December 2025',
    duration: '2 years 10 months',
    location: 'Dhaka, Bangladesh · On-site',
    summary:
      'Built and maintained production iOS features across crypto trading, mobile wallet, and payment products using Swift, SwiftUI, and UIKit.',
    highlights: [
      'Delivered trading and performance improvements for iQDX.',
      'Built ZiCharge flows for crypto, biometrics, device verification, account security, and notifications.',
      'Integrated FastPay payment journeys and eKYC interfaces.',
      'Debugged, optimized, and shipped releases through the App Store.',
    ],
  },
  {
    role: 'Software Engineer in Test',
    company: 'Newroz Technologies Limited',
    start: 'December 2022',
    end: 'February 2023',
    duration: '3 months',
    summary:
      'Moved from product testing into hands-on application work across iQDX and ZiCharge while building practical UIKit foundations.',
    highlights: [
      'Contributed to real product releases and application improvements.',
      'Built UIKit and Storyboard fluency through production interfaces.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Newroz Technologies Limited',
    start: 'August 2022',
    end: 'November 2022',
    duration: '4 months',
    summary:
      'Developed a practical foundation in Swift, SwiftUI, architecture, debugging, REST APIs, Core Data, and collaborative Git workflows.',
    highlights: [
      'Applied MVC, MVVM, and VIPER to working mobile projects.',
      'Practiced performance debugging and native UI implementation.',
    ],
  },
]
