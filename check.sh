#!/bin/bash

git add .


if [ -n "$(find . -type d -name '.git')" ]; then

    echo ".git directory exists"
# Check for changes in the repository
if git diff-index --quiet HEAD --; then
    echo "No changes detected."
else
    # Generate a random branch name
    branch_name="branch_$RANDOM"

    # Create a new branch with the random name
    git branch $branch_name

    # Checkout the new branch
    git checkout $branch_name

    # Add all changes
    git add .

    # Commit the changes
    git commit -m "Changes detected, new branch $branch_name"

    # Push the new branch to the remote repository
    git push -u origin $branch_name

    echo "Changes detected, created new branch $branch_name and pushed to remote repository"
fi



else
    echo ".git directory does not exist"
fi
