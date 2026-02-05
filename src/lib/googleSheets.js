// Google Sheets contact form service
export class ContactService {
    constructor() {
        this.scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    }

    async submitContact(formData) {
        try {
            if (!this.scriptUrl) {
                return { 
                    success: false, 
                    error: 'Contact form is not configured. Please email me directly at yashasraj245@gmail.com'
                };
            }

            // Prepare data with timestamp as per your snippet
            const dataToSend = {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                phone: formData.phone || '',
                company: formData.company || '',
                timestamp: new Date().toISOString()
            };

            const response = await fetch(this.scriptUrl, {
                method: "POST",
                mode: "no-cors", // Important for Google Scripts
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });

            // With no-cors mode, we can't check response status
            // So we assume success if no error is thrown
            console.log("✅ Data sent successfully! (Check your Google Sheet)");
            return { 
                success: true, 
                message: 'Thank you for your message! I\'ll get back to you within 24 hours. 🚀' 
            };

        } catch (error) {
            console.error("❌ Error:", error);
            return { 
                success: false, 
                error: 'Unable to send message right now. Please email me directly at yashasraj245@gmail.com'
            };
        }
    }

    // Optional: Method to get contacts (if you implement it in Apps Script)
    async getContacts() {
        try {
            if (!this.scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            const response = await fetch(`${this.scriptUrl}?action=getContacts`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return { success: true, data: result.data };

        } catch (error) {
            console.error('Error fetching contacts:', error);
            return { success: false, error: error.message };
        }
    }
}

export const contactService = new ContactService();