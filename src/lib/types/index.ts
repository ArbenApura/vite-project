// -- TYPES -- //

export type Todo = {
	collectionId: string;
	collectionName: string;
	id: string;
	description: string;
	isCompleted: boolean;
	created: string;
	updated: string;
};

export type TodoFilter = 'all' | 'completed' | 'ongoing';