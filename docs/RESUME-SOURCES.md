# Resume sources and generation

`public/documents/jade-laurence-empleo-resume.pdf` is a two-page A4 resume for job applications. It uses a white/navy layout, selectable text, the supplied profile photograph, three selected projects, and all 14 dated hackathon recognitions. The supplied business email, website, GitHub, LinkedIn, and selected project websites have clickable links.

## Verified source facts

- **Full name:** Jade Laurence Cabaruan Empleo, transcribed from the proprietor name in the supplied original DTI certificate at `public/documents/syntax-surge-dti-certificate.pdf` and stored in `business.founder.fullName`. The professional site profile uses `business.founder.name`, Jade Laurence Empleo.
- **Role/business:** Software Developer / Product Builder; founder of SyntaxSurge Software Development Services. The founder role and business legal name come from `src/data/business.ts`, with the product-building summary supported by the project record.
- **Photograph:** the unchanged owner-supplied `public/images/jade-laurence-empleo.jpg`, selected through `business.founder.portrait.src`. The complete square image is scaled into a small header photograph; no retouching or replacement image is used.
- **Contact links:** the owner supplied `syntaxsurge@gmail.com` as the public business email; it is read from `business.email` with its `business.links.email` mailto destination. Existing LinkedIn/GitHub URLs come from `business.links`, plus the public business website `https://syntaxsurge.com/`. No phone number or private address is included, and no message is sent by generating or serving the resume.
- **Selected projects:** MC Dental Station, Kaldi Circle, and ClipLore. Their titles, summaries, primary website links, and tags are read from `src/data/portfolio.ts`. MC Dental's additional note preserves staff confirmation for appointments and approved English/Filipino FAQ assistance.
- **Technical skills:** TypeScript, JavaScript, React, Next.js, and Tailwind CSS are supported by this site's source and package manifest; application/API integration and staff workflows are also supported by the owner's MC Dental Station repository. Interface/product work and AI experiences are represented by the site services and project examples. No proficiency ratings or years of experience are inferred.
- **Recognition:** every entry in the canonical `awards` array is included, sorted from newest to oldest. Each lists its project, placement/title, event, and supplied month/year. Titles remain distinct: recognitions are not relabeled as first-place wins, and no prize totals are added. Award provenance remains in `docs/CONTENT-SOURCES.md` and `docs/AWARD-MEDIA-SOURCES.md`.

No education, qualifications, employment history, employment dates, client statistics, or revenue claims are invented. The document summarizes the owner's supplied work/award history; it does not assert independent authentication of prize disbursement or government registration status.

## Rebuild

The editable source is `scripts/build-resume.py`. It reads canonical business/project/award exports through Node's TypeScript stripping support and generates the public PDF with ReportLab. There is no separate permanent resume JSON file to synchronize. The concise editorial summary/skills live in the generator; the full name, project/contact/recognition facts, and portrait path come from site data. `business.resumeHref` links to the generated public PDF.

Use the project's supported Node version, Python 3.9 or later, and the `reportlab` Python package:

```sh
python3 scripts/build-resume.py
```

If a different Node executable is required, set `RESUME_NODE` to its verified path. ReportLab is an authoring dependency only; the website serves the committed PDF and does not run the generator or require Python when deployed.

Before publishing a regenerated file, render both pages with Poppler and inspect spacing, text, the photograph, page numbers, and link targets. Verify that all canonical award titles/events and all three selected projects remain present. The generator fails if content exceeds its page bounds rather than shrinking text to an unreadable size. This source record and local artifact do not imply that a website update has been deployed.
