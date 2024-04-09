export class Page {
	total_objects: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any[];
	results: number;
	page_number: number;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(data: any[], total_objects: number, results: number, page_number: number) {
		this.data = data || [];
		this.total_objects = total_objects || 0;
		this.results = results || 0;
		this.page_number = page_number;
	}

	get total_pages() {
		return Math.ceil(this.total_objects / this.results);
	}

	get has_next_page() {
		return this.page_number > 0 && this.page_number < this.total_pages;
	}

	get has_prev_page() {
		return this.page_number > 1;
	}

	get next_page() {
		return this.has_next_page ? this.page_number + 1 : null;
	}

	get prev_page() {
		return this.has_prev_page ? this.page_number - 1 : null;
	}

	toJSON() {
		return {
			data: this.data,
			prev_page: this.prev_page,
			has_next_page: this.has_next_page,
			has_prev_page: this.has_prev_page,
			next_page: this.next_page
		};
	}
}
