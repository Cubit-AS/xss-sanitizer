# Sanitize emails

When cubit receives email we need to sanitize it to remove any malicious javascript to avoid cross site scripting


```sh
fnm use
npm install
node index.js
```

```sh
# Test sanitization
curl -d "data=<img src=x onerror=alert(1)//>" -X POST http://localhost:3000/sanitize
```
