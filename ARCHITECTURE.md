# CI/CD Pipeline Architecture Document

## Application Tier Structure
- **Frontend Tier:** HTML5, CSS3, and JavaScript (`index.html`, `style.css`, `index.js`) served statically.
- **Application Logic/Runtime:** Node.js environment configured via Docker container.
- **Database Tier:** Mock/Cloud database integration (such as Firebase Cloud Firestore) connected securely via environment variables and GitHub Secrets.

## Pipeline Stages & Gates
1. **Build Stage:** Compiles code and prepares artifacts.
2. **Test Stage:** Executes automated scripts and validation checks.
3. **Security Scanning (SAST & Container Scan):** Detects vulnerabilities using security tools.
4. **Deployment Gates:** Automatic deployment for Development, test validation for Staging, and **Manual Approval** for Production.