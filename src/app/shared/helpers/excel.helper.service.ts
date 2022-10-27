import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { TableHeader } from '../modules/table/models';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  private readonly fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private readonly fileExtension = '.xlsx';
  private readonly fileName = `Records_${new Date().toLocaleString(undefined, { hourCycle: 'h23' })}`;

  constructor(private readonly translateService: TranslateService) {}

  exportExcel(records: { [key: string]: any }[], headerList: TableHeader<any>[]) {
    if (!records || records.length === 0) {
      return;
    }
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1', { properties: { tabColor: { argb: 'FFC0000' } } });
    const headers: string[] = [];
    headerList.forEach((header) => {
      if (header.field && header.label) {
        const label = this.translateService.instant(header.label);
        headers.push(label);
      }
    });
    const headerRow = worksheet.addRow(headers);

    headerRow.eachCell((cell) => {
      cell.font = {
        name: 'Tahoma',
        family: 2,
        bold: true,
        size: 8.5,
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D7D7D7' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'A9A9A9' } },
        left: { style: 'thin', color: { argb: 'A9A9A9' } },
        bottom: { style: 'thin', color: { argb: 'A9A9A9' } },
      };
    });

    worksheet.columns = [];
    let i = 0;
    headerList.forEach((header) => {
      if (header.field && header.label) {
        const width = header.width ? header.width : '200px';
        const numberStr = width!.slice(0, width!.indexOf('px'));
        const number = parseFloat(numberStr);
        worksheet.getColumn(i + 1).width = number / 7;
        i++;
      }
    });

    for (const row of records) {
      const temp = [];
      for (const key of headerList) {
        if (key.field && key.label) {
          let data = row[key.field!];
          if (data instanceof Date) {
            const datePipe = new DatePipe('en-US');
            data = datePipe.transform(data, 'dd/MM/yyyy');
          }
          temp.push(data);
        }
      }
      worksheet.addRow(temp);
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        row.font = {
          name: 'Tahoma',
          family: 2,
          bold: false,
          size: 10,
        };
        row.height = 15.75;
      });
      headerRow.font.bold = true;
    }
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: this.fileType });
      FileSaver.saveAs(blob, this.fileName + this.fileExtension);
    });
  }
}
