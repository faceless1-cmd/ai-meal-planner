import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Unlock Your Full Potential</h1>
        <p className="text-lg text-gray-600 mb-8">
          The AI Meal Planner is designed to empower you with personalized nutrition.
          While the core generation feature is currently free to explore, we are
          developing premium features to enhance your experience even further.
        </p>

        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">Future Premium Features May Include:</h2>
          <ul className="list-disc list-inside text-gray-600 mx-auto max-w-sm">
            <li>Save and track multiple meal plans</li>
            <li>Detailed nutritional breakdowns</li>
            <li>Grocery list generation</li>
            <li>Integration with fitness trackers</li>
            <li>Priority access to new AI models</li>
          </ul>
        </div>

        <p className="text-xl font-bold text-blue-600 mb-4">
          Pricing Plans: Coming Soon!
        </p>
        <p className="text-md text-gray-600">
          We are working hard to bring you flexible and valuable subscription tiers.
          Stay tuned for updates!
        </p>

        <Link href="/" className="mt-8 inline-block text-blue-600 hover:text-blue-800 transition-colors duration-200">
          ← Back to Meal Planner
        </Link>
      </div>
    </main>
  );
}
