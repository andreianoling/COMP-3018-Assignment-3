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
