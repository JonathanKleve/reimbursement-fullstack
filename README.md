# Reimbursement-app
A full stack web application utilizing a Java with Spring Boot backend and a Typescript with Angular frontend to allow users to submit tickets for business expenses which managers can then approve or deny.

### Technical Notes
* **UI Synchronization:** Encountered an issue where the table wouldn't update after API calls despite the data being present in the console. 
* **Fix:** Implemented `ChangeDetectorRef.detectChanges()` in the subscription callback to force a view refresh.
