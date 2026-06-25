---
aliases:
  - ETL
---
Extract, Transform and Load is a data integration pattern where data is extracted from source systems, transformed (cleaned, enriched, restructured) in a staging area, and then loaded into the target system. The transformation happens before the data lands in its final destination.

Traditional ETL made sense when storage was expensive and compute was centralised. You transformed data before loading because you couldn't afford to store the raw stuff. Modern architectures often prefer [[ELT]] instead.