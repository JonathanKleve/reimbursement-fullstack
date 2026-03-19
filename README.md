## Reimbursement System Key Features:

### 1. Robust Type Safety (Full-Stack Enums)
To prevent data corruption and "magic string" errors, I implemented a unified **Status Enum** (`PENDING`, `APPROVED`, `DENIED`) across the entire stack.
* **Backend:** Java Enums with JPA `@Enumerated(EnumType.STRING)` ensure human-readable database records and strict data integrity.
* **Frontend:** TypeScript String Literal Unions provide compile-time intellisense and prevent UI typos during development.

### 2. Secure Receipt Attachment Handling
Instead of complex multi-part form data, I utilized a **Base64 Encoding** strategy to simplify the data flow and storage.
* **Asynchronous Processing:** Leverages the JavaScript `FileReader` API to convert binary files to data strings without blocking the main UI thread.
* **Security & Sanitization:** Implemented Angular's `DomSanitizer` to prevent XSS (Cross-Site Scripting) when rendering uploaded PDFs and images.
* **Validation:** Robust client-side checks for file size (2MB limit) and MIME type filtering (`image/*`, `application/pdf`).

### 3. Role-Based Access Control (RBAC)
The UI dynamically adapts based on the authenticated user's permissions:
* **Employees:** Can submit new requests and view a filtered list of their own past claims.
* **Managers:** Gain exclusive access to "Approve" and "Deny" actions, as well as a dedicated "View Receipt" modal for expense verification.

---

### Tech Stack
* **Frontend:** Angular 17+ (Standalone Components, Event Binding)
* **Backend:** Java 17, Spring Boot 3, Spring Data JPA
* **Database:** MySQL / H2 (Storing Base64 strings as `LONGTEXT`)

---

### Future Improvements
* **Cloud Storage Migration:** Moving from Base64 database storage to **AWS S3** or **Google Cloud Storage** for improved scalability.
* **Analytics Dashboard:** Adding charts (using Chart.js) to visualize spending trends by department or user.
* **Email Notifications:** Integrating Spring Mail to notify employees automatically when a manager updates their request status.

### Technical Notes
* **UI Synchronization:** Encountered an issue where the table wouldn't update after API calls despite the data being present in the console. 
* **Fix:** Implemented `ChangeDetectorRef.detectChanges()` in the subscription callback to force a view refresh.

## Getting Started

### Prerequisites
* **Java Development Kit (JDK) 17** or higher
* **Node.js** (v18.x or v20.x recommended) and **npm**
* **Angular CLI** (`npm install -g @angular/cli`)
* **Maven** (for backend dependency management)

### Backend Setup (Spring Boot)
1. Navigate to the `/backend` directory.
2. Configure your database settings in `src/main/resources/application.properties` (defaults to H2 in-memory database).
3. Build the project using Maven:
   ```bash
   mvn clean install
4. Run the application:
```bash
   mvn spring-boot:run
```
The API will be available at http://localhost:8080.

### Frontend Setup (Angular)
1. Navigate to the /frontend directory.
2. Install the required dependencies:
```bash
npm install
3. Start the development server:
```bash
ng serve
4. Open your browser and navigate to http://localhost:4200.

### Default Credentials (Test Environment)
* Manager Access: Username: admin / Password: password
* Employee Access: Username: user1 / Password: password
