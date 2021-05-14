/**
 * External dependencies.
 */
const {
	assignIn,
	uniqueId,
} = lodash;

/**
 * Internal dependencies.
 */
import { TYPES as types } from './action-types';

/**
 * Returns an action object used to set an activity date.
 *
 * @param {array} list The active components.
 * @return {Object} Object for action.
 */
 export function setActiveComponents( list ) {
	return {
		type: types.SET_ACTIVE_COMPONENTS,
		list,
	};
}

/**
 * Resolver for creating an activity.
 */
export function* insertActivity( activity ) {
	let inserting = true, created;

	yield { type: types.CREATE_START, inserting, activity };

	try {
		created = yield createFromAPI( '/buddypress/v1/activity', activity );

	} catch ( error ) {
		created = assignIn( {
			id: uniqueId(),
			error: error.message,
		}, activity );

		yield { type: types.ADD_ERROR, created };
	}

	inserting = false;

	yield { type: types.CREATE_END, inserting, created };
}

/**
 * Returns an action object used to get the current user.
 *
 * @param {Object} user Current user object.
 * @return {Object} Object for action.
 */
export function getCurrentUser( user ) {
	return {
		type: types.GET_CURRENT_USER,
		user,
	};
}

/**
 * Returns an action object used to get the user's groups.
 *
 * @param {Array} groups An array of groups.
 * @return {Object} Object for action.
 */
export function getUserGroups( groups ) {
	return {
		type: types.GET_USER_GROUPS,
		groups,
	};
}

/**
 * Returns an action object used to fetch something from the API.
 *
 * @param {string} path Endpoint path.
 * @param {boolean} parse Should we parse the request.
 * @return {Object} Object for action.
 */
export function fetchFromAPI( path, parse ) {
	return {
		type: types.FETCH_FROM_API,
		path,
		parse,
	};
}

/**
 * Returns an action object used to create an object via the API.
 *
 * @param {string} path Endpoint path.
 * @param {Object} data The data to be created.
 * @return {Object} Object for action.
 */
export function createFromAPI( path, data ) {
	return {
		type: types.CREATE_FROM_API,
		path,
		data,
	};
}

/**
 * Returns an action object used to update activity content.
 *
 * @param {string} content Activity content.
 * @param {Array} blocks Array of blocks.
 * @return {Object} Object for action.
 */
export function updateContent( content, blocks ) {
	return {
		type: types.UPDATE_CONTENT,
		content,
		blocks,
	};
}

/**
 * Returns an action object used to reset the activity recently posted.
 *
 * @return {Object} Object for action.
 */
export function resetJustPostedActivity() {
	return {
		type: types.RESET_CREATED,
	};
}

/**
 * Returns an action object used to toggle the sidebar visibility.
 *
 * @param {boolean} visibility The visibility status.
 * @return {Object} Object for action.
 */
export function toggleSidebarVisibility( visibility ) {
	return {
		type: types.UPDATE_SIDEBAR_VISIBILITY,
		visibility,
	};
}

/**
 * Returns an action object used to set an activity date.
 *
 * @param {string} date An activity date.
 * @return {Object} Object for action.
 */
export function setActivityDate( date ) {
	return {
		type: types.SET_ACTIVITY_DATE,
		date,
	};
}

/**
 * Returns an action object used to set a group for an activity.
 *
 * @param {integer} groupId A group ID.
 * @return {Object} Object for action.
 */
export function setActivityGroup( groupId ) {
	return {
		type: types.SET_ACTIVITY_GROUP,
		groupId,
	};
}

/**
 * Returns an action object used to reset activity group.
 *
 * @return {Object} Object for action.
 */
export function resetActivityGroup() {
	return {
		type: types.RESET_ACTIVITY_GROUP,
	};
}
