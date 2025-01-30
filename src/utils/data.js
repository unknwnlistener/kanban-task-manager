//used to generate new id
export const id = () => Math.random().toString(36).substring(2, 10);

export const data = {
	boards: [
		{
			id: id(),
			name: "Default",
			columns: [
				{
					id: id(),
					name: "Now",
					tasks: [
						{
							id: id(),
							title: "Create tasks in columns",
							status: "Now",
						},
						{
							id: id(),
							title: "Add multiple tasks to the same column",
							status: "Now",
						},
					],
				},
				{
					id: id(),
					name: "Next",
					tasks: [],
				},
				{
					id: id(),
					name: "Later",
					tasks: [],
				},
			],
		},
		{
			id: id(),
			name: "New Board",
			columns: [
				{
					id: id(),
					name: "Hello",
					tasks: [
						{
							id: id(),
							title: "Create tasks in columns",
							status: "Hello",
						},
						{
							id: id(),
							title: "Add multiple tasks to the same column",
							status: "Hello",
						},
					],
				},
				{
					id: id(),
					name: "Goodbye",
					tasks: [],
				},
				{
					id: id(),
					name: "Later",
					tasks: [],
				},
			],
		},
	],
};
