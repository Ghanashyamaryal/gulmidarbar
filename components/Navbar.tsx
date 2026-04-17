import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          गुल्मी दर्बार गाउँपालिका
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            गृहपृष्ठ
          </Link>
          <Link href="/issues" className="hover:underline">
            समस्याहरू
          </Link>
          <Link href="/submit" className="hover:underline">
            पेश गर्नुहोस्
          </Link>
          <Link href="/admin" className="hover:underline">
            प्रशासन
          </Link>
        </div>
      </div>
    </nav>
  );
}