# Content Management System (CMS) Guide

This guide is designed for content editors, marketing staff, and HR personnel to manage content on the Zabnix corporate website. Follow these procedures to maintain formatting consistency and SEO value.

---

## 1. Managing Blog Posts

### Creating a New Post
1. Log in to the Zabnix Admin Portal (`/admin` or your headless dashboard).
2. Click **Create Post** under the Blog tab.
3. Fill in the core content fields:
   * **Title**: Catchy headline, sentence-cased. Limit to 60 characters for search listings.
   * **Slug**: Auto-generated from title, hyphen-separated (e.g. `optimizing-nextjs-fonts`). Keep lowercase.
   * **Excerpt**: A concise summary (140-160 characters) shown in listings and search snippets.
   * **Cover Image**: Upload a 16:9 banner (recommended size: `1200x675px`, optimized WebP format).
   * **Content Blocks**: Use the block editor to structure content with headings, code blocks, lists, and images.

### Editorial Guidelines
* **Display Hierarchy**:
  * Use exactly one `<h1>` (the post title, handled by layout).
  * Group content sections using `<h2>` and `<h3>` tags.
* **Code Formatting**: Wrap all commands, file names, or functions with backticks (e.g. `npm run dev`) or standard code blocks with language tagging.
* **SEO Metadata**: Customize the SEO Title and SEO Description in the metadata module to ensure it reads nicely in Google results.

---

## 2. Managing Products
Products populate `/products` and `/products/[slug]` paths.

### Adding a Product
1. Navigate to the **Products** section of the dashboard and click **Add Product**.
2. Define the product header info:
   * **Tag**: Short category name (e.g. `ERP Platform`, `Healthcare Suite`).
   * **Name**: The product brand name (e.g. `ZerpAI ERP`).
   * **Tagline**: Single-sentence value proposition (e.g. `The intelligent ERP built for modern operations.`).
   * **Description**: Detailed multi-paragraph overview explaining product use cases.
3. Add **Key Capabilities** (List items):
   * Each capability needs a **Title** (e.g. `AI-powered demand forecasting`) and a **Description** detailing how it works.
4. Add **Technical Specifications** (Key-Value pairs):
   * E.g., `Deployment: Cloud-native (Vercel + AWS)`, `Authentication: OAuth2 + MFA`, `Compliance: HIPAA Compliant`.

---

## 3. Managing Services
Services populate the `/services` page and `/services#anchor` links.

### Adding or Updating a Service
1. Navigate to the **Services** section of the dashboard.
2. Configure the following fields:
   * **Title**: Core service name (e.g. `Software Development`).
   * **Description**: Explanation of what this service solves for enterprises.
   * **Icon**: Choose a valid icon symbol (mapped to Lucide library).
   * **Deliverables List**: Add items representing what the client receives (e.g. `Custom web applications`, `API design & microservices`).
3. Set the **Anchor ID** (lowercase, e.g. `software`) so that navigation links land on this specific card correctly.

---

## 4. Managing Careers & Jobs
HR personnel use this module to open/close roles on the `/careers` page.

### Posting a Job Opening
1. Navigate to the **Careers** tab and click **New Position**.
2. Fill in job listing metadata:
   * **Title**: Clear role designation (e.g. `Senior Fullstack Engineer`).
   * **Department**: `Engineering`, `Product`, `Design`, etc.
   * **Location**: `Hyderabad, India` or `Remote (Asia-Pacific)`.
   * **Employment Type**: `Full-time`, `Contractor`, `Part-time`.
   * **Experience**: `5+ Years`, `Lead`, `Mid-level`.
3. Provide rich details:
   * **Role Description**: What the candidate will build and achieve.
   * **Requirements**: Must-have technologies or credentials (bulleted list).
   * **Benefits**: Health benefits, work flexibility, compensation details.
4. Set status toggle to **Active** to publish on the careers page. Toggle to **Inactive** to close the role and stop submissions.

---

## 5. Image Assets Checklist
To prevent layout shifts and slow load times, all uploads must follow this checklist:
* **Format**: `.webp` or `.png` with transparent background where appropriate.
* **Metadata**: Always define an `alt` text attribute explaining what is in the image (accessibility).
* **Dimensions**:
  * Blog Banners: `1200x675px` (16:9)
  * Screenshots / Mockups: `1600x1000px` (16:10)
  * Avatars: `256x256px` (1:1)
