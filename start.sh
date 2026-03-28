#!/bin/bash

# Set terminal title
echo -ne "\033]0;SYNAPSE Launcher\007"

# Go to the folder where this sh file is located
cd "$(dirname "$0")" || { echo "Failed to change directory."; exit 1; }

echo "==============================="
echo "SYNAPSE Launcher"
echo "==============================="

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed."
    echo "Install from https://nodejs.org"
    echo ""
    echo "==============================="
    echo "Process finished"
    echo "==============================="
    read -p "Press Enter to exit..."
    exit 1
fi

echo "Node detected:"
node -v

# --- THE FIX: Cross-platform npm runner ---
# Prevents Windows/Git Bash from exiting instantly
run_npm() {
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
        npm.cmd "$@"
    else
        command npm "$@"
    fi
}
# ------------------------------------------

echo ""
echo "Installing dependencies..."
run_npm install --no-audit --no-fund

echo ""
echo "Starting server..."
run_npm start server

echo ""
echo "==============================="
echo "Process finished"
echo "==============================="
read -p "Press Enter to exit..."