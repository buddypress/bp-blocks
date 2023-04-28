#!/bin/bash

# Exit if any command fails
set -e

# Change to the expected directory
cd ./dist/$1

# Enable nicer messaging for build status
YELLOW_BOLD='\033[1;33m';
COLOR_RESET='\033[0m';
status () {
	echo -e "\n${YELLOW_BOLD}$1${COLOR_RESET}\n"
}

# Rename assets
status "Moving $1 Add-on assets..."

for f in *
	do echo "Processing $f"
	mv $f ../../add-ons/$1/block
done

status "Done."
