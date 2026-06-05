# Database Entity Relationship Diagram (ERD)

This document visualizes and describes the relations, primary/foreign keys, and data-types within the Zabnix PostgreSQL database using Prisma ORM.

---

## 1. Entity Relationship Diagram (Mermaid)

The diagram below maps table structures, primary keys (`PK`), foreign keys (`FK`), and fields:

```mermaid
erDiagram
    users {
        uuid id PK
        varchar name
        varchar email UNIQUE
        text password_hash
        uuid role_id FK
        text avatar_url
        boolean is_active
        timestamp created_at
    }

    roles {
        uuid id PK
        varchar name
        text description
        jsonb permissions
        timestamp created_at
    }

    posts {
        uuid id PK
        varchar slug UNIQUE
        varchar title
        text excerpt
        jsonb content
        text cover_image
        uuid author_id FK
        boolean published
        timestamp published_at
        varchar seo_title
        varchar seo_description
        timestamp created_at
    }

    categories {
        uuid id PK
        varchar name
        varchar slug UNIQUE
        timestamp created_at
    }

    post_categories {
        uuid post_id PK, FK
        uuid category_id PK, FK
    }

    products {
        uuid id PK
        varchar slug UNIQUE
        varchar name
        text short_description
        text full_description
        text hero_image
        text logo
        boolean is_featured
        boolean published
        varchar seo_title
        varchar seo_description
        timestamp created_at
    }

    product_features {
        uuid id PK
        uuid product_id FK
        varchar title
        text description
        varchar icon
        integer sort_order
    }

    product_screenshots {
        uuid id PK
        uuid product_id FK
        text image_url
        text caption
        integer sort_order
    }

    jobs {
        uuid id PK
        varchar slug UNIQUE
        varchar title
        varchar department
        varchar location
        varchar employment_type
        varchar experience_required
        text description
        text requirements
        text benefits
        boolean is_active
        timestamp created_at
    }

    applications {
        uuid id PK
        uuid job_id FK
        varchar name
        varchar email
        varchar phone
        text resume_url
        text cover_letter
        varchar status
        timestamp created_at
    }

    contacts {
        uuid id PK
        varchar name
        varchar email
        varchar phone
        varchar company
        varchar service_interest
        text message
        varchar status
        varchar source
        timestamp created_at
    }

    roles ||--o{ users : "has many"
    users ||--o{ posts : "writes"
    posts ||--o{ post_categories : "belongs to"
    categories ||--o{ post_categories : "categorizes"
    products ||--o{ product_features : "contains"
    products ||--o{ product_screenshots : "illustrates"
    jobs ||--o{ applications : "receives"
```

---

## 2. Key Relationship Specifications

### User & Auth Architecture
* **Roles to Users (`1:N`)**: A user has exactly one security role (e.g. `Super Admin`, `Content Editor`, `HR Manager`). Foreign key is `users.role_id` mapping to `roles.id`.
* **Users to Posts (`1:N`)**: An author writes many posts. Foreign key is `posts.author_id` mapping to `users.id`.

### Product Catalog System
* **Products to Features (`1:N`)**: A product can have multiple highlighted features listed. Foreign key is `product_features.product_id` mapping to `products.id` with `onDelete: Cascade`.
* **Products to Screenshots (`1:N`)**: A product contains screenshots/visuals. Foreign key is `product_screenshots.product_id` mapping to `products.id` with `onDelete: Cascade`.

### Recruitment Pipeline
* **Jobs to Applications (`1:N`)**: Job postings can receive multiple candidate applications. Foreign key is `applications.job_id` mapping to `jobs.id` with `onDelete: Restrict`.

### Blog Categories
* **Posts to Categories (`M:N`)**: A post can sit in multiple categories, and a category contains multiple posts. Handled by join table `post_categories` with composite key `(post_id, category_id)`.

---

## 3. Database Indexes

To optimize page rendering speeds and query performance, the following indexes are applied:
* **Unique Indexes**:
  * `users(email)`
  * `posts(slug)`
  * `categories(slug)`
  * `products(slug)`
  * `jobs(slug)`
* **Foreign Key Indexes**:
  * `users(role_id)`
  * `posts(author_id)`
  * `product_features(product_id)`
  * `product_screenshots(product_id)`
  * `applications(job_id)`
  * `post_categories(post_id, category_id)`
