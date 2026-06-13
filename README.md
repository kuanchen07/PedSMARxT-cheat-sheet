# PedSMARxT cheat sheet

**Live sheet:** [https://kuanchen07.github.io/PedSMARxT-cheat-sheet/](https://kuanchen07.github.io/PedSMARxT-cheat-sheet/)

A **PedSMARxT** quick reference for pediatric infectious disease care: procedures, empirical and definitive therapy, and pediatric dosing in one printable-style layout. Use the **header dropdown** to switch between clinical modules (SSTI and CAP).

## Checks

`npm run validate:dose-calc` scans `index.html` and `diseases/**/*.html` for `data-dose-calc` attributes and verifies each parses as JSON and satisfies [`dose-calc/compute.js`](dose-calc/compute.js) (same rules the live calculator uses). GitHub Actions runs this on pushes and pull requests to `main`.

## Contents

This list tracks what the sheet covers; **content is updated often** as the cheat sheet changes.

The page is organized into **two modules** (header dropdown). Within **SSTI** or **CAP**, the bottom-right **Sections** control jumps between pathway blocks.

### Skin and Soft Tissue infections (SSTI)

1. **Purulent cellulitis — impetigo / ecthyma / folliculitis**
   - Folliculitis, limited vs extensive impetigo and ecthyma.
   - When I&D and cultures are *not* indicated; topical vs oral options; penicillin-allergy alternatives; vancomycin when systemically ill.

2. **Purulent cellulitis — furuncle, carbuncle, abscess**
   - **Mild / moderate / severe** pathways: I&D; wound and blood culture as indicated.
   - **Mild:** I&D-only discharge.
   - **Moderate:** TMP-SMX and doxycycline (MRSA coverage).
   - **Severe:** IV vancomycin and culture-directed IV options (e.g. nafcillin, cefazolin, penicillin G).
   - **Step-down oral** choices by organism (MRSA, MSSA, GAS).

3. **Non-purulent cellulitis**
   - **Mild:** Outpatient oral beta-lactams; PCN-allergy clindamycin.
   - **Moderate:** IV cefazolin, nafcillin, or vancomycin for type I PCN allergy.
   - **Severe:** Blood culture; empirical vancomycin; culture-guided definitive therapy via in-page jumps to **Necrotizing and toxin-mediated cellulitis** Table 4 and Table 5 pathway cards and **Bites & pyomyositis** Table 6 (pre-emptive therapy/prophylaxis and treatment of human, cat, or dog bites); ID/surgery notes.

4. **Necrotizing and toxin-mediated cellulitis**  
   Under one main heading, **Table 4** and **Table 5** are the two side-by-side pathway cards (also the targets of jumps from non-purulent severe). Same layout as on the sheet:

   | Topic | Necrotizing fasciitis / Fournier's gangrene / Ludwig's angina | Toxic shock syndrome / Staphylococcal scalded skin syndrome / toxin-mediated disease |
   | --- | --- | --- |
   | **Procedures / consults** | Emergent surgical debridement; deep tissue culture + susceptibilities; blood culture ×1–2; ID and surgery | Blood culture ×1–2; ID and surgery |
   | **Empirical** | IV pip/tazo + linezolid; alternative: vancomycin + cefepime + metronidazole + clindamycin | IV nafcillin + linezolid |
   | **Definitive** | Culture-guided by organism (e.g. penicillin/clindamycin, MSSA/MRSA options, Vibrio/Aeromonas) | Culture-guided GAS, MSSA, and MRSA pathways |

5. **Preseptal / orbital cellulitis**
   - **Preseptal:** Optional ophtho/ID as indicated; sinus/dental/unclear IV amp-sulbactam vs PO amo/clav (max 1200 mg) vs allergy doxy; clear skin IV vanc vs PO TMP-SMX vs PO doxy; routine I&D/cultures not indicated.
   - **Orbital:** Admit CT with contrast; blood cultures; MRSA **nares PCR**; ID/ophtho and conditional ENT/OMFS — no IC: IV amp-sulbactam, oral step-down ≥72 h with ID; intracranial/abscess triple ceftriaxone + metro + vancomycin per ID.
   - **Unclear** preseptal vs orbital: Ophthalmology; consider CT; proceed per findings.
   - **Bites & pyomyositis** (two column cards below): **Human/cat/dog bites** — pre-emptive prophylaxis within 24 h when indicated (PO amo/clav vs anaphylactic PCN doxy). **Infected bite:** ID/tetanus/rabies considerations; PO amo/clav Q8h or IV amp-sulbactam; PCN allergy doxy. **Pyomyositis:** Blood cultures ×2, MRI, surgery and early drainage; empirical vancomycin; culture-guided MSSA/MRSA/GAS IV options; preceding trauma links to **necrotizing fasciitis** pathway; consider oral step-down when clinically appropriate.

### Community-Acquired Pneumonia (CAP)

Within **CAP**, the bottom-right **Sections** control jumps between pathway blocks (same FAB as SSTI, module-aware).

1. **Uncomplicated CAP**
   - **Mild / moderate / severe** columns: procedures (doctor); oral or IV therapy with pharmacist dosing; **duration insets** on each severity pathway.
   - **Mild:** Outpatient PO amoxicillin; PCN-allergy clindamycin or doxycycline; lab — no culture, discharge on oral therapy.
   - **Moderate:** IV ampicillin (ceftriaxone or clindamycin for PCN allergy); IV-to-PO step-down when afebrile ≥24h.
   - **Severe / complicated:** Chest US, cultures, MRSA nares PCR, ID/surgery consults; IV amp-sulbactam or ceftriaxone; add vancomycin or linezolid for septic shock, recent influenza, or abscess concern.

2. **Necrotizing and toxin-mediated CAP**
   - Two side-by-side pathway cards: **necrotizing pneumonia / lung abscess** and **toxic shock / SSSS / toxin-mediated**.
   - Procedures, empirical regimens (pip/tazo + linezolid; nafcillin + linezolid), culture-guided definitive by GAS / MSSA / MRSA.

3. **CAP with pleural effusion / empyema**
   - Full-width card (**Complicated** — pneumonia with pleural effusion / empyema): procedures, drain management criteria, pleural fluid studies, **tPA dosing table** by weight band.

4. **Treatment failure**
   - Full-width card (**Trigger** — clinical worsening despite ≥48–72h appropriate antibiotics at appropriate dose and frequency); consults and imaging; **escalation ladder** by prior oral regimen with PCN-allergy ceftriaxone branch.
