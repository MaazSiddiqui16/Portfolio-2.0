module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    response.status(500).json({ success: false, message: 'Form service is not configured.' });
    return;
  }

  try {
    const formData = typeof request.body === 'string'
      ? JSON.parse(request.body)
      : request.body || {};
    const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, access_key: accessKey }),
    });

    const result = await web3FormsResponse.json();
    response.status(web3FormsResponse.status).json(result);
  } catch (error) {
    console.error('Contact form error:', error.message);
    response.status(500).json({ success: false, message: 'Unable to send the message.' });
  }
};
