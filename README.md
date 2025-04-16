# 🐘Bidirectional ClickHouse ↔ Flat File Ingestion Tool

This project is a full-stack web application that allows **bidirectional data ingestion** between a ClickHouse database and flat files (CSV). Built using **React** (frontend) and **Express.js** (backend).

---

## 🚀 Features

- Connect to a ClickHouse database using JWT token.
- Select tables and columns.
- Export data from ClickHouse to CSV.
- Import data from CSV to ClickHouse.
- View progress messages and record counts.

---

## 🛠️ Tech Stack

- **Frontend**: React, Axios
- **Backend**: Express.js, ClickHouse JS Client, CSV Parser
- **Database**: ClickHouse (Docker)

---

## 🧪 Example Datasets (for Testing)

Use [ClickHouse example datasets](https://clickhouse.com/docs/en/getting-started/example-datasets/), like:

- `uk_price_paid`
- `ontime`

---

## 🐳 Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/your-username/clickhouse-csv-ingestion.git
cd clickhouse-csv-ingestion
