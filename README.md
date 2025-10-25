# 🤖 Recruitment Automation Design

A comprehensive **automation system and workflow design** for recruitment operations — covering incentive calculation, cash-flow management, invoice generation, P&L dashboards, LinkedIn prospecting, and freelancer analytics.  

Developed by **Neha Bhalerao** 💼  

---

## 📘 Table of Contents
1. [Project Overview](#-project-overview)
2. [Objectives](#-objectives)
3. [Key Features](#-key-features)
4. [Project Structure](#-project-structure)
5. [Tools & Technologies](#-tools--technologies)
6. [How to Use](#-how-to-use)
7. [Deliverables](#-deliverables)
8. [Testing Checklist](#-testing-checklist)
9. [Assumptions](#-assumptions)
10. [License & Contact](#-license--contact)

---

## 🎯 Project Overview
This repository contains the **design and automation blueprint** for streamlining a recruitment firm's workflow using **Google Sheets, Apps Script, and no-code tools** like Make or Zapier.  
The project automates:
- Recruiter incentive calculations  
- Invoice generation and GST summary  
- Client payment tracking and cash-flow dashboard  
- LinkedIn prospect ingestion and lead classification  
- Freelancer data analytics and daily recruiter summary automation  

---

## 🧠 Objectives
To design a **modular, reusable automation system** for recruitment firms that:
- Reduces manual effort
- Improves accuracy in calculations and invoicing  
- Provides live analytics and dashboards  
- Simplifies data ingestion and reporting  
- Enhances visibility into recruiter and freelancer performance  

---

## ⚙️ Key Features

### 🧾 Part 1 – Recruitment Automation
- **Slab-based incentive logic** based on CTC & recruiter performance  
- **Cash-flow sheet** for tracking invoices, due dates, and payments  
- **Auto invoice generation** using Google Apps Script  
- **GST summary automation** for compliance  
- **Live P&L dashboard** to visualize revenue and profit trends  

### 📈 Part 2 – Sales Prospect Automation
- Automated **LinkedIn lead ingestion** using Make/Zapier/Phantombuster  
- Lead classification into verticals like *Recruitment*, *AI Data*, etc.  
- CRM-ready export with tagging and scoring  

### 👩‍💻 Part 3 – Freelancer Data Analysis
- **Freelancer database** tracking skills, region, ratings, and activity  
- Analytical dashboards to identify top and inactive freelancers  
- **Heatmaps and KPI charts** for better resource planning  

### 🧩 Part 4 – Research & Daily Summary Automation
- Automated daily recruiter performance summary  
- Email or WhatsApp delivery of daily reports  
- Workflow logic for trigger-based report generation  


---

## 🛠 Tools & Technologies

| Category | Tools / Frameworks |
|-----------|--------------------|
| Spreadsheet & Automation | Google Sheets, Google Apps Script |
| No-code Automation | Make (Integromat), Zapier, Phantombuster, Bardeen |
| CRM & Tracking | Notion, Google Sheets |
| Data Visualization | Google Sheets Dashboards, Pivot Tables |
| Communication | Gmail API, Twilio (WhatsApp Automation) |
| Documentation | Markdown, Flowcharts, Excel templates |

---

## 🚀 How to Use

1. **Clone the repo** or download the ZIP.  
2. Duplicate the Sheets templates into your Google Drive.  
3. Open `Apps Script` (Extensions → Apps Script) and copy the `apps_script_invoice_generation.js`.  
4. Set up the triggers (`onEdit` or `time-based`) for invoice generation.  
5. Configure automation flows in **Make/Zapier** for LinkedIn prospect import.  
6. Import the freelancer dataset and build your dashboard with pivot tables.  
7. Use `daily_summary_design.md` to automate daily recruiter performance summaries.  

---

## 📦 Deliverables
- 📊 Recruiter incentive and cash-flow sheets  
- 🧾 Automated GST and invoice generation  
- 🧠 Prospect classification workflow  
- 👥 Freelancer analytics dashboards  
- 🕹 Research documentation and automation blueprint  

---

## 🧪 Testing Checklist

| Task | Status |
|------|--------|
| Incentive slab logic works for edge cases | ✅ |
| Invoice PDF generated and status updated | ✅ |
| GST logic accurate based on client state | ✅ |
| Cashflow aggregation by month works | ✅ |
| LinkedIn prospect ingestion and deduplication | ✅ |
| Freelancer dashboard metrics update dynamically | ✅ |
| Daily summary trigger sends mail/WhatsApp | ✅ |

---

## ⚡ Assumptions
- Placement fee = **10%** of Fixed CTC  
- GST = **18%** (CGST/SGST: 9% each)  
- State configuration handled in `Lookups` sheet  
- Data privacy respected for LinkedIn automation  
- WhatsApp messages triggered via Twilio API  

---

## 📜 License & Contact

This project is shared for **educational and demonstration purposes**.  
Feel free to use or modify it with attribution.

**© 2025 Neha Bhalerao. All Rights Reserved.**

📧 **Email:** neha.bhalerao@example.com  
🔗 **LinkedIn:** [linkedin.com/in/nehaabhalerao](https://linkedin.com/in/nehaabhalerao)

---

⭐ *If you found this project helpful, don’t forget to give it a star!*
