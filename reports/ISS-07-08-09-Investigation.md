# ISS-07/08/09 Investigation

**Assigned To:** Hamid Shoukat  
**Date:** 24 August 2026  
**Page:** https://hisabdo.app/careers.html  
**Google Form:** https://forms.gle/YhAfaw1CzCF9mEZo9

---

### 1. Careers page tested
- Careers page loads correctly.
- All sections (Hero, Why Work With Us, How to Apply, Internships, Mock Interview) are visible.
- No major layout breakage found on desktop.

### 2. Application links tested
- “Register for Internship” button → Opens Google Form
- “Register Now” button (banner) → Opens Google Form
- “Apply Now” button → Opens Google Form
- “Register Now” button (Internships section) → Opens Google Form
- All buttons correctly point to the same Google Form link.

### 3. External Google Form tested
- Form opens successfully.
- All fields are loading.
- Form can be filled and submitted.
- Confirmation message appears after submission.

### 4. Desktop behavior tested
- Buttons are properly aligned.
- Links open in a new tab (`target="_blank"`).
- No overlapping or broken elements found.
- Page is fully usable on desktop screens.

### 5. Mobile behavior tested
- Page is responsive on mobile (tested around 390px–430px width).
- Buttons are clickable and properly sized.
- Google Form also works well on mobile browsers.
- No major overflow or layout issues found related to the form buttons.

### 6. Broken-link status
- No broken application links found during testing.
- All Careers/Internship application buttons are working.
- Google Form link is active and reachable.

### 7. Form availability status
- Form is currently available and accepting responses.
- Suitable for the ongoing 60-Day Remote Internship Bootcamp (August – September 2026).

### 8. Validation observations
- Google Form has its own built-in validation.
- Required fields are enforced by Google Forms.
- No custom client-side validation is present on the HisabDo website (because the form is external).

### 9. External vs in-house comparison

| Feature                      | External Google Form      | In-house Form                  |
|-----------------------------|---------------------------|--------------------------------|
| Setup Time                  | Already done              | Requires development           |
| Backend Needed              | No                        | Yes / or third-party service   |
| Custom Design               | Limited                   | Full control                   |
| User stays on website       | No                        | Yes                            |
| Easy to manage responses    | Yes (Google Sheets)       | Needs extra setup              |
| Professional Look           | Average                   | Better                         |
| Recommended for now         | Yes                       | No (not necessary yet)         |

### 10. Recommendation

**Keep the external Google Form for now.**

**Reasons:**
- The internship program is temporary.
- Google Form is already working and collecting applications.
- Creating an in-house form will take extra time and is not required at this stage.
- Team should focus on higher priority tasks (UI fixes, performance, responsive issues).

**Future Suggestion:**
Later (in future phases), a custom form can be created using HTML + JavaScript validation or services like Formspree/Web3Forms for better branding and user experience.

---

**Status:** Completed  
**Prepared by:** Hamid Shoukat
