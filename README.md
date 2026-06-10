
# 🎓 Student Enrollment Form — JsonPowerDB Micro Project

![JsonPowerDB](https://img.shields.io/badge/Database-JsonPowerDB-blue)
![HTML5](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20jQuery-orange)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 📋 Table of Contents
- [Title](#-student-enrollment-form--jsonpowerdb-micro-project)
- [Description](#-description)
- [Benefits of Using JsonPowerDB](#-benefits-of-using-jsonpowerdb)
- [Scope of Functionalities](#-scope-of-functionalities)
- [Examples of Use](#-examples-of-use)
- [Project Status](#-project-status)
- [Release History](#-release-history)
- [Sources](#-sources)

---

## 📌 Description

**Student Enrollment Form** is a form-based web application built as part of a Micro Project on **JsonPowerDB (JPDB)**. It performs real-time **CRUD (Create, Read, Update)** operations directly on the JsonPowerDB cloud database — without any backend server or traditional database setup.

The form stores student data in the **`STUDENT-TABLE`** relation of the **`SCHOOL-DB`** database on JsonPowerDB, using a simple REST API approach from a plain HTML + jQuery frontend.

### 🗂️ Database Details

| Property        | Value             |
|-----------------|-------------------|
| Database Name   | `SCHOOL-DB`       |
| Table / Relation| `STUDENT-TABLE`   |
| Primary Key     | `Roll-No`         |

### 📥 Input Fields

| Field           | Type                  |
|-----------------|-----------------------|
| Roll-No         | String (Primary Key)  |
| Full-Name       | String                |
| Class           | String                |
| Birth-Date      | Date                  |
| Address         | String                |
| Enrollment-Date | Date                  |

---

## ⚡ Benefits of Using JsonPowerDB

JsonPowerDB is a next-generation, real-time, serverless database that offers several unique advantages:

- 🚀 **Serverless & No Backend Needed** — Interact with the database directly from the frontend using REST APIs. No Node.js, PHP, or Java backend required.
- ⚡ **Real-time Data Processing** — Extremely fast read/write operations powered by PowerIndex technology.
- 🧩 **Schema-Free** — No need to define tables or schemas in advance. Just send JSON and it gets stored.
- 🔑 **Token-Based Security** — Simple and secure connection token authentication.
- 🌐 **Multi-Mode Database** — Supports Key-Value store, Document DB, RDBMS, GeoSpatial, Time Series — all in one.
- 💡 **Easy to Learn & Use** — Minimal learning curve. Any developer familiar with REST APIs can get started in minutes.
- 🔄 **Built-in CRUD via IML** — Simple `PUT`, `GET_BY_KEY`, `UPDATE`, `REMOVE` commands cover all data operations.
- 📦 **Lightweight** — No heavy drivers, ORMs, or connection pools needed. Just jQuery + `jpdb-commons.js`.
- 🆓 **Free to Use** — Available for students and developers with a free tier at login2explore.com.
- 🔁 **Inbuilt Undo** — JPDB maintains data versioning, supporting undo operations natively.

---

## 🛠️ Scope of Functionalities

### Form Behavior (as per project spec)
```
Page Load / Reset clicked
        ↓
Only Roll-No field active, cursor auto-placed on it.
All other fields and buttons are DISABLED.
        ↓
User enters Roll-No and presses Tab / clicks away
        ↓
    ┌──────────────────────────────────────────┐
    │     Does Roll-No exist in JPDB?          │
    └──────────────────────────────────────────┘
         │ NO                      │ YES
         ↓                          ↓
 Enable [Save] + [Reset]     Fill form with DB data
 Enable all input fields     Enable [Update] + [Reset]
         ↓                   Disable Roll-No field
  Validate (no blanks)              ↓
  Click [Save]               Validate (no blanks)
         ↓                   Click [Update]
  Data stored in JPDB               ↓
         ↓                   Data updated in JPDB
      Reset form                    ↓
                               Reset form
```

### Features
- ✅ Auto-detect new vs existing record on Roll-No entry
- ✅ Save new student records to JsonPowerDB
- ✅ Auto-load and update existing student records
- ✅ Full field validation — no empty fields allowed
- ✅ Reset to initial state at any time
- ✅ Real-time toast notifications for all actions
- ✅ Token saved in localStorage for convenience
- ✅ Responsive, modern UI (Bootstrap 4)

---

## 💡 Examples of Use

### Saving a New Student
1. Open the form → Enter Roll No `101` → Press Tab
2. System checks JPDB → Roll No not found → **Save** button enabled
3. Fill in: Name, Class, Birth Date, Address, Enrollment Date
4. Click **Save** → Data stored in `SCHOOL-DB/STUDENT-TABLE`
5. Form resets automatically

### Updating an Existing Student
1. Enter Roll No `101` → Press Tab
2. System finds record → **Loads data** into form → **Update** button enabled
3. Modify any field (Roll No is locked)
4. Click **Update** → Record updated in JPDB
5. Form resets automatically

### API Call Example (Save)
```javascript
var jsonObj = {
    "Roll-No": "101",
    "Full-Name": "Rahul Sharma",
    "Class": "10-A",
    "Birth-Date": "2008-05-12",
    "Address": "123, MG Road, Mumbai",
    "Enrollment-Date": "2024-06-01"
};

var req = createPUT(jsonObj, "SCHOOL-DB", "STUDENT-TABLE");
var result = executeCommandAtGivenBaseUrl(req, jpdbBaseURL, jpdbIML);
```

---

## 📁 Project Structure

```
student-enrollment-jpdb/
│
├── index.html          # Main form — UI + all CRUD logic
├── jpdb-commons.js     # JsonPowerDB helper functions
└── README.md           # Project documentation
```

---

## 🛠️ Tech Stack

| Technology      | Purpose                          |
|-----------------|----------------------------------|
| HTML5           | Page structure                   |
| CSS3            | Custom styling                   |
| Bootstrap 4     | Responsive layout & components   |
| jQuery 3.5      | DOM manipulation & AJAX calls    |
| JsonPowerDB     | Cloud database via REST API      |
| jpdb-commons.js | JPDB helper / wrapper functions  |

---

## 🚀 How to Run

1. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/student-enrollment-jpdb.git
   cd student-enrollment-jpdb
   ```

2. **Open `index.html`** directly in any browser — no server needed!

3. **Get your JsonPowerDB Connection Token**
   - Register at [login2explore.com](http://login2explore.com)
   - Dashboard → My Profile → Connection Token
   - Paste token in the form's **Connection Token** field → click **Connect**

4. **Start using the form!**

---

## 📊 Project Status

![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

| Feature               | Status      |
|-----------------------|-------------|
| Save new record       | ✅ Done     |
| Load existing record  | ✅ Done     |
| Update record         | ✅ Done     |
| Validation            | ✅ Done     |
| Reset functionality   | ✅ Done     |
| Responsive UI         | ✅ Done     |

---

## 📦 Release History

| Version | Date       | Description                                      |
|---------|------------|--------------------------------------------------|
| v1.0.0  | 2025-06-10 | Initial release — Student Enrollment Form with Save, Update, Reset using JsonPowerDB |

---

## 🔗 Sources

- [JsonPowerDB Official Documentation](http://login2explore.com/jpdb/docs.html)
- [JsonPowerDB Login2Explore](http://login2explore.com)
- [Mastering Markdown (GitHub Guide)](https://guides.github.com/features/mastering-markdown/)
- [Bootstrap 4 Documentation](https://getbootstrap.com/docs/4.5/)
- [jQuery Documentation](https://api.jquery.com/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Made with ❤️ using JsonPowerDB — the next-generation, serverless, real-time database.