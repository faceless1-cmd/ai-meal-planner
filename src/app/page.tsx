"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [preferences, setPreferences] = useState("");
  const [calories, setCalories] = useState("");
  const [exclude, setExclude] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMealPlan("");
    setError("");

    try {
      const response = await fetch("/api/generate-meal-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dietaryPreferences: preferences,
          calorieTarget: calories,
          foodsToExclude: exclude,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong.");
      }

      const data = await response.json();
      setMealPlan(data.mealPlan);
    } catch (err: any) {
      setError(err.message || "Failed to generate meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">AI Meal Planner</h1>
        <p className="text-center text-gray-600 mb-8">Generate personalized meal plans instantly!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">
              Dietary Preferences (e.g., vegan, low-carb, high-protein)
            </label>
            <textarea
              id="preferences"
              name="preferences"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., vegetarian, dairy-free, no nuts"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
              Daily Calorie Target (optional)
            </label>
            <input
              type="number"
              id="calories"
              name="calories"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., 2000"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="exclude" className="block text-sm font-medium text-gray-700">
              Foods to Exclude (e.g., peanuts, cilantro, seafood)
            </label>
            <textarea
              id="exclude"
              name="exclude"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., broccoli, mushrooms, pork"
              value={exclude}
              onChange={(e) => setExclude(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Meal Plan"}
          </button>
        </form>
      </div>

      {loading && (
        <div className="mt-8 text-center text-gray-700">
          Generating your personalized meal plan...
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md w-full max-w-md">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
          <p className="mt-2">Please ensure you have set your `GEMINI_API_KEY` in `.env.local`.</p>
        </div>
      )}

      {mealPlan && (
        <div className="mt-8 w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Your Personalized Meal Plan</h2>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {mealPlan}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link href="/pricing" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
          Explore Pricing & Features →
        </Link>
      </div>
    </main>
  );
}