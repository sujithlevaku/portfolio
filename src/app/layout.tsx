import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Sujith Kumar Reddy | Sr. Full Stack & DevOps Engineer',
  description:
    'Senior Software Engineer specializing in Ruby on Rails, React, and robust cloud infrastructure automation via Terraform, Kubernetes, and GitOps workflows.',
  keywords: [
    'sujithreddy dev',
    'Sujith Kumar Reddy Levaku',
    'Sujith Levaku',
    'Ruby on Rails Full Stack Engineer',
    'DevOps Terraform Kubernetes',
  ],
  verification: {
    google: '7hvpmhp7MPjBDbRwnWg9HWm0U0_yW9tctoFQw0gPRxY',
  },
  icons: {
    icon: [{ url: '/assets/images/app_logo.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fsystembuil9407back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.19"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}
