export const metadata = {
  title: 'About Us & Help Center | Pandharpur Darshan',
  description: 'Learn about the mission of Pandharpur Darshan. Find answers to frequently asked questions about the AI Trip Planner and our booking services.',
  openGraph: {
    title: 'About Us & Help Center | Pandharpur Darshan',
    description: 'Learn about the mission of Pandharpur Darshan and find answers to frequently asked questions.',
    url: '/help',
  },
  alternates: {
    canonical: '/help',
  },
};

export default function HelpLayout({ children }) {
  return <>{children}</>;
}
