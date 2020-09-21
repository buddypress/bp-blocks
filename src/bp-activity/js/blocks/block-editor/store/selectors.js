/**
 * External dependencies.
 */
const {
	find,
} = lodash;

/**
 * Retrieves the current user object.
 *
 * @param {Object} state The current state.
 * @return {Object} The data to return.
 */
export const getCurrentUser = ( state ) => state.user || {};

/**
 * Retrieves user's groups.
 *
 * @param {Object} state The current state.
 * @return {Array} Array of user's groups.
 */
export const getUserGroups = ( state ) => state.groups || [];

/**
 * Retrieves the content.
 *
 * @param {Object} state The current state.
 * @return {string} The data to return.
 */
export const getContent = ( state ) => state.content || '';

/**
 * Retrieves blocks.
 *
 * @param {Object} state The current state.
 * @return {Array} Array of of blocks.
 */
export const getBlocks = ( state ) => state.blocks || [];

/**
 * Returns true if an activity is being added.
 *
 * @param {Object} state The current state.
 * @return {boolean} True if a activity is being added.
 */
export const isInsertingActivity = ( state ) => state.inserting || false;

/**
 * Retrieves activity just posted.
 *
 * @param {Object} state The current state.
 * @return {Object} The data to return.
 */
export const getJustPostedActivity = ( state ) => state.created || {};

/**
 * Returns true if sidebar is visible.
 *
 * @param {Object} state The current state.
 * @return {boolean} True if sidebar is visible.
 */
export const isSidebarVisible = ( state ) => state.isSidebarVisible || false;

/**
 * Retrieves the activity date.
 *
 * @param {Object} state The current state.
 * @return {string} The data to return.
 */
export const getActivityDate = ( state ) => state.date || '';

/**
 * Returns the activity group.
 *
 * @param {Object} state The current state.
 * @return {integer} The group ID.
 */
export const getActivityGroup = ( state ) => find( state.groups || [], { id: state.groupId || 0 } );
