module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle GET request (browser visit)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Retell webhook is live!',
      status: 'active',
      timestamp: new Date().toISOString()
    });
  }
  
  // Handle POST request (actual webhook calls)
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      
      // Your Retell AI webhook logic here
      console.log('Webhook received:', body);
      
      // Process the webhook data and return response
      return res.status(200).json({
        status: 'success',
        message: 'Webhook processed successfully',
        data: body
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
};
