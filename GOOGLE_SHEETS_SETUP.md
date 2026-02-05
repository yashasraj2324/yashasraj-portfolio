# Google Sheets Contact Form Setup

This guide will help you set up Google Sheets as a backend for your contact form submissions.

## Step 1: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script.js`
4. Save the project (give it a name like "Portfolio Contact Handler")

## Step 2: Deploy as Web App

1. In Apps Script, click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone" (this allows your website to send data)
5. Click "Deploy"
6. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/[SCRIPT_ID]/exec`)

## Step 3: Update Environment Variables

1. Open your `.env` file
2. Replace `your_google_apps_script_url_here` with the Web App URL you copied
3. Save the file

## Step 4: Test the Integration

The Google Apps Script will automatically:
- Create a Google Sheet named "Portfolio Contact Forms" 
- Add proper headers to the sheet
- Store all contact form submissions with timestamps

## Usage in Your Code

```javascript
import { contactService } from './lib/googleSheets.js';

// Submit a contact form
const result = await contactService.submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello',
  message: 'Test message',
  phone: '123-456-7890',
  company: 'Acme Corp'
});

if (result.success) {
  console.log('Form submitted successfully!');
} else {
  console.error('Error:', result.error);
}
```

## Security Notes

- The Web App URL is public but only accepts POST requests with specific data structure
- All submissions are logged with timestamps
- You can view all submissions in the Google Sheet
- Consider adding additional validation in the Apps Script if needed

## Troubleshooting

- If you get CORS errors, make sure the Web App is deployed with "Anyone" access
- Check the Apps Script execution logs for any errors
- Verify the Web App URL is correct in your `.env` file
- Test the Apps Script directly using the `testContactSubmission()` function