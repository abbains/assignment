import { TestBed, inject } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('a table component', () => {
	let component: TableComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TableComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TableComponent], (TableComponent) => {
		component = TableComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});