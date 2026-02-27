import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Civil Doctor Inquiry <onboarding@resend.dev>',
            to: ['civildoctorslm@gmail.com'],
            subject: `New Inquiry from ${name}`,
            reply_to: email,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #c41e3a; border-bottom: 2px solid #c41e3a; padding-bottom: 10px;">New Contact Form Submission</h2>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <p><strong>Full Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background: white; padding: 10px; border-left: 4px solid #c41e3a; margin-top: 10px;">
                            ${message.replace(/\n/g, '<br/>')}
                        </div>
                    </div>
                </div>
            `,
        });

        if (error) {
            return res.status(400).json(error);
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
