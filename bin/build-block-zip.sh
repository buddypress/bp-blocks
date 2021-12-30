#!/bin/bash

# Exit if any command fails
set -e

# Change to the expected directory
cd "$(dirname "$0")"
cd ../add-ons/$1

# Enable nicer messaging for build status
YELLOW_BOLD='\033[1;33m';
COLOR_RESET='\033[0m';
status () {
	echo -e "\n${YELLOW_BOLD}$1${COLOR_RESET}\n"
}

# Remove any existing zip file
rm -f $1.zip

# Generate the plugin zip file
status "Creating archive..."
zip -r $1.zip \
	assets \
    css \
	js \
	languages \
    block.json \
    $1.php \
	readme.txt

status "Done."
