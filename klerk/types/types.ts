export type Essences = [
	{ slug: string },
	{ leads: string },
	{ contacts: string },
	{ companies: string }
];

export interface CreatedEssence {
	id: number;
	request_id: string;
	essence: string;
	link: string;
}

export interface ServerResponse {
	id: number;
	essence: string;
	request_id: string;
	_links: {
		self: {
			href: string;
		};
	};
}
