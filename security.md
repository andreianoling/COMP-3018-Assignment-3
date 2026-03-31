## Helmet.js Configuration

### Configurations applied

contentSecurityPolicy:true
hidePoweredBy:true
referrerPolicy: {policy: "no-referrer"}

### Justification

1. contentSecurityPolicy:true - Enabling CSP is not required as this project does not serve HTML content but it is good practice to enable this as it is the primary defence for cross-site scripting attacks.

3. hidePoweredBy:true - This config prevents attackers from knowing your framework and version. If attackers know these then they can research vulnerabilties.

2. referrerPolicy: {policy: "no-referrer"} - This config stops the browser from sending the entirety of a header when a user navigates from our app to an external link. This prevents data from being intercepted.

### Sources
1. https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy
2. https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Referer_header:_privacy_and_security_concerns
3. https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/08-Fingerprint_Web_Application_Framework



## Cors Configuration

### Configurations applied

origin: true (development) / process.env.ALLOWED_ORIGINS?.split(",") || [] (production)
credentials: true
methods: ["GET", "POST", "PUT", "DELETE"] (production only)
allowedHeaders: ["Content-Type", "Authorization"] (production only)

### Justification

1. origin: true (development) - This config reflects any request origin back as allowed so there is no issues when using our testing tool Postman.

2. origin: ALLOWED_ORIGINS (production) - This config restricts cross-origin requests to an explicit whitelist. Without this, any malicious website could make authenticated requests to your API on behalf of a logged-in user.

3. credentials: true - Required when the API accepts session cookies or Authorization headers from cross-origin requests.

4. methods: ["GET", "POST", "PUT", "DELETE"] (production only) - Limits the HTTP verbs browsers are permitted to use cross-origin. Methods like TRACE can be leveraged for Cross-Site Tracing (XST) attacks. 

5. allowedHeaders: ["Content-Type", "Authorization"] (production only) - Whitelisting request headers prevents users from sending unexpected headers that could confuse middleware or exploit header-parsing vulnerabilities.

### Sources
1. https://owasp.org/www-community/attacks/CORS_OriginHeaderScrutiny
2. https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#requests_with_credentials
3. https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#http-methods
4. https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
