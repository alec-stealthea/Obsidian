# Compassionate Intervention — Release of Information
## Option A: Snowflake SQL API Configuration

This document defines the Snowflake-side configuration required for the IBM Integration Engine to query the CI RoI aggregate view via the Snowflake SQL API (REST). This is the automated path where HSS queries the cross-CIS encounter summary after a successful `CreateRelease2` call to Epic.

## Architecture Overview

```
IBM Integration Engine
        │
        ▼
  POST /api/v2/statements
  (Snowflake SQL API - REST/HTTPS)
        │
        ▼
  Snowflake ─── INTEGRATION_WH
        │
        ▼
  VW_CI_ROI_AGGREGATE
        │
        ├── VW_CI_ROI_EMS_INCIDENTS
        ├── VW_CI_ROI_ED_VISITS
        ├── VW_CI_ROI_INPATIENT_EPISODES
        ├── VW_CI_ROI_AMBULATORY_VISITS
        ├── VW_CI_ROI_COMMUNITY_TREATMENT_ORDERS
        └── VW_CI_ROI_CURRENT_DIAGNOSES
```

## Database and Schema

```sql
-- Dedicated schema for CI RoI views
-- Assumes CI_ROI database already exists or is created here
CREATE DATABASE IF NOT EXISTS CI_ROI;
CREATE SCHEMA IF NOT EXISTS CI_ROI.REPORTING;
```

## Dedicated Warehouse

A separate XS warehouse for integration traffic, isolated from analytics workloads. Auto-suspend keeps costs to near zero when idle.

```sql
CREATE WAREHOUSE IF NOT EXISTS CI_ROI_INTEGRATION_WH
  WAREHOUSE_SIZE   = 'XSMALL'
  AUTO_SUSPEND     = 60
  AUTO_RESUME      = TRUE
  INITIALLY_SUSPENDED = TRUE
  COMMENT          = 'CI RoI - IBM Integration Engine queries only';
```

## Service Account (Key-Pair Authentication)

Key-pair auth eliminates password rotation and aligns with HSS security standards. The IBM Integration Engine generates a JWT signed with the private key.

```sql
-- Integration role with least-privilege access
CREATE ROLE IF NOT EXISTS CI_ROI_INTEGRATION_ROLE
  COMMENT = 'CI RoI - read-only access for IBM Integration Engine';

-- Grants
GRANT USAGE ON DATABASE CI_ROI TO ROLE CI_ROI_INTEGRATION_ROLE;
GRANT USAGE ON SCHEMA CI_ROI.REPORTING TO ROLE CI_ROI_INTEGRATION_ROLE;
GRANT SELECT ON ALL VIEWS IN SCHEMA CI_ROI.REPORTING TO ROLE CI_ROI_INTEGRATION_ROLE;
GRANT SELECT ON FUTURE VIEWS IN SCHEMA CI_ROI.REPORTING TO ROLE CI_ROI_INTEGRATION_ROLE;
GRANT USAGE ON WAREHOUSE CI_ROI_INTEGRATION_WH TO ROLE CI_ROI_INTEGRATION_ROLE;

-- Service user
CREATE USER IF NOT EXISTS SVC_IBM_CI_ROI
  DEFAULT_ROLE      = CI_ROI_INTEGRATION_ROLE
  DEFAULT_WAREHOUSE = CI_ROI_INTEGRATION_WH
  MUST_CHANGE_PASSWORD = FALSE
  COMMENT           = 'Service account for IBM Integration Engine - CI RoI queries'
  RSA_PUBLIC_KEY    = '<INSERT_RSA_PUBLIC_KEY_HERE>';

GRANT ROLE CI_ROI_INTEGRATION_ROLE TO USER SVC_IBM_CI_ROI;
```

### Key-Pair Setup Steps

1. Generate a 2048-bit RSA key pair (private key stays on the IBM Integration Engine server)
2. Extract the public key (strip headers/footers) and set it on the Snowflake user via `ALTER USER SVC_IBM_CI_ROI SET RSA_PUBLIC_KEY = '...'`
3. The Integration Engine generates a JWT with `iss` = `<account>.<user>.<public_key_fingerprint>` and `sub` = `<account>.<user>`
4. JWT is passed as `Authorization: Bearer <token>` on SQL API calls

Reference: [Snowflake Key-Pair Authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)

## SQL API Call Pattern

The IBM Integration Engine queries the aggregate view by patient ID using a parameterized bind variable.

### Request

```
POST https://<account_identifier>.snowflakecomputing.com/api/v2/statements
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-Snowflake-Authorization-Token-Type: KEYPAIR_JWT
```

```json
{
  "statement": "SELECT * FROM CI_ROI.REPORTING.VW_CI_ROI_AGGREGATE WHERE patient_id = :1 AND encounter_date >= :2 AND encounter_date <= :3",
  "timeout": 60,
  "database": "CI_ROI",
  "schema": "REPORTING",
  "warehouse": "CI_ROI_INTEGRATION_WH",
  "role": "CI_ROI_INTEGRATION_ROLE",
  "bindings": {
    "1": { "type": "TEXT", "value": "<EPIC_PATIENT_ID>" },
    "2": { "type": "TEXT", "value": "<THREE_YEAR_LOOKBACK_START>" },
    "3": { "type": "TEXT", "value": "<CURRENT_DATE>" }
  }
}
```

### Response Handling

The SQL API returns results synchronously for fast queries or asynchronously via polling for longer ones.

**Synchronous (query completes within timeout):**
- HTTP 200 with `statementStatusUrl` and inline `data` array
- `resultSetMetaData` describes column names and types

**Asynchronous (query exceeds timeout):**
- HTTP 202 with `statementStatusUrl`
- IBM Integration Engine polls `GET /api/v2/statements/<statementHandle>` until status is `succeeded`

**Pagination:**
- If `data` exceeds the default partition size, results are split across partitions
- Partition 0 is in the initial response; additional partitions are fetched via `GET /api/v2/statements/<statementHandle>?partition=<n>`
- For CI RoI (single patient, 3-year window), pagination is unlikely but should be handled

Reference: [Snowflake SQL API](https://docs.snowflake.com/en/developer-guide/sql-api/index)

## Optional: Table Function Wrapper

If a formal interface contract is preferred over direct view queries:

```sql
CREATE OR REPLACE FUNCTION CI_ROI.REPORTING.FN_CI_ROI_PATIENT_SUMMARY(
    P_PATIENT_ID VARCHAR,
    P_START_DATE DATE,
    P_END_DATE   DATE
)
RETURNS TABLE (
    patient_id          VARCHAR,
    encounter_type      VARCHAR,
    encounter_id        VARCHAR,
    encounter_date      DATE,
    facility            VARCHAR,
    chief_complaint     VARCHAR,
    presenting_complaint VARCHAR,
    diagnoses           VARCHAR,
    disposition         VARCHAR,
    detail_json         VARIANT
)
LANGUAGE SQL
AS
$$
    SELECT patient_id, encounter_type, encounter_id, encounter_date,
           facility, chief_complaint, presenting_complaint, diagnoses,
           disposition, detail_json
    FROM CI_ROI.REPORTING.VW_CI_ROI_AGGREGATE
    WHERE patient_id = P_PATIENT_ID
      AND encounter_date BETWEEN P_START_DATE AND P_END_DATE
$$;

GRANT USAGE ON FUNCTION CI_ROI.REPORTING.FN_CI_ROI_PATIENT_SUMMARY(VARCHAR, DATE, DATE)
  TO ROLE CI_ROI_INTEGRATION_ROLE;
```

Called via SQL API:

```json
{
  "statement": "SELECT * FROM TABLE(CI_ROI.REPORTING.FN_CI_ROI_PATIENT_SUMMARY(:1, :2::DATE, :3::DATE))",
  "bindings": {
    "1": { "type": "TEXT", "value": "<EPIC_PATIENT_ID>" },
    "2": { "type": "TEXT", "value": "<START_DATE>" },
    "3": { "type": "TEXT", "value": "<END_DATE>" }
  }
}
```

## Network Configuration

The Snowflake account must allow inbound connections from the IBM Integration Engine's egress IP range. If using Snowflake Private Link (recommended for PHI):

```sql
-- Verify network policy allows HSS IP range
CREATE OR REPLACE NETWORK POLICY CI_ROI_INTEGRATION_POLICY
  ALLOWED_IP_LIST = ('<HSS_EGRESS_IP_1>', '<HSS_EGRESS_IP_2>')
  COMMENT = 'Restrict CI RoI service account to HSS network';

ALTER USER SVC_IBM_CI_ROI SET NETWORK_POLICY = CI_ROI_INTEGRATION_POLICY;
```

Reference: [Snowflake Network Policies](https://docs.snowflake.com/en/user-guide/network-policies)

## Monitoring

```sql
-- Query to monitor integration usage and performance
SELECT query_id, start_time, end_time, total_elapsed_time,
       rows_produced, bytes_scanned, query_text
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE user_name = 'SVC_IBM_CI_ROI'
  AND start_time >= DATEADD('day', -7, CURRENT_TIMESTAMP())
ORDER BY start_time DESC;
```

## Related Documents

- [[Compassionate Intervention Release of Information Data Model]] — Entity definitions and attributes
- [[CI RoI Sequence - CIP to IBM Integration Engine]] — Integration sequence (automated path)
- [[CI RoI Sequence - All Engines Automated vs Human]] — Full end-to-end flow
- [[CI RoI IBM Integration Engine Message Specification]] — IBM-side call pattern
- [[CI RoI Object View Structure]] — Individual SQL views feeding the aggregate
