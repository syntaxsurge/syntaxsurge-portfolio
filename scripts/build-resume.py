#!/usr/bin/env python3
"""Build the public resume and matching preview pages from canonical site data.

Run: python3 scripts/build-resume.py
Requires ReportLab, Pillow, pypdf, Node, and Poppler's pdftoppm.
RESUME_NODE and RESUME_PDFTOPPM select non-default authoring executables.
"""

import calendar
import html
import json
import os
from pathlib import Path
import subprocess
import tempfile

from PIL import Image
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
ROLE = "Software Developer"
WEBSITE = "https://syntaxsurge.com/"
SELECTED_PROJECTS = ("mc-dental-station", "kaldi", "cliplore-ai")
PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 46
CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN
NAVY = colors.HexColor("#172B46")
BODY = colors.HexColor("#273749")
MUTED = colors.HexColor("#566576")
LINE = colors.HexColor("#D9E0E8")


def canonical_data():
    """Read the same TypeScript records used by the website, without duplicating them."""
    result = subprocess.run(
        [
            os.environ.get("RESUME_NODE", "node"),
            "--experimental-strip-types",
            "--input-type=module",
            "-e",
            'import { business } from "./src/data/business.ts"; '
            'import { projects, awards } from "./src/data/portfolio.ts"; '
            "process.stdout.write(JSON.stringify({ business, projects, awards }));",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout)


def plain(text):
    replacements = {
        "\u2011": "-",
        "\u2013": "-",
        "\u2014": " - ",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u00b7": ";",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return html.escape(text.replace(" ;", ";"))


def style(size=11, leading=15.5, bold=False, color=BODY):
    return ParagraphStyle(
        "resume",
        fontName="Helvetica-Bold" if bold else "Helvetica",
        fontSize=size,
        leading=leading,
        textColor=color,
        spaceBefore=0,
        spaceAfter=0,
    )


def paragraph(pdf, text, y, width=CONTENT_WIDTH, text_style=None, x=MARGIN):
    block = Paragraph(text, text_style or style())
    _, height = block.wrap(width, PAGE_HEIGHT)
    if y - height < 63:
        raise ValueError("Resume content exceeds its page. Revise spacing or copy.")
    block.drawOn(pdf, x, y - height)
    return y - height


def link(label, href):
    return f'<a href="{html.escape(href, quote=True)}" color="#172B46">{plain(label)}</a>'


def section(pdf, label, y):
    y = paragraph(pdf, plain(label.upper()), y, text_style=style(11, 15, True, NAVY))
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.65)
    pdf.line(MARGIN, y - 6, PAGE_WIDTH - MARGIN, y - 6)
    return y - 18


def footer(pdf, page, display_name):
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.65)
    pdf.line(MARGIN, 45, PAGE_WIDTH - MARGIN, 45)
    pdf.setFont("Helvetica", 8.5)
    pdf.setFillColor(MUTED)
    pdf.drawString(MARGIN, 29, display_name)
    pdf.drawRightString(PAGE_WIDTH - MARGIN, 29, f"{page} / 2")


def first_page(pdf, data):
    business = data["business"]
    display_name = business["founder"]["name"]
    projects = {project["id"]: project for project in data["projects"]}
    photo_size = 84
    header_width = CONTENT_WIDTH - photo_size - 20
    y = PAGE_HEIGHT - MARGIN
    name_size = 24
    if stringWidth(display_name, "Helvetica-Bold", name_size) > header_width:
        name_size = 22
    y = paragraph(pdf, plain(display_name), y, header_width, style(name_size, 29, True, NAVY))
    y -= 5
    y = paragraph(pdf, ROLE, y, header_width, style(12.5, 17, color=NAVY))
    y -= 5
    y = paragraph(pdf, f'Founder, {plain(business["legalName"])}', y, header_width, style(9.7, 14, color=MUTED))
    y -= 9
    contacts = (
        (f'Email: {business["email"]}', business["links"]["email"]),
        ("Portfolio: syntaxsurge.com", WEBSITE),
        ("GitHub: github.com/syntaxsurge", business["links"]["github"]),
        ("LinkedIn: linkedin.com/in/jade-laurence-empleo", business["links"]["linkedin"]),
    )
    for label, href in contacts:
        y = paragraph(pdf, link(label, href), y, header_width, style(9.5, 13.5))
    pdf.drawImage(
        str(ROOT / "public" / business["founder"]["portrait"]["src"].lstrip("/")),
        PAGE_WIDTH - MARGIN - photo_size,
        PAGE_HEIGHT - MARGIN - photo_size,
        width=photo_size,
        height=photo_size,
        preserveAspectRatio=True,
    )
    y -= 24

    y = section(pdf, "Profile", y)
    summary = (
        f'Software developer and founder of {business["legalName"]}. Builds business '
        "websites, web applications and AI workflows, with "
        f'{len(data["projects"])} portfolio projects and '
        f'{len(data["awards"])} hackathon recognitions.'
    )
    y = paragraph(pdf, plain(summary), y)
    y -= 22

    y = section(pdf, "Technical skills & focus", y)
    skills = (
        "<b>Languages & frameworks:</b> TypeScript, JavaScript, React, Next.js, Tailwind CSS.",
        "<b>Development:</b> Web applications, responsive interfaces, API integrations, and staff workflows.",
        f'<b>Services:</b> {plain(", ".join(service["title"] for service in business["services"]))}.',
    )
    for entry in skills:
        y = paragraph(pdf, entry, y, text_style=style(10.5, 14.5))
        y -= 5
    y -= 17

    y = section(pdf, "Selected projects", y)
    for project_id in SELECTED_PROJECTS:
        project = projects[project_id]
        primary = project["links"][0]["href"]
        y = paragraph(pdf, plain(project["title"]), y, text_style=style(12.5, 17, True, NAVY))
        y -= 3
        y = paragraph(pdf, link(primary.removeprefix("https://").rstrip("/"), primary), y, text_style=style(9.5, 13.5, color=MUTED))
        y -= 5
        y = paragraph(pdf, plain(project["description"]), y)
        y -= 5
        if project_id == "mc-dental-station":
            y = paragraph(
                pdf,
                "Appointment requests require final clinic staff confirmation; FAQ assistance uses approved English/Filipino information.",
                y,
                text_style=style(10.5, 14.5, color=MUTED),
            )
        else:
            y = paragraph(pdf, f'<b>Focus:</b> {plain(", ".join(project["tags"]))}', y, text_style=style(10.5, 14.5, color=MUTED))
        y -= 20
    footer(pdf, 1, display_name)
    pdf.showPage()


def recognition_page(pdf, data):
    display_name = data["business"]["founder"]["name"]
    projects = {project["id"]: project for project in data["projects"]}
    awards = sorted(data["awards"], key=lambda award: award["date"], reverse=True)
    y = PAGE_HEIGHT - MARGIN
    y = paragraph(pdf, plain(display_name), y, text_style=style(14, 19, True, NAVY))
    y = paragraph(pdf, ROLE, y - 3, text_style=style(10, 14, color=MUTED))
    y -= 21
    y = paragraph(pdf, "Recognition", y, text_style=style(21, 27, True, NAVY))
    earliest = min(award["date"] for award in awards)[:4]
    latest = max(award["date"] for award in awards)[:4]
    y = paragraph(pdf, f"{len(awards)} hackathon recognitions | {earliest} - {latest}", y - 5, text_style=style(10.5, 15, color=MUTED))
    y -= 23

    title_width = CONTENT_WIDTH - 72
    for award in awards:
        project = projects[award["projectId"]]
        year, month = award["date"].split("-")
        pdf.setFont("Helvetica", 9.5)
        pdf.setFillColor(MUTED)
        pdf.drawRightString(PAGE_WIDTH - MARGIN, y - 11, f"{calendar.month_abbr[int(month)]} {year}")
        title = f'{project["title"]} - {award["title"]}'
        y = paragraph(pdf, plain(title), y, title_width, style(10.5, 14.5, True, NAVY))
        event = award["event"]
        if award.get("prize"):
            event += f' | Prize: {award["prize"]}'
        y = paragraph(pdf, plain(event), y - 2, CONTENT_WIDTH, style(10.3, 14, color=MUTED))
        y -= 13
    footer(pdf, 2, display_name)
    pdf.showPage()


def write_pdf(path, data):
    display_name = data["business"]["founder"]["name"]
    pdf = canvas.Canvas(str(path), pagesize=A4, pageCompression=1, invariant=True)
    pdf.setTitle(f"{display_name} - Resume")
    pdf.setAuthor(display_name)
    pdf.setSubject(ROLE)
    pdf.setKeywords("Software Developer, Product Builder, TypeScript, React, Next.js")
    first_page(pdf, data)
    recognition_page(pdf, data)
    pdf.save()


def render_previews(pdf_path, staging, metadata):
    reader = PdfReader(str(pdf_path))
    if len(reader.pages) != 2 or len(metadata) != 2:
        raise ValueError("The resume and its preview require exactly two pages.")
    prefix = staging / "resume-page"
    subprocess.run(
        [
            os.environ.get("RESUME_PDFTOPPM", "pdftoppm"),
            "-f", "1", "-l", "2",
            "-scale-to-x", str(metadata[0]["width"]), "-scale-to-y", "-1",
            "-png", str(pdf_path), str(prefix),
        ],
        capture_output=True,
        text=True,
        check=True,
        timeout=120,
    )
    previews = []
    for page in (1, 2):
        output = staging / f"resume-page-{page}.webp"
        with Image.open(staging / f"resume-page-{page}.png") as source:
            expected = metadata[page - 1]
            if source.size != (expected["width"], expected["height"]):
                raise ValueError("The rendered preview does not have the expected page dimensions.")
            source.convert("RGB").save(output, "WEBP", quality=88, method=6)
        with Image.open(output) as preview:
            preview.verify()
        previews.append(output)
    return previews


def main():
    data = canonical_data()
    business = data["business"]
    output = ROOT / "public" / business["resumeHref"].lstrip("/")
    preview_outputs = [ROOT / "public" / page["src"].lstrip("/") for page in business["resumePreview"]]
    staging_root = ROOT / ".local"
    staging_root.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="resume-build-", dir=staging_root) as temporary:
        staging = Path(temporary)
        staged_pdf = staging / output.name
        write_pdf(staged_pdf, data)
        previews = render_previews(staged_pdf, staging, business["resumePreview"])
        replacements = [(staged_pdf, output), *zip(previews, preview_outputs)]
        for _, destination in replacements:
            destination.parent.mkdir(parents=True, exist_ok=True)
        # Publish only a successfully rendered set; each replacement is atomic.
        for source, destination in replacements:
            os.replace(source, destination)
    print(f"Created {output}: 2 pages, {len(data['awards'])} recognitions")
    for path in preview_outputs:
        with Image.open(path) as preview:
            print(f"Created {path}: {preview.width} x {preview.height}, {path.stat().st_size} bytes")


if __name__ == "__main__":
    main()
