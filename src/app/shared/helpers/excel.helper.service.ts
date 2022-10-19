import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  private readonly fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private readonly fileExtension = '.xlsx';

  constructor() {}

  exportExcel(records: { [key: string]: any }[]) {
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(records);
    const workBook: XLSX.WorkBook = { Sheets: { data: workSheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    const fileName = new Date().toLocaleString(undefined, { hour12: false });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}
