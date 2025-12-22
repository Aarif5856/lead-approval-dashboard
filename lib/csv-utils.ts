import { Lead, LeadStatus } from '@/types/lead';

export function parseCSV(csvText: string): Lead[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

  return lines.slice(1).map((line, index) => {
    const values = parseCSVLine(line);
    const lead: Lead = {
      id: `lead-${index + 1}`,
      name: values[headers.indexOf('name')] || '',
      company: values[headers.indexOf('company')] || '',
      personalizedOpener: values[headers.indexOf('personalizedOpener')] || '',
      blogTitle: values[headers.indexOf('blogResearch')] || '',
      website: values[headers.indexOf('website')] || '',
      status: (['Review', 'Approved', 'Rejected'].includes(values[headers.indexOf('status')]) ? values[headers.indexOf('status')] : 'Review') as LeadStatus,
    };
    return lead;
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function generateCSV(leads: Lead[]): string {
  const headers = ['id', 'name', 'company', 'website', 'personalizedOpener', 'blogTitle', 'status'];
  const headerRow = headers.join(',');

  const dataRows = leads.map(lead => {
    return headers.map(header => {
      const value = lead[header as keyof Lead];
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

export function downloadCSV(leads: Lead[], filename: string = 'approved-leads.csv'): void {
  const csv = generateCSV(leads);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

