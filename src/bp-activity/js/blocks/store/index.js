/**
 * WordPress dependencies.
 */
const { apiFetch } = wp;
const { registerStore } = wp.data;

/**
 * External dependencies
 */
const { assignIn, uniqueId, find } = lodash;

const DEFAULT_STATE = {
	user: {},
	content: '',
	date: '',
	blocks: [],
	inserting: false,
	created: {},
	isSidebarVisible: false,
	groups: [],
	groupId: 0,
};

function * insertActivity( activity ) {
	let inserting = true, created;

	yield { type: 'CREATE_START', inserting, activity };

	try {
		created = yield actions.createFromAPI( '/buddypress/v1/activity', activity );

	} catch ( error ) {
		created = assignIn( {
			id: uniqueId(),
			error: error.message,
		}, activity );

		yield { type: 'ADD_ERROR', created };
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

	getUserGroups( groups ) {
		return {
			type: 'GET_USER_GROUPS',
			groups,
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

	resetJustPostedActivity() {
		return {
			type: 'RESET_CREATED',
		};
	},

	toggleSidebarVisibility( visibility ) {
		return {
			type: 'UPDATE_SIDEBAR_VISIBILITY',
			visibility,
		};
	},

	setActivityDate( date ) {
		return {
			type: 'SET_ACTIVITY_DATE',
			date,
		};
	},

	setActivityGroup( groupId ) {
		return {
			type: 'SET_ACTIVITY_GROUP',
			groupId,
		};
	},

	resetActivityGroup() {
		return {
			type: 'RESET_ACTIVITY_GROUP',
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

			case 'GET_USER_GROUPS':
				return {
					...state,
					groups: action.groups,
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
					created: action.created[0],
					content: '',
					date: '',
					groupId: 0,
					blocks: [],
				};

			case 'ADD_ERROR':
				return {
					...state,
					created: { ...action.created, blocks: state.blocks },
				};

			case 'UPDATE_CONTENT':
				return {
					...state,
					content: action.content,
					blocks: action.blocks, ...state.blocks,
				};

			case 'SET_ACTIVITY_DATE':
				return {
					...state,
					date: action.date,
				};

			case 'SET_ACTIVITY_GROUP':
				return {
					...state,
					groupId: action.groupId,
				};

			case 'RESET_ACTIVITY_GROUP':
				return {
					...state,
					groupId: 0,
				};

			case 'RESET_CREATED':
				return {
					...state,
					created: {},
				};

			case 'UPDATE_SIDEBAR_VISIBILITY':
				return {
					...state,
					isSidebarVisible: action.visibility,
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

		getUserGroups( state ) {
			const { groups } = state;
			return groups;
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
		},

		getJustPostedActivity( state ) {
			const { created } = state;
			return created;
		},

		isSidebarVisible( state ) {
			const { isSidebarVisible } = state;
			return  isSidebarVisible;
		},

		getActivityDate( state ) {
			const { date } = state;
			return date;
		},

		getActivityGroup( state ) {
			const { groups, groupId } = state;
			return find( groups, { id: groupId } );
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

		* getUserGroups() {
			const path = '/buddypress/v1/groups/me?context=edit';
			const groups = yield actions.fetchFromAPI( path, true );
			yield actions.getUserGroups( groups );
		},
	},
} );
