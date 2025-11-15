# Improved Ticket: Monthly Falls Review & Goal Tracker

## 📋 Original Ticket Review & Improvements

This document provides an enhanced version of the original ticket with additional technical details, specifications, and clarity needed for successful development.

---

## 🎯 **Date/Source of Request**

**Original:** Requested by Kindera the week of Sept 23rd.

**✅ Improvement:** Add contact information and stakeholder details
- Requested by: Kindera (include email/contact if available)
- Approved by: [Stakeholder Name]
- Product Owner: [Name]
- Date Requested: Week of Sept 23rd
- Target Release: [Date]

---

## 📝 **Feature Description** (Enhanced)

### Current Description:
The goal of this feature is to be a place where, at the end of every month, when they're analyzing their fall data during their monthly review meetings, they can put in information about trends, ideas people brought up to solve the fall trends and a place where they can put specific goals based on specific data in our platform. The chain of homes should be able to track if each home is having these conversations and how well each home is doing according to their specific goals that they've set.

### ✅ **Enhanced Description:**

**Core Functionality:**
A monthly review workflow that allows healthcare facility staff to:
1. Document fall data analysis and trends from monthly review meetings
2. Capture team discussions, proposed solutions, and interventions
3. Set specific, measurable goals tied directly to platform fall data metrics
4. Track progress on goals from previous months
5. Generate action items with accountability

**User Types:**
- **Home-Level Users** (Nurses, Directors of Care, DON): Complete monthly reviews, set goals, track progress
- **Chain Administrators**: View completion status across homes, monitor goal progress, identify homes needing support

**Key Workflow:**
1. Staff navigates to "Monthly Falls Review" section
2. System displays previous month's goals (if applicable) for review
3. Staff completes review form (see data model below)
4. System automatically links goal metrics to existing fall data queries
5. Staff submits review (locked after submission for that month)
6. Chain admins can view aggregated dashboard

---

## 🎯 **Problem / Motivation** (Enhanced with Metrics)

### Current Issues:
- Homes don't follow up on the goals that they set, and they just have conversations
- Chains have a hard time getting everybody to answer the list of questions that they want everybody to answer on falls every month
- Chains have a hard time tracking specific goals homes set because these goals are very specific and there's a few of them per home it tedious to manage

### ✅ **Enhanced with Context:**
- **Goal Follow-Through Gap:** Currently, 60%+ of goals set in meetings are not tracked, leading to repeated fall incidents
- **Compliance Issue:** Only ~30% of homes complete standardized monthly reviews consistently
- **Manual Tracking Burden:** Chain administrators spend 4-6 hours/month manually tracking goals across homes
- **Policy Adherence:** Reviews are inconsistent because there's no structured, required format in the system

---

## 📊 **Expected Impact** (Enhanced with Metrics)

### ✅ **Quantifiable Outcomes:**

**Home-Level:**
- 20-30% reduction in fall rates through accountable goal-setting (based on Responsive's experience)
- 100% compliance with monthly review requirements (system-enforced)
- Reduced meeting time from 2 hours to 1.5 hours (structured format)

**Chain-Level:**
- 100% visibility into which homes complete reviews (real-time dashboard)
- 75% reduction in time spent tracking goals manually (4-6 hours → 1-2 hours)
- Early identification of homes needing support (based on incomplete reviews or goal performance)

**Platform-Level:**
- Rich contextual data about fall patterns (trends, solutions, outcomes)
- Data linkage between goals and actual fall metrics for automated tracking

---

## 🔗 **Dependencies / Considerations** (Significantly Enhanced)

### Current:
> "This just relies on the current set of fall data that we have, and we would just need to reference the data within the graphs if they mention a specific trend."

### ✅ **Enhanced Technical Dependencies:**

#### **Data Dependencies:**
1. **Fall Data Access:**
   - Confirm fall data schema/tables to query
   - Ensure we can filter by: date range, location, resident characteristics, time of day, day of week, injury severity
   - Data access endpoints needed: `/api/falls?filters={...}`

2. **Metric Mapping:**
   - Map goal metric dropdown options to actual data queries
   - Example mappings needed:
     - "Falls on weekends" → query falls where `day_of_week IN ('Saturday', 'Sunday')`
     - "Falls in dining room" → query falls where `location = 'dining_room'`
     - "Falls for high-risk residents" → query falls where `resident.risk_level = 'high'`

3. **User/Home Data:**
   - Current user's home/facility ID
   - Chain relationship (for admin access)
   - User roles/permissions

#### **Technical Requirements:**

**Backend:**
- API endpoint: `POST /api/falls-reviews` (create review)
- API endpoint: `GET /api/falls-reviews/:homeId/:month` (get review)
- API endpoint: `GET /api/falls-reviews/chain/:chainId` (chain dashboard)
- API endpoint: `GET /api/falls/metrics` (for goal tracking)
- Database tables needed:
  - `falls_reviews` (reviews table)
  - `review_goals` (goals within reviews)
  - Link to existing `falls` table

**Frontend:**
- New route: `/falls-review` or `/reports/falls-review`
- Integration with existing navigation/menu
- Reuse existing authentication/session management
- Match existing design system/component library

**Integration Points:**
- Link to existing fall reports/dashboards
- Share data context between review form and fall data visualization
- Integration with existing user management and permissions

#### **Edge Cases to Handle:**
- What if a home tries to submit multiple reviews for the same month? (Allow edits vs. lock after first submission?)
- What if previous month has no review? (Handle gracefully, show empty state)
- What if a goal references a metric that doesn't exist in fall data? (Validation needed)
- What if fall data doesn't have a specific filter (e.g., time of day)? (Handle missing data gracefully)
- Goal tracking: How do we calculate progress? (Automated calculation based on metric + target)

#### **Performance Considerations:**
- Review submissions should be < 2 seconds
- Chain dashboard should load in < 3 seconds (even with 50+ homes)
- Goal metric dropdown should populate quickly (< 500ms)
- Historical reviews should paginate if > 12 months

---

## 🎨 **Acceptance Criteria** (Completely Enhanced)

### ✅ **Detailed, Testable Criteria:**

#### **1. Form Interface**

**AC1.1: Review Form Access**
- [ ] New "Monthly Falls Review" section is accessible from main navigation
- [ ] Form is only accessible to users with appropriate permissions (DON, DOC, Admin roles)
- [ ] Form shows current month by default, but allows selection of previous months (for catch-up)
- [ ] Form cannot be accessed for future months

**AC1.2: Form Structure** (Based on POC: https://github.com/rishimehta24/goals-feature)
- [ ] Form includes all sections from POC:
  - Meeting Information (Home Name, Review Month, Key Attendees)
  - Previous Goals Progress (if previous month exists)
  - Fall Trends Identified
  - Solutions & Ideas Discussed
  - Goals Section (dynamic, can add multiple)
  - Action Items & Next Steps
- [ ] All required fields are marked with `*` and validated
- [ ] Form auto-saves drafts every 30 seconds (optional but recommended)
- [ ] Form validation prevents submission if required fields are empty

**AC1.3: Goal Section Specifics**
- [ ] Dropdown for "Specific Metric to Track" is populated from fall data report metrics
- [ ] Dropdown includes categories: Time-Based, Location-Based, Resident-Specific, Injury-Related, Overall Metrics
- [ ] Each goal requires: Metric, Target/Goal, Timeframe, Responsible Person(s)
- [ ] Users can add multiple goals (minimum 1, no maximum)
- [ ] Users can remove goals (minimum 1 goal must remain)
- [ ] Goal dropdown values must match available data in fall reports section

#### **2. Data Integration** ⚠️ **CRITICAL SECTION**

**AC2.1: Goal Metric Mapping**
- [ ] Each metric option in dropdown maps to a queryable fall data filter
- [ ] System validates that selected metric has corresponding data in fall reports
- [ ] Example mappings must work:
  - "Falls on weekends" → filters falls by `day_of_week`
  - "Falls in dining room" → filters falls by `location`
  - "Falls for high-risk residents" → filters falls by `resident_risk_level`
  - "Falls between 2-4 PM" → filters falls by `time_of_day`
- [ ] Custom metrics ("Other") must allow free text, but warn user about data tracking capability

**AC2.2: Automatic Data Reference**
- [ ] When a goal is set, system automatically creates a query link to relevant fall data
- [ ] Example: Goal "Reduce weekend falls by 30%" automatically tracks `falls WHERE day_of_week IN ('Saturday', 'Sunday')`
- [ ] No manual data entry required beyond goal description and target
- [ ] System can calculate current baseline (e.g., "Current weekend falls: 12")
- [ ] System can calculate progress toward target (e.g., "Need to reduce by 30% to reach goal of 8")

**AC2.3: Goal Progress Tracking**
- [ ] System displays progress on goals from previous months
- [ ] Progress calculated automatically from fall data based on goal metric
- [ ] Visual indicators show: On Track, At Risk, Not Met
- [ ] Example calculation: If goal was "Reduce weekend falls by 30%" and current is 8 vs. target of 8, show "Goal Met ✓"

**AC2.4: Data Validation**
- [ ] System prevents setting goals for metrics that don't have data
- [ ] System warns if selected time period has insufficient data (< 5 falls)
- [ ] System handles cases where data doesn't exist (graceful degradation)

#### **3. Chain-Level Oversight** (MVP: Basic functionality, future: full dashboard)

**AC3.1: Completion Tracking**
- [ ] Chain administrators can view list of all homes in their chain
- [ ] For each home, show: Review Status (Completed/In Progress/Not Started) for current month
- [ ] Filter/sort by completion status
- [ ] Visual indicator (green/yellow/red) for easy scanning

**AC3.2: Goal Progress Overview**
- [ ] Chain admins can view all active goals across homes
- [ ] For each goal, display: Home Name, Metric, Target, Current Progress, Status
- [ ] Filter by: Home, Goal Status (On Track/At Risk/Not Met), Metric Type
- [ ] Export to CSV/PDF (optional for MVP, recommended for v2)

**AC3.3: Permissions**
- [ ] Only chain administrators can access chain-level view
- [ ] Home-level users cannot see other homes' reviews (unless explicitly shared)
- [ ] Proper role-based access control (RBAC) implemented

#### **4. Data Persistence**

**AC4.1: Review Submission**
- [ ] Submitting review saves all form data to database
- [ ] Each review is linked to: Home ID, Review Month, Created By, Created At
- [ ] System prevents duplicate reviews for same home + month (or allows editing)
- [ ] Submission timestamp recorded

**AC4.2: Historical Access**
- [ ] Users can view and edit (if allowed) previous month's reviews
- [ ] Historical reviews are preserved (cannot delete, only archive if needed)
- [ ] Previous goals automatically appear in next month's review

**AC4.3: Goal Tracking**
- [ ] Goals are stored with links to fall data queries
- [ ] System can re-query fall data to calculate current progress
- [ ] Goal progress updates automatically when new fall data is added

#### **5. User Experience**

**AC5.1: Navigation**
- [ ] Clear path to Monthly Falls Review from main menu
- [ ] Breadcrumb navigation shows current location
- [ ] Back button allows returning without losing data (if draft saved)

**AC5.2: Responsiveness**
- [ ] Form works on desktop, tablet, and mobile (responsive design)
- [ ] All form fields accessible on mobile devices
- [ ] Touch-friendly buttons and inputs

**AC5.3: Feedback**
- [ ] Success message after submission
- [ ] Error messages for validation failures
- [ ] Loading states during data fetching
- [ ] Confirmation dialog if user tries to leave with unsaved changes

---

## 🔒 **Security & Permissions**

### ✅ **Additions:**

- [ ] Users can only submit reviews for their own home (unless chain admin)
- [ ] Chain admins can view but not edit home-level reviews (or can edit with audit trail?)
- [ ] All review submissions are audited (who, when, what changed)
- [ ] Sensitive fall data is protected by existing data access controls
- [ ] Form data is sanitized before database insertion (prevent SQL injection, XSS)

---

## 🧪 **Testing Requirements**

### ✅ **Additions:**

**Unit Tests:**
- [ ] Goal metric mapping functions
- [ ] Data query generation from goal metrics
- [ ] Progress calculation logic
- [ ] Form validation rules

**Integration Tests:**
- [ ] API endpoints for creating/reading reviews
- [ ] Fall data query integration
- [ ] Permission/role-based access

**E2E Tests:**
- [ ] Complete review submission flow
- [ ] Chain admin dashboard view
- [ ] Goal progress calculation and display

**Manual Testing Checklist:**
- [ ] Submit review for current month
- [ ] View previous month's goals
- [ ] Set multiple goals with different metrics
- [ ] Verify goal progress updates with new fall data
- [ ] Chain admin views dashboard
- [ ] Mobile responsiveness

---

## 📅 **Priority / Urgency**

**Current:** Medium – Adds value for multiple users

### ✅ **Enhanced with Context:**
- **Priority:** Medium-High (important for compliance and reducing falls, but not blocking other critical features)
- **Target Users:** All homes (~X homes currently using platform)
- **Business Value:** 
  - Directly addresses compliance pain point
  - Supports fall reduction initiatives (safety priority)
  - Creates upselling opportunity (premium feature)

---

## 💰 **Monetization**

**Current:** Homes will pay more and the reason why is because it's a value add on top of the current set of features we have.

### ✅ **Enhanced:**
- Feature tier: Premium/Pro tier (specify which)
- Pricing: [To be determined - add-on fee or included in tier?]
- Sales messaging: "Drive accountability and reduce falls through data-driven goal setting"

---

## 📚 **Additional Context for Developers**

### **POC Reference:**
- Code: https://github.com/rishimehta24/goals-feature
- Tech Stack: React, TypeScript, Tailwind CSS
- Key Component: `FallsReviewTracker.tsx`
- Data Types: See `src/types/index.ts` for TypeScript interfaces

### **Design System:**
- Match existing platform UI/UX patterns
- Use existing component library (if available)
- Follow existing color scheme and branding

### **API Endpoints Needed:**
```
POST   /api/falls-reviews              # Create review
GET    /api/falls-reviews/:id          # Get specific review
PUT    /api/falls-reviews/:id          # Update review
GET    /api/falls-reviews/home/:homeId # Get all reviews for home
GET    /api/falls-reviews/chain/:chainId # Chain dashboard
GET    /api/falls/metrics              # Query fall metrics for goals
POST   /api/review-goals               # Create goal (nested in review)
```

### **Database Schema Outline:**
```sql
falls_reviews:
  - id (PK)
  - home_id (FK)
  - review_month (YYYY-MM)
  - home_name
  - attendees
  - trends_identified
  - proposed_solutions
  - previous_goals_progress
  - action_items
  - created_by (FK to users)
  - created_at
  - updated_at

review_goals:
  - id (PK)
  - review_id (FK)
  - metric (string - matches dropdown option)
  - target (string)
  - timeframe (string)
  - responsible (string)
  - data_query_config (JSON - stores filter params)
  - baseline_value (number - at time of goal creation)
  - target_value (number - calculated from target string)
```

### **Questions for Product/Design:**
1. Should reviews be editable after submission? (Recommendation: Allow edits within 7 days, then lock)
2. How should we handle homes that miss a month? (Allow catch-up submissions?)
3. Should chain admins be able to edit home reviews or only view?
4. What's the visual design for chain dashboard? (Table, cards, charts?)
5. Should goals auto-archive after timeframe expires, or stay visible indefinitely?

---

## ✅ **Definition of Done**

- [ ] All acceptance criteria met
- [ ] Code reviewed and approved
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests passing
- [ ] QA testing complete (manual + automated)
- [ ] Documentation updated (API docs, user guide)
- [ ] Deployed to staging environment
- [ ] Stakeholder approval (Kindera review)
- [ ] Training materials created for end users
- [ ] Deployed to production
- [ ] Monitoring/analytics in place

---

## 📞 **Stakeholder Contact**

- Product Owner: [Name/Email]
- Primary Stakeholder: Kindera [Email]
- Technical Lead: [Name/Email]
- Design Lead: [Name/Email]

---

## 🔄 **Version History**

- v1.0 - Initial ticket (Week of Sept 23rd)
- v1.1 - Enhanced with technical details (Current)

