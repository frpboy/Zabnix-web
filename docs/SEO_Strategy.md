# SEO Strategy

This document outlines the Search Engine Optimization (SEO) strategy for the Zabnix corporate website. It details the target keyword clusters, meta tag templates, structured data schemas, and technical crawler configurations.

---

## 1. Keyword Strategy

### Primary Keyword Clusters
* **Enterprise Software Development**:
  * `enterprise software development company`
  * `custom software development services`
  * `custom software developer India`
* **Mobile Applications**:
  * `flutter mobile app development`
  * `cross-platform app developers`
  * `enterprise mobile app engineering`
* **ERP Solutions**:
  * `custom erp development company`
  * `cloud erp solutions`
  * `ai-powered erp system`
* **AI & Automation**:
  * `business automation solutions`
  * `ai workflow automation services`
  * `llm integration company`

### Target Geography & Audiences
* **Primary Markets**: India (Hyderabad, Bangalore, Mumbai, Kochi), UAE (Dubai), Saudi Arabia (Riyadh), and Singapore.
* **Target Audience**: Chief Technology Officers (CTOs), VPs of Engineering, Chief Operations Officers (COOs), and Enterprise Product Owners looking to build or modernize platforms.

---

## 2. Meta Tags & Social Previews

### Global Meta Template
* **Meta Title Default**: `Zabnix — Build Faster. Automate Smarter.`
* **Meta Title Template**: `%s | Zabnix`
* **Global Meta Description**: `Zabnix is a premium product engineering firm specializing in software development, AI automation, ERP systems, and mobile applications for healthcare, retail, and manufacturing enterprises.`
* **Keywords**: `software development, AI automation, ERP systems, mobile apps, business automation, Zabnix`

### Core Page Meta Configuration

| Route | Page Title (`title`) | Meta Description (`description`) |
|---|---|---|
| `/` | `Zabnix — Build Faster. Automate Smarter.` | `Premium product engineering for enterprises. Software development, AI automation, custom ERP systems, and Flutter mobile apps.` |
| `/products` | `Products | Zabnix` | `Explore our purpose-built enterprise platforms, including ZerpAI ERP and custom healthcare suites built to scale.` |
| `/services` | `Services | Zabnix` | `Full-stack custom software engineering, mobile development, ERP integration, and AI-powered workflow automation services.` |
| `/company` | `Company | Zabnix` | `Meet the engineers, designers, and consultants building Zabnix. Learn about our mission, vision, values, and client results.` |
| `/careers` | `Careers | Zabnix` | `Join the team building the future of enterprise software. Explore open developer, designer, and PM roles.` |
| `/blog` | `Blog | Zabnix` | `Read our latest articles on software engineering, Next.js optimization, Flutter development, and AI implementation.` |
| `/contact` | `Contact | Zabnix` | `Get in touch with our product engineering team to discuss your next custom software, ERP, or automation project.` |

### Social Preview (Open Graph & Twitter)
* **Image URL**: `https://zabnix.com/og-image.jpg`
* **OG Type**: `website`
* **OG Locale**: `en_US`
* **Twitter Card**: `summary_large_image`
* **Twitter Title**: Same as page meta title.
* **Twitter Description**: Same as page meta description.

---

## 3. Schema Markup (JSON-LD)

To help crawlers understand our company structure, the root layout serves a `Corporation` schema.

```json
{
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "Zabnix Private Limited",
  "alternateName": "Zabnix",
  "url": "https://zabnix.com",
  "logo": "https://zabnix.com/zabnix-logo.png",
  "sameAs": [
    "https://linkedin.com/company/zabnix",
    "https://github.com/zabnix",
    "https://x.com/zabnix",
    "https://instagram.com/zabnix"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "sales",
    "email": "sales@zabnix.com",
    "areaServed": ["IN", "AE", "SA", "SG"],
    "availableLanguage": "en"
  }
}
```

---

## 4. Technical SEO Configurations

### Crawler Instructions (`src/app/robots.ts`)
* **Default**: index, follow.
* **Exclude**: `/admin`, `/api/*`, `/temp/*`, and draft blog routes.
* **Code Implementation**:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://zabnix.com/sitemap.xml',
  };
}
```

### Dynamic XML Sitemap (`src/app/sitemap.ts`)
Generates index entries dynamically for static routes, product details, blog pages, and career posts.
* **Code Implementation**:
```typescript
import { MetadataRoute } from 'next';
import { products, blogPosts, careers } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://zabnix.com';

  // Base routes
  const routes = ['', '/products', '/services', '/company', '/careers', '/blog', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = products.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic career routes
  const careerRoutes = careers.map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...routes, ...productRoutes, ...blogRoutes, ...careerRoutes];
}
```
