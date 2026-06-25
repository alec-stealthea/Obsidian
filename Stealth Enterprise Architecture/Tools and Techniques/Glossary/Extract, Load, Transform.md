---
aliases:
  - ELT
---
Extract, Load and Transform is a data integration pattern where data is extracted from source systems, loaded into the target system in raw form, and then transformed within the target environment. The transformation happens after the data lands.

ELT became practical when cloud storage got cheap and compute became elastic. Load everything first, transform later. The advantage is flexibility - if your business logic changes, you can reprocess from the raw data without re-extracting from source systems.