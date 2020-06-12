/**
 * WordPress dependencies.
 */
const { apiFetch } = wp;
const { registerStore } = wp.data;

const DEFAULT_STATE = {
	user: {},
	content: '',
	blocks: [],
	inserting: false,
	created: {},
};

function * insertActivity( activity ) {
	let inserting = true, created;

	yield { type: 'CREATE_START', inserting, activity };

	try {
		created = yield actions.createFromAPI( '/buddypress/v1/activity', activity );

	} catch ( error ) {
		created = {
			id: uniqueId(),
			error: error.message,
		};
	}

	inserting = false;

	yield { type: 'CREATE_END', inserting, created };
}

const actions = {
	getCurrentUser( user ) {
		return {
			type: 'GET_CURRENT_USER',
			user,
		};
	},

	fetchFromAPI( path, parse ) {
		return {
			type: 'FETCH_FROM_API',
			path,
			parse,
		};
	},

	insertActivity,
	createFromAPI( path, data ) {
		return {
			type: 'CREATE_FROM_API',
			path,
			data,
		};
	},

	updateContent( content, blocks ) {
		return {
			type: 'UPDATE_CONTENT',
			content,
			blocks,
		};
	},
};

const store = registerStore( 'bp/activity', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'GET_CURRENT_USER':
				return {
					...state,
					user: action.user,
				};

			case 'CREATE_START':
				return {
					...state,
					inserting: action.inserting,
					created: action.created,
				};

			case 'CREATE_END':
				return {
					...state,
					inserting: action.inserting,
					created: action.created,
					content: '',
					blocks: [],
				};

			case 'UPDATE_CONTENT':
				return {
					...state,
					content: action.content,
					blocks: action.blocks, ...state.blocks,
				};
		}

		return state;
	},

	actions,

	selectors: {
		getCurrentUser( state ) {
			const { user } = state;
			return user;
		},

		getContent( state ) {
			const { content } = state;
			return content;
		},

		getBlocks( state ) {
			const { blocks } = state;
			return blocks;
		},

		isInsertingActivity( state ) {
			const { inserting } = state;
			return inserting;
		}
	},

	controls: {
		FETCH_FROM_API( action ) {
			return apiFetch( { path: action.path, parse: action.parse } );
		},

		CREATE_FROM_API( action ) {
			return apiFetch( { path: action.path, method: 'POST', data: action.data } );
		},
	},

	resolvers: {
		* getCurrentUser() {
			const path = '/buddypress/v1/members/me?context=edit';
			const user = yield actions.fetchFromAPI( path, true );
			yield actions.getCurrentUser( user );
		},
	},
} );
