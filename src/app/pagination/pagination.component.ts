import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: 'pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit , OnChanges {

	@Input() pageSize: number;
	@Input() dataLength: number;
	@Input() pages: number;
	@Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

	pageStart: number = 1;
	pageNumber: number = 0;
	currentIndex: number = 1;
	pagesIndex: Array<number>;

	ngOnInit() {
		this.getPageInfo();
	}

	ngOnChanges(changes: SimpleChanges) {
		if(changes) {
			if(changes.dataLength) {
				this.pageStart = 1;
				this.pageNumber = 0;
				this.currentIndex = 1;
				this.getPageInfo();
			}
		}
	}

	getPageInfo() {
		this.pageNumber = parseInt("" + (this.dataLength / this.pageSize));
		if (this.dataLength % this.pageSize != 0) {
			this.pageNumber++;
		}

		if (this.pageNumber < this.pages) {
			this.pages = this.pageNumber;
		}
		this.refreshItems();
	}

	fillArray(): any {
		var obj = new Array();
		for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
			obj.push(index);
		}
		return obj;
	}

	prevPage() {
		if (this.currentIndex > 1) {
			this.currentIndex--;
			this.pageChange.emit(this.currentIndex);
		}
		if (this.currentIndex < this.pageStart) {
			this.pageStart = this.currentIndex;
		}
		this.refreshItems();
	}

	nextPage() {
		if (this.currentIndex < this.pageNumber) {
			this.currentIndex++;
			this.pageChange.emit(this.currentIndex);
		}
		if (this.currentIndex >= (this.pageStart + this.pages)) {
			this.pageStart = this.currentIndex - this.pages + 1;
		}

		this.refreshItems();
	}

	gotoStartPage() {
		this.pageStart = 1;
		this.setPage(this.pageStart)
	}

	gotoEndPage() {
		this.pageStart = this.pageNumber;
		this.setPage(this.pageNumber)
	}

	refreshItems() {
		this.pagesIndex = this.fillArray();
	}

	setPage(index: number) {
		this.currentIndex = index;
		this.pageChange.emit(this.currentIndex);
		this.refreshItems();
	}
}