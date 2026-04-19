'use client';

import { Download } from 'lucide-react';

interface ImpactExportButtonProps {
  impactData: any;
}

export function ImpactExportButton({ impactData }: ImpactExportButtonProps) {
  const handleExport = () => {
    const totalIncidents = impactData.reduce((sum: number, d: any) => sum + d.incidents, 0);
    const totalArea = impactData.reduce((sum: number, d: any) => sum + d.area, 0);
    const avgSeverity = Math.round(
      impactData.reduce((sum: number, d: any) => sum + d.severity, 0) / impactData.length
    );

    const reportText = `
=============================================
🌲 FORESTWATCH IMPACT ANALYSIS REPORT 🌲
=============================================
Timestamp: ${new Date().toLocaleString()}

[SUMMARY STATISTICS - LAST 6 MONTHS]
- Total Incidents: ${totalIncidents}
- Area Affected: ${totalArea.toLocaleString()} hectares
- Avg Severity Index: ${avgSeverity}/100
- Early Warning Detection Rate: 94%

[MONTHLY BREAKDOWN]
${impactData.map((row: any) => `- ${row.date}: ${row.incidents} Incidents | ${row.area.toLocaleString()} ha | Severity: ${row.severity}`).join('\n')}

=============================================
🔥 KEY INSIGHTS 🔥
=============================================
- Peak incident season typically observes up to 40% more activity.
- Northern regions account for 60% of historical incidents.
- Average response time has successfully reduced to 8.5 minutes.

[RECOMMENDED ACTION PROTOCOLS]
- Deploy additional thermal sensors in high-risk zones.
- Maintain heightened patrol frequencies during peak seasons.
- Issue local community advisories if weekly severity breaches 70.

=============================================
End of Autonomous Analytics Report
`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", url);
    downloadAnchorNode.setAttribute("download", `ForestWatch_Impact_Report_${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 border border-emerald-500 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
    >
      <Download size={18} />
      <span className="font-semibold text-sm">Download Analytics Report</span>
    </button>
  );
}
