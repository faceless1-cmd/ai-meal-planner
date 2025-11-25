import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { dietaryPreferences, calorieTarget, foodsToExclude } = await req.json();

    if (!dietaryPreferences) {
      return NextResponse.json({ error: 'Dietary preferences are required.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let prompt = `Generate a comprehensive 7-day personalized meal plan.
    The meal plan should be easy to follow and include breakfast, lunch, dinner, and 1-2 snacks per day.
    For each meal, provide a short description or list of ingredients.
    
    User Preferences:
    - Dietary Preferences: ${dietaryPreferences}`;

    if (calorieTarget) {
      prompt += `\n- Daily Calorie Target: approximately ${calorieTarget} calories`;
    }
    if (foodsToExclude) {
      prompt += `\n- Foods to Exclude: ${foodsToExclude}`;
    }

    prompt += `\n\nFormat the response as clear, readable text. Start directly with the meal plan, without any conversational intro.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ mealPlan: text });

  } catch (error) {
    console.error('Error generating meal plan:', error);
    return NextResponse.json({ error: 'Failed to generate meal plan.' }, { status: 500 });
  }
}
