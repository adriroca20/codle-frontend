#!/bin/bash

# Check if the user provided an argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <folder_name>"
    exit 1
fi

# Get the folder name from the first argument
folder_name=$1
# Go to the correct folder
cd ./src/app/domains
# Create the main folder
mkdir "$folder_name"

# Check if the folder creation was successful
if [ $? -ne 0 ]; then
    echo "Failed to create folder: $folder_name"
    exit 1
fi


# Create subfolders inside the main folder
mkdir "$folder_name/00_model"
mkdir "$folder_name/10_infraestructure"
mkdir "$folder_name/20_abstraction"
mkdir "$folder_name/30_resolver"
mkdir "$folder_name/40_presentation"

# Create files inside the subfolders
touch "$folder_name/00_model/$folder_name.contract.ts"
touch "$folder_name/00_model/$folder_name.interface.ts"
touch "$folder_name/10_infraestructure/$folder_name.call.ts"
touch "$folder_name/10_infraestructure/$folder_name.state.ts"
touch "$folder_name/20_abstraction/$folder_name.facade.ts"

# Check if the subfolder creation was successful
if [ $? -ne 0 ]; then
    echo "Failed to create subfolders."
    exit 1
fi

echo "Folders created successfully."
