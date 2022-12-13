import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-table
      [records]="vm.words"
      [total]="vm.total"
      [isLoading]="vm.isLoading"
      [headers]="headers"
      [isSelectable]="false"
      clientPagination="false"
    >
      <ng-template appTableCell="speak" let-rowIndex="rowIndex" let-value> </ng-template>
      <ng-template appTableCell="actions" let-rowIndex="rowIndex" let-value>
        <div class="actions">
          <span
            nz-tooltip
            [nzTooltipTitle]="'ACTION.UPDATE' | translate"
            nz-icon
            nzType="edit"
            nzTheme="fill"
            (click)="onEdit(value)"
          ></span>

          <span
            nz-tooltip
            [nzTooltipTitle]="'ACTION.DELETE' | translate"
            nz-popconfirm
            [nzPopconfirmTitle]="'CONFIRM_DELETE' | translate"
            nzOkText="OK"
            nzCancelText="Cancel"
            (nzOnConfirm)="onDelete(value)"
            (nzOnCancel)="onCancel()"
            class="delete-button"
            nz-icon
            nzType="delete"
            nzTheme="fill"
          ></span>
        </div>
      </ng-template>
      <ng-template appTableCell="display" let-rowIndex="rowIndex" let-value>
        <div class="display">
          <p style="margin-top: 0.5rem; color: #bf616a; font-family: MyFont; font-size: 18px;">{{ value }}</p>
          <span nz-icon nzType="sound" nzTheme="fill" (click)="onSpeak(value)"></span>
        </div>
      </ng-template>
      <ng-template appTableCell="lowercase" let-rowIndex="rowIndex" let-value>
        {{ value | lowercase }}
      </ng-template>
      <ng-template appTableCell="titlecase" let-rowIndex="rowIndex" let-value>
        {{ value | titlecase }}
      </ng-template>
      <ng-template appTableCell="hsk" let-rowIndex="rowIndex" let-value>
        <ng-container [ngSwitch]="value">
          <ng-container *ngSwitchCase="'hsk1'">
            <nz-tag [nzColor]="'cyan'">HSK 1</nz-tag>
          </ng-container>
          <ng-container *ngSwitchCase="'hsk2'">
            <nz-tag [nzColor]="'blue'">HSK 2</nz-tag>
          </ng-container>
          <ng-container *ngSwitchCase="'hsk3'">
            <nz-tag [nzColor]="'geekblue'">HSK 3</nz-tag>
          </ng-container>
          <ng-container *ngSwitchCase="'hsk4'">
            <nz-tag [nzColor]="'purple'">HSK 4</nz-tag>
          </ng-container>
          <ng-container *ngSwitchCase="'hsk5'">
            <nz-tag [nzColor]="'volcano'">HSK 5</nz-tag>
          </ng-container>
          <ng-container *ngSwitchCase="'hsk6'">
            <nz-tag [nzColor]="'red'">HSK 6</nz-tag>
          </ng-container>
          <ng-container *ngSwitchCase="'hsk79'">
            <nz-tag [nzColor]="'magenta'">HSK 7+</nz-tag>
          </ng-container>
          <ng-container *ngSwitchCase="'z---'">
            <nz-tag>---------</nz-tag>
          </ng-container>
        </ng-container>
      </ng-template>
      <ng-template appTableCell="date" let-rowIndex="rowIndex" let-value>
        <div>{{ value | date : 'hh:mm:ss dd/MM/yyyy' }}</div>
      </ng-template>
      <ng-template appTableCell="ellipsis" let-rowIndex="rowIndex" let-value>
        <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ value }}</div>
      </ng-template>
    </app-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleTable {
  constructor() {}
}
