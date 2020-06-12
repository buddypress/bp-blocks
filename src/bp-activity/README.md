# Using the Activity Block Editor

## Into WordPress Administration

There's a WP-Admin Activity submenu named "Add Activity" where I've added a playground to test a Block Editor to post activities getting inspiration from [getdave's standalone Editor](https://github.com/getdave/standalone-block-editor).

### Tasks

- [ ] Activity Sidebar settings panel to eventually set a parent object for the activity, eg.: a group.
- [ ] Snackbar to inform the activity was successfully posted.
- [ ] The publish button should only be available if the activity has some content.
- [ ] Notice errors in case of troubles.
- [x] Emoji picker for the `bp/text` block. 🙌
- [ ] BP Blocks API improvements to allow a plugin to register a block for the Activity Editor (as well as for the Post Editor).

## On front-end

There, we need to update the activity list. BP Legacy and BP Nouveau are using a jQuery way to prepend pust posted activities. Using [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) seems a good way to communicate between the Activity Editor (React) and this list (jQuery).

The Activity REST controller's response should probably be filtered for this specific context to get a "PHP rendered item" to maximize plugin compatibility.

## BuddyPress Core issues/improvements

### Issues
- [ ] When WordPress is replacing Emoji by a static image, this image attributes (Eg. : `wp-smiley` class) are removed from the rendered content.

### Improvements
- [ ] Review Activity filters to make sure Blocks are best rendered (eg: `wpautop` is not needed). + Check Dynamic block rendering.
