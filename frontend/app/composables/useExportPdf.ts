import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const useExportPdf = () => {
  const exportTelemetryReport = (
    telemetryData: any[],
    analyticsData: any[],
    range: string
  ) => {
    const doc = new jsPDF()

    // 1. Header Laporan
    doc.setFontSize(18)
    doc.setTextColor(2, 132, 199) // Sky 600
    doc.text('VASTPOINT — Operational Center', 14, 20)

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text('Telemetry & Analytics Operational Report', 14, 26)
    doc.text(`Generated: ${new Date().toLocaleString('id-ID')} | Filter: ${range.toUpperCase()}`, 14, 31)

    // 2. Ringkasan DuckDB Analytics Table
    doc.setFontSize(13)
    doc.setTextColor(15, 23, 42)
    doc.text('1. DuckDB Analytics Aggregates', 14, 42)

    const analyticsRows = analyticsData.map((item) => [
      item.sensor_id,
      `${item.avg_water_level} m`,
      `${item.max_water_level} m`,
      item.total_records,
    ])

    autoTable(doc, {
      startY: 46,
      head: [['Sensor ID', 'Avg Level', 'Max Level', 'Total Records']],
      body: analyticsRows,
      theme: 'grid',
      headStyles: { fillColor: [2, 132, 199] },
    })

    // 3. Live Telemetry Data Feed Table
    const finalY = (doc as any).lastAutoTable.finalY || 80
    doc.setFontSize(13)
    doc.text('2. Recent Telemetry Feed (Latest 10 Logs)', 14, finalY + 12)

    const telemetryRows = telemetryData.slice(-10).map((item) => [
      new Date(item.timestamp).toLocaleTimeString('id-ID'),
      item.sensor_id,
      `${item.water_level} m`,
      item.water_level > 4.5 ? 'CRITICAL' : 'NORMAL',
    ])

    autoTable(doc, {
      startY: finalY + 16,
      head: [['Time', 'Sensor ID', 'Water Level', 'Status']],
      body: telemetryRows,
      theme: 'striped',
      headStyles: { fillColor: [51, 65, 85] },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 3) {
          if (data.cell.raw === 'CRITICAL') {
            data.cell.styles.textColor = [225, 29, 72] // Red text
            data.cell.styles.fontStyle = 'bold'
          }
        }
      },
    })

    // 4. Save PDF File
    doc.save(`vastpoint-report-${Date.now()}.pdf`)
  }

  return { exportTelemetryReport }
}
