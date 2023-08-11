
import 'cypress-file-upload';
import XLSX from 'xlsx';

describe('Read data from Excel file', () => {
  it('should read data from an Excel file', () => {
    cy.visit('http://20.22.247.155/auth/login');

    // Assuming there's an input element with type="file" to upload the Excel file
    cy.get('input[type="file"]').attachFile('data.xlsx', { subjectType: 'input' });

    // Wait for the file to be uploaded and processed
    cy.wait(3000); // Adjust the waiting time based on the processing time on your website

    // Read the uploaded Excel file
    cy.fixture('data.xlsx', 'binary').then(fileContent => {
      const workbook = XLSX.read(fileContent, { type: 'binary' });

      // Assuming your Excel file has a single sheet with the name 'Sheet1'
      const sheetName = 'Sheet1';
      const worksheet = workbook.Sheets[TestData.xlsx];

      // Get the cell values (modify as per your Excel structure)
      const cellA1Value = worksheet['A1'] ? worksheet['A1'].v : null;
      const cellB2Value = worksheet['B2'] ? worksheet['B2'].v : null;

      // Perform assertions based on the Excel data
      expect(cellA1Value).to.equal('Some data');
      expect(cellB2Value).to.equal('Another value');
    });
  });
});
