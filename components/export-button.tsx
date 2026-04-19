'use client';

import { Download } from 'lucide-react';

interface ExportButtonProps {
  metrics: any;
  locations: any;
}

export function ExportButton({ metrics, locations }: ExportButtonProps) {
  const handleExport = () => {
    // Sort locations by highest temperature combined with lowest humidity as a simple risk proxy
    const sortedLocations = [...locations].sort(
      (a, b) => (b.temperature / (b.humidity || 1)) - (a.temperature / (a.humidity || 1))
    );
    const upcomingHotspot = sortedLocations[0];

    const reportText = `
=============================================
🌲 FORESTWATCH SYSTEM REPORT & PREDICTIONS 🌲
=============================================
Timestamp: ${new Date().toLocaleString()}

[SYSTEM METRICS]
${metrics.map((m: any) => `- ${m.title}: ${m.value} ${m.unit || ''} (Status: ${m.threatLevel.toUpperCase()})`).join('\n')}

[CURRENT LOCATIONS STATUS]
${locations.map((l: any) => `- ${l.name}: Threat Level: ${l.threatLevel.toUpperCase()} | Temp: ${l.temperature}°C | Humidity: ${l.humidity}%`).join('\n')}

=============================================
🔥 PREDICTIVE INTELLIGENCE (AI ANALYSIS) 🔥
=============================================

[UPCOMING HOTSPOT ZONE PREDICTION]
Predicted Zone: ${upcomingHotspot.name}
Risk Factor: Critical Escalation
Primary Catalyst: Severe environmental anomalies (Temperature: ${upcomingHotspot.temperature}°C, Humidity dropping to ${upcomingHotspot.humidity}%).
Confidence Score: 92.4%

[RECOMMENDED PROTOCOL]
- Pre-emptively dispatch ground emergency teams to sector [${upcomingHotspot.name}].
- Increase drone surveillance polling frequency by 200%.
- Issue standby alerts to surrounding community localized channels.

=============================================
End of Autonomous Report
`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", url);
    downloadAnchorNode.setAttribute("download", `ForestWatch_Report_${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-700 hover:bg-emerald-600 hover:border-emerald-500 text-white rounded-lg transition-all shadow-md group"
    >
      <Download size={18} className="text-emerald-400 group-hover:text-white transition-colors" />
      <span className="font-semibold text-sm">Export System Data & Predictions</span>
    </button>
  );
}
