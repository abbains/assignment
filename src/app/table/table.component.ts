import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-table',
	templateUrl: 'table.component.html',
	styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnChanges {

	@Input() data: any;
	@Output() pageChanged: EventEmitter<any> = new EventEmitter<any>();

	items: any[] = [];
	pageSize: number = 10;
	currentPageNumber: number = 1;
	defaultNoOfPagesToDisplay: number = 5;
	totalRecordsCount: any;

	ngOnInit() { 
		this.pageChanged.emit({
			start: (this.currentPageNumber - 1) * this.pageSize,
			end: ((this.currentPageNumber * this.pageSize) - 1)
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log('changes => ', changes);
		if(changes && changes.data && changes.data.currentValue) {
			this.items = this.data.results;
			this.totalRecordsCount = this.data.count;
		}
	}

	page($event: any) {
		console.log('$event => ', $event);
		this.currentPageNumber = $event;
		this.pageChanged.emit({
			start: (this.currentPageNumber - 1) * this.pageSize,
			end: ((this.currentPageNumber * this.pageSize) - 1)
		});
	}
}