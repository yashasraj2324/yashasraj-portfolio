# Chatbot Setup Guide

This chatbot uses Google's Gemini AI directly in the frontend with your personal information.

## Setup Instructions

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key

### 2. Get Supabase Credentials

1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and anon public key

### 3. Environment Variables

1. Copy `.env.example` to `.env.local`
2. Add your API keys:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install
npm install @google/generative-ai @supabase/supabase-js
```

### 4. Run the Application

```bash
npm run dev
```

## LLM Fallback Chain

The chatbot tries these models in order:

1. **GPT-4o Mini** (OpenAI) - Fast and efficient
2. **Claude 3.5 Haiku** (Anthropic) - Good reasoning
3. **Llama 3.1 8B** (Meta) - Open source alternative
4. **Gemini Flash 1.5** (Google) - Fast Google model
5. **Qwen 2.5 7B** (Alibaba) - Multilingual support

If all models fail, it falls back to static responses.

## Features

- ✅ 5 LLM fallback chain
- ✅ Conversation memory
- ✅ Error handling
- ✅ Typing indicators
- ✅ Session management
- ✅ Responsive design
- ✅ Accessibility support

## Cost Optimization

OpenRouter provides competitive pricing:

- GPT-4o Mini: ~$0.15/1M tokens
- Claude 3.5 Haiku: ~$0.25/1M tokens
- Llama 3.1 8B: ~$0.07/1M tokens
- Gemini Flash: ~$0.075/1M tokens
- Qwen 2.5 7B: ~$0.07/1M tokens

The fallback system ensures you get responses even if primary models are unavailable.

## Customization

### Adding More Models

Edit `src/app/api/chat/route.js` and add to `LLM_CONFIGS`:

```javascript
{
  name: 'Your Model Name',
  model: 'provider/model-name',
  provider: 'openrouter',
  temperature: 0.7,
}
```

### Modifying Responses

Edit the prompt template in `src/app/api/chat/route.js` to customize Eleva's personality and knowledge.

### Styling

Modify `src/components/ChatPopup/ChatPopup.js` for UI changes.

## Supabase Database Setup

### Create the contacts table

Run this SQL in your Supabase SQL editor:

```sql
-- Create contacts table with additional fields
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for contact form)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads for authenticated users only (optional)
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');
```

If you already have the table, add the new columns:

```sql
-- Add new columns to existing table
ALTER TABLE contacts 
ADD COLUMN phone TEXT,
ADD COLUMN company TEXT;
```

### Features Added

- ✅ Contact form with Supabase integration
- ✅ Form validation and error handling
- ✅ Success/error notifications
- ✅ Responsive design
- ✅ Accessibility support

## Usage

### Contact Form Component

```javascript
import ContactForm from '@/components/ContactForm/ContactForm';

// Use in your component
<ContactForm onClose={() => setShowForm(false)} />
```

### Supabase Service

```javascript
import { contactService } from '@/lib/supabase';

// Submit contact form
const result = await contactService.submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Project Inquiry',
  message: 'Hello, I would like to discuss...'
});
```