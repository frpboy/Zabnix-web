# API Contract Specification

This document details the REST API specifications for backend endpoints. All client forms and dashboard integrations must adhere to the request and response structures outlined below.

---

## 1. Global Specifications
* **Base URL**: `/api` (or environment-configured API gateway)
* **Default Headers**:
  * `Content-Type: application/json`
  * `Accept: application/json`
* **Common Error Schema**:
  All error responses (4xx, 5xx) return a standard error wrapper:
  ```json
  {
    "status": "error",
    "code": "VALIDATION_FAILED",
    "message": "One or more request parameters failed validation rules.",
    "errors": [
      {
        "field": "email",
        "message": "Invalid email address domain or syntax."
      }
    ]
  }
  ```

---

## 2. Lead & Inquiries Endpoints

### 1. Contact / General Inquiries
Saves lead submissions from `/contact` page.

* **Path**: `/api/contact`
* **Method**: `POST`
* **Request Payload**:
  ```json
  {
    "name": "Arjun Nair",
    "email": "arjun@example.com",
    "company": "Nair Enterprises",
    "service": "software",
    "message": "Looking to build a next-gen composable SaaS dashboard.",
    "budget": "10k-25k"
  }
  ```
* **Validation Rules**:
  * `name`: string, required, min 3 chars, max 100 chars.
  * `email`: string, required, valid email regex pattern.
  * `service`: enum, required (`software`, `mobile`, `erp`, `ai`, `consulting`, `security`).
  * `budget`: string, optional, budget category.
* **Success Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "Consultation request successfully saved.",
    "data": {
      "leadId": "lead_9876543210_abc"
    }
  }
  ```

### 2. Product Demo Request
Saves demo requests from `/products/[slug]#demo` sidebars.

* **Path**: `/api/demo`
* **Method**: `POST`
* **Request Payload**:
  ```json
  {
    "productName": "ZerpAI ERP",
    "name": "Rahul Sharma",
    "company": "Acme Corp",
    "jobTitle": "Chief of Operations",
    "email": "rahul@acme.com",
    "phone": "+919876543210",
    "notes": "Interested in demand forecasting capabilities."
  }
  ```
* **Validation Rules**:
  * `productName`: string, required, matches valid product list.
  * `name`: string, required.
  * `email`: string, required, valid work email.
  * `phone`: string, required, phone format (ITU-T E.164 suggested).
* **Success Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "Demo request recorded successfully.",
    "data": {
      "demoId": "demo_1234567890_xyz"
    }
  }
  ```

---

## 3. Careers & Applications

### 1. Job Application Submission
Saves candidate details and parses PDF resume uploads.

* **Path**: `/api/job-application`
* **Method**: `POST`
* **Request Payload** (Multipart Form Data):
  * `roleSlug`: string, required (e.g. `senior-fullstack-engineer`)
  * `name`: string, required
  * `email`: string, required
  * `phone`: string, required
  * `github`: string, optional (valid URL)
  * `linkedin`: string, optional (valid URL)
  * `notes`: string, optional
  * `resume`: file, required (binary PDF/DOCX, max size 10MB)
* **Success Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "Application submitted successfully.",
    "data": {
      "applicationId": "app_55667788_pdf"
    }
  }
  ```

---

## 4. Query & Content Feeds

### 1. Get Products Feed
Retrieves products dynamically.

* **Path**: `/api/products`
* **Method**: `GET`
* **Query Parameters**:
  * `category`: string, optional (e.g. `erp`, `healthcare`)
* **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "results": 2,
    "data": [
      {
        "slug": "zerpai",
        "name": "ZerpAI ERP",
        "tag": "ERP Platform",
        "tagline": "The intelligent ERP built for modern operations.",
        "description": "ZerpAI combines enterprise resource planning with AI..."
      }
    ]
  }
  ```

### 2. Get Blog Posts Feed
Retrieves posts dynamically with pagination tags.

* **Path**: `/api/blog`
* **Method**: `GET`
* **Query Parameters**:
  * `page`: integer, default `1`
  * `limit`: integer, default `10`
  * `tag`: string, optional (e.g. `flutter`, `nextjs`)
* **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPosts": 24,
      "totalPages": 3
    },
    "data": [
      {
        "slug": "why-flutter-for-enterprise-mobile",
        "title": "Why Flutter is the Right Choice for Enterprise Mobile Apps",
        "publishedAt": "2026-05-15T00:00:00Z"
      }
    ]
  }
  ```
