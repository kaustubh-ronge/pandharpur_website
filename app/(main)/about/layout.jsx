
export const metadata = {
  title: 'About & Help Center | Pandharpur Darshan',
  description: 'Learn about our mission to serve the devotees of Pandharpur. Find answers to frequently asked questions about our platform and services.',
  openGraph: {
    title: 'About & Help Center | Pandharpur Darshan',
    description: 'Learn about our mission and find help for your Pandharpur pilgrimage.',
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
