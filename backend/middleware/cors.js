const allowedCors = [
  'https://practicum.tk',
  'http://practicum.tk',
  'localhost:3000',
];

function (req, res, next) {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    // setting a header that allows the browser to make requests from this source
    res.header('Access-Control-Allow-Origin', '*');
  }

  const { method } = req; // Saving the request type (HTTP method) to the corresponding variable

  // Default value for Access-Control-Allow-Methods header (all request types are allowed)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // If this is a preliminary request, add the required headers
  if (method === 'OPTIONS') {
    // allowing cross-domain requests of any type (default)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  // saving the list of headers of the original request
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // allowing cross-domain requests with these headers
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // finish processing the request and return the result to the client
    return res.end();
  }

  next();
};
