/**
 * Internal dependencies.
 */
import {
  fetchFromAPI,
  getCurrentUser as getCurrentUserSelector,
  getUserGroups as getUserGroupsSelector,
} from './actions';

/**
 * Resolver for retrieving current user.
 */
export function* getCurrentUser() {
  const user = yield fetchFromAPI(
    '/buddypress/v1/members/me?context=edit',
		true
  );
  yield getCurrentUserSelector( user );
}

/**
 * Resolver for retrieving user's groups.
 */
export function* getUserGroups() {
  const groups = yield fetchFromAPI(
    '/buddypress/v1/groups/me?context=edit',
		true
  );
  yield getUserGroupsSelector( groups );
}
