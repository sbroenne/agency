export const excelMcpReferenceSkills = [
  {
    name: 'readWorkbookRange',
    operation: 'read',
    target: 'worksheet-range',
    description: 'Read workbook values from a worksheet range.',
  },
  {
    name: 'writeWorkbookRange',
    operation: 'write',
    target: 'worksheet-range',
    description: 'Write workbook values into a worksheet range.',
  },
  {
    name: 'runWorkbookFormula',
    operation: 'calculate',
    target: 'formula',
    description: 'Run an Excel formula and capture the result.',
  },
  {
    name: 'createPivotTable',
    operation: 'transform',
    target: 'pivot-table',
    description: 'Create or update a pivot table from workbook data.',
  },
  {
    name: 'refreshWorkbook',
    operation: 'refresh',
    target: 'workbook',
    description: 'Refresh workbook calculations and linked data.',
  },
];
