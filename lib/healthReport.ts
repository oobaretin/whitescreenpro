/** Monitor Health wizard — report text and PDF export. */

export const HEALTH_CHECK_STEPS = [
  "Dead Pixel Hunt",
  "Backlight Bleed Test",
  "Uniformity (Grey) Check",
  "Ghosting / Motion Blur",
] as const;

export interface HealthReportData {
  completedAt: Date;
  steps: readonly string[];
  userAgent?: string;
}

export function formatHealthReportText(data: HealthReportData): string {
  const date = data.completedAt.toLocaleString();
  const lines = [
    "WhiteScreen Tools — Monitor Health Report",
    "=========================================",
    "",
    `Completed: ${date}`,
    "",
    "Steps performed:",
    ...data.steps.map((step, i) => `  ${i + 1}. ${step} — completed`),
    "",
    "Notes:",
    "  Self-guided visual check only. Not a lab certification.",
    "  Record any dead pixels, bleed, uniformity issues, or ghosting observed.",
    "",
    "https://whitescreentools.com",
  ];
  return lines.join("\n");
}

/** Generates and downloads a PDF summary of the health check. */
export async function downloadHealthReportPdf(data: HealthReportData): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const addLine = (text: string, size = 11, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const wrapped = doc.splitTextToSize(text, maxWidth);
    for (const line of wrapped) {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += size * 1.35;
    }
  };

  addLine("Monitor Health Report", 18, true);
  y += 4;
  addLine("WhiteScreen Tools — self-guided display check", 10);
  y += 8;
  addLine(`Completed: ${data.completedAt.toLocaleString()}`, 11);
  y += 12;
  addLine("Steps performed", 13, true);
  data.steps.forEach((step, i) => {
    addLine(`${i + 1}. ${step} — completed`, 11);
  });
  y += 12;
  addLine("Observations (fill in manually)", 13, true);
  addLine("Dead pixels: _______________________________________________", 11);
  y += 4;
  addLine("Backlight bleed: ___________________________________________", 11);
  y += 4;
  addLine("Uniformity: ________________________________________________", 11);
  y += 4;
  addLine("Ghosting / motion blur: ____________________________________", 11);
  y += 12;
  addLine(
    "Disclaimer: This is a self-guided visual check, not professional calibration or lab certification.",
    9,
  );
  if (data.userAgent) {
    y += 8;
    addLine(`Browser: ${data.userAgent}`, 8);
  }

  const stamp = data.completedAt.toISOString().slice(0, 10);
  doc.save(`monitor-health-report-${stamp}.pdf`);
}
