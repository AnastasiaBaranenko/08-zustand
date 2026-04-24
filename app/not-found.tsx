import { Metadata } from "next"
import Link from 'next/link';

// type Props = {
//   params: Promise<{ id: string }>
// }

export const metadata: Metadata = {
//  ({params}: Props)
   title: "404-Not Found",
  description: "Page not found",

  openGraph: {
    title: '404-Not Found',
    description: "Page not found",
    // url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
    // 'http://localhost:3000/',
    images: [
        {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404-Not Found',
        },
      ],
  }
}

export default function NotFound(){
     return (
        <div>
     <h1>404 - Page not found</h1>
     <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Back to Home</Link>
      </div>
)
}