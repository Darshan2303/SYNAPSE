#!/bin/bash

# =================================================================
# Environment & Color Variables
# =================================================================
CYAN='\033[1;36m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
NC='\033[0m' # No Color

BASE=$(pwd)
FOLDER="SYNAPSE"
REPO="https://github.com/Darshan2303/SYNAPSE.git"
TARGET="$BASE/$FOLDER"
BACKUP="$BASE/SYNAPSE_DATA_BACKUP"

# =================================================================
# Initial System Checks
# =================================================================

# 1. Check if Git is installed
if ! command -v git &> /dev/null; then
    echo -e "\n${RED}  [ FATAL ERROR ] Git is not installed or not in your system PATH.${NC}"
    echo "  Please install Git and try again."
    echo ""
    read -p "Press [Enter] to exit..."
    exit 1
fi

# =================================================================
# Core Functions
# =================================================================

backup_data() {
    echo -e "${CYAN}  [ INFO ] Securing databases and config files...${NC}"
    mkdir -p "$BACKUP"
    
    # Safely backs up .env, .sqlite, and *db* files while IGNORING node_modules to save time
    if [ -d "$TARGET" ]; then
        find "$TARGET" -path "$TARGET/node_modules" -prune -o -type f \( -name "*db*" -o -name "*.sqlite" -o -name ".env" \) -exec cp {} "$BACKUP/" \; 2>/dev/null
    fi
}

kill_services() {
    echo -e "${YELLOW}  [ WARNING ] Stopping background Node services...${NC}"
    # Attempts to kill node processes running from the TARGET directory to avoid killing unrelated apps
    pkill -f "node.*$FOLDER" || true
}

run_existing() {
    clear
    cd "$TARGET" || exit

    echo -e "${CYAN}  =================================================================${NC}"
    echo -e "${CYAN}                           Starting Server...                      ${NC}"
    echo -e "${CYAN}  =================================================================${NC}\n"

    # Check for a shell start script, fallback to npm start
    if [ -f "start.sh" ] || [ -f "package.json" ]; then
        echo -e "${GREEN}  [ INFO ] Waiting for server to boot at localhost:4000...${NC}"
        
        # Background process to check port 4000 and open browser
        (
            while ! nc -z localhost 4000 2>/dev/null; do sleep 0.2; done
            # OS-agnostic browser open command
            if command -v xdg-open > /dev/null; then xdg-open "http://localhost:4000"
            elif command -v open > /dev/null; then open "http://localhost:4000"
            fi
        ) &
        
        echo -e "${GREEN}  [ INFO ] Launching core services...\n${NC}"
        
        if [ -f "start.sh" ]; then
            bash start.sh
        else
            npm start
        fi
    else
        echo -e "${RED}  [ ERROR ] start.sh or package.json NOT FOUND!${NC}\n"
        read -p "Press [Enter] to return to menu..."
    fi
}

clone_fresh() {
    clear
    echo -e "${CYAN}  =================================================================${NC}"
    echo -e "${CYAN}                           Downloading Files...                    ${NC}"
    echo -e "${CYAN}  =================================================================${NC}\n"
    
    git clone "$REPO" "$TARGET"

    if [ $? -ne 0 ]; then
        echo -e "\n${RED}  [ ERROR ] Failed to download the repository.${NC}\n"
        read -p "Press [Enter] to exit..."
        exit 1
    fi

    # Restore the backed-up data into the fresh clone
    if [ -d "$BACKUP" ] && [ "$(ls -A "$BACKUP")" ]; then
        echo -e "${GREEN}  [ INFO ] Restoring databases and environment variables...${NC}"
        cp -r "$BACKUP/"* "$TARGET/" 2>/dev/null
        rm -rf "$BACKUP"
    fi

    run_existing
}

# =================================================================
# Menu Logic
# =================================================================

# Skip menu and go straight to clone if it doesn't exist yet
if [ ! -d "$TARGET" ]; then
    clone_fresh
fi

while true; do
    clear
    echo -e "${CYAN}  =================================================================${NC}"
    echo ""
    echo -e "${CYAN}                               S Y N A P S E                       ${NC}"
    echo "                  Real-Time Collaboration Platform                 "
    echo "                      Ad Astra Development Team                    "
    echo ""
    echo -e "${CYAN}  =================================================================${NC}"
    echo ""
    echo -e "${GREEN}    [ STATUS ] An existing installation was detected.${NC}"
    echo ""
    echo "    Please select an option:"
    echo ""
    echo "     [ 1 ] Launch Existing Setup"
    echo "     [ 2 ] Install to a Custom Directory"
    echo "     [ 3 ] Update Existing Setup (Pull Latest Code)"
    echo "     [ 4 ] Uninstall / Remove Existing Files"
    echo "     [ 5 ] Clean Reinstall (Safe Wipe & Clone Fresh)"
    echo "     [ 6 ] Exit"
    echo ""
    echo -e "${CYAN}  =================================================================${NC}"
    echo ""
    
    read -p "    Enter choice (1-6): " choice

    case $choice in
        1)
            run_existing
            ;;
        2)
            echo ""
            read -p "  Enter new folder name (no special characters): " newname
            TARGET="$BASE/$newname"
            
            if [ -d "$TARGET" ]; then
                echo -e "${RED}  [ ERROR ] A folder named '$newname' already exists!${NC}"
                read -p "Press [Enter] to return to menu..."
            else
                clone_fresh
            fi
            ;;
        3)
            clear
            echo -e "${CYAN}  =================================================================${NC}"
            echo -e "${CYAN}                       Updating Codebase...                        ${NC}"
            echo -e "${CYAN}  =================================================================${NC}\n"
            
            if [ ! -d "$TARGET/.git" ]; then
                echo -e "${RED}  [ ERROR ] No valid Git repository found. Please do a Clean Reinstall.${NC}\n"
                read -p "Press [Enter] to return to menu..."
                continue
            fi

            cd "$TARGET" || exit
            echo -e "${CYAN}  [ INFO ] Fetching latest updates from GitHub...${NC}"
            git pull

            if [ $? -ne 0 ]; then
                echo -e "\n${RED}  [ ERROR ] Update failed! You might have local file conflicts.${NC}\n"
                read -p "Press [Enter] to return to menu..."
            else
                echo -e "\n${GREEN}  [ SUCCESS ] Update complete! Your databases were not touched.${NC}\n"
                read -p "Press [Enter] to return to menu..."
            fi
            ;;
        4)
            clear
            echo -e "${CYAN}  =================================================================${NC}"
            echo -e "${CYAN}                           U N I N S T A L L                       ${NC}"
            echo -e "${CYAN}  =================================================================${NC}\n"
            
            kill_services
            backup_data
            
            echo -e "${CYAN}  Removing old installation...${NC}"
            rm -rf "$TARGET"

            echo -e "\n${GREEN}  [ SUCCESS ] Uninstallation complete.${NC}"
            echo -e "  [ NOTE ] Your databases and configs were saved to: "
            echo -e "           $BACKUP\n"
            read -p "Press [Enter] to exit..."
            exit 0
            ;;
        5)
            clear
            echo -e "${CYAN}  =================================================================${NC}"
            echo -e "${CYAN}                           P R E P A R I N G...                    ${NC}"
            echo -e "${CYAN}  =================================================================${NC}\n"
            
            kill_services
            backup_data
            
            echo -e "${CYAN}  Wiping previous codebase...${NC}"
            rm -rf "$TARGET"
            sleep 2
            
            if [ -d "$TARGET" ]; then
                echo -e "\n${RED}  [ ERROR ] Failed to delete the folder! Close VS Code/Terminals.${NC}\n"
                read -p "Press [Enter] to exit..."
                exit 1
            fi
            
            clone_fresh
            ;;
        6)
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Try again.${NC}"
            sleep 1
            ;;
    esac
done
