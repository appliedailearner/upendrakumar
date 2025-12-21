# Upendra Kumar - Personal Brand & Consulting Portal
**Live Site:** [https://upendrakumar.com](https://upendrakumar.com)

This repository hosts the source code for my personal brand website and technical blog. The site is designed to position me as a Subject Matter Expert (SME) in Azure Solutions Architecture and Enterprise Architecture, while serving as a hub for my training and consulting services.

## 📂 Project Structure

This project follows a "Monorepo" style where the main business site and the technical blog live together. This improves SEO by keeping all content under one domain.

```text
/
├── index.html          # Homepage: "The Hook" (Who I am, High-level Pitch)
├── about.html          # Bio & Leadership: Experience, MCT, TOGAF, Philosophy
├── services.html       # Monetization: Training, Consulting, & Mentorship packages
├── contact.html        # Lead Gen: Forms for recruiters & consulting inquiries
├── /blog               # The Knowledge Hub (Subdirectory for SEO)
│   ├── index.html      # Blog Archive/List of all posts
│   ├── post-1.md       # Individual Article (e.g., Azure Migration Guide)
│   └── post-2.md       # Individual Article (e.g., Private Link Comic)
├── /assets             # Static files
│   ├── /css            # Stylesheets
│   ├── /images         # Headshots, Diagrams, Comics
│   └── /pdf            # Downloadable Resume/CV
└── README.md           # This documentation file
