---
type: Reference
title: "Epic to Logis Appointment Sync"
description: "The Alberta Emergency Health Services Community Paramedics currently use Epic for clinical documentation and the Logic computer-aided dispatch application for booking appointments."
timestamp: 2026-06-26T19:19:06Z
---

The Alberta Emergency Health Services Community Paramedics currently use Epic for clinical documentation and the Logic computer-aided dispatch application for booking appointments. There was an attempt to use Epic's scheduling system.  The ability to be part of the larger EHS logistics network and real-time crew scheduling resulted in a migration to Logis. Because Epic is not used for scheduling, appointments are hidden from patients since they don't reflect when the community paramedic is going to show up.

This results in a extra effort in creating the appointment for clinical documentation for the encounter as well as a lack of visibility for appointments for the patient.  In an effort to fix this, we're investigating the possibility of creating some information exchanges as follows:

- **Send Referral Epic Referral Order**– Step one would take the current referral order over to Logis
    
- **Book Appointment** – The MIH patient coordinator then books the initial appointment in Logis and then:
    
- **Close the Appointment loop** – This is where the real fun begins where the appointment is sent from Logis to Epic and then booked as either an Inpatient or Outpatient appointment depending on the patient location.
![[Epic to Logis Appointment Sync Context model.png]]

We are in the process of getting the Logis Appointment interface API specifications as there is a CAD to CAD standard (sort of) that we would need to map to.  Looking to find some times for the key Epic folks to schedule a meeting with the appropriate Alberta Health Shared Services Team.