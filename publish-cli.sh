#!/bin/bash

# Colors
RED='\e[31m'
GREEN='\e[32m'
YELLOW='\e[33m'
BLUE='\e[34m'
BOLD='\e[1m'
RESET='\e[0m'

used_ports=($(netstat -tuln | grep -oP ':\K\d+' | sort -un))
PS3='Please select apps to publish: '
options=("all" "quit")
for dir in ./apps/*/; do
    dir=${dir%*/}
    options+=("${dir##*/}")
done
apps_to_publish=()

validate_port() {
    if [[ $1 -ge 1 && $1 -le 65535 ]]; then
        return 0
    else
        echo -e "${RED}Invalid port number. Please enter a value between 1 and 65535.${RESET}"
        return 1
    fi
}

get_app_details() {
    local app_type=$1
    if [[ -n $2 && -n $3 ]]; then
        app_name="($3) $2"
        app_port=$3
    else
        read -p "Please provide the app name for $app_type: " app_name
        while true; do
            echo -e "${BOLD}${YELLOW}\nWarning: The following ports are currently in use: ${used_ports[*]}${RESET}\n"
            read -p "Please provide port number for $app_name: " app_port
            validate_port $app_port || continue
            port_in_use=false
            for used_port in "${used_ports[@]}"; do
                if [[ $app_port -eq $used_port ]]; then
                    echo -e "${RED}Port $app_port is already in use by another app. Please choose a different port.${RESET}"
                    port_in_use=true
                    break
                fi
            done
            [[ $port_in_use == false ]] && break
        done
        app_name="($app_port) $app_name"
    fi
    echo -e "${GREEN}App name for $app_type is set to $app_name${RESET}"
    echo -e "${GREEN}Port number for $app_name is set to $app_port${RESET}"
    eval "${app_type,,}_app=\$app_name"
    eval "${app_type,,}_port=\$app_port"
    used_ports+=($app_port)
}

update_code_from_remote() {
    echo -e "${BOLD}${BLUE}Pulling code from remote..${RESET}\n"
    git reset --hard origin/main && git pull --recurse-submodules
}

start_app() {
    local app_type=$1
    local app_name_var="${app_type,,}_app"
    local app_port_var="${app_type,,}_port"
    local app_name=${!app_name_var}
    local app_port=${!app_port_var}

    pnpm run build --filter "./apps/${app_type,,}"
    echo -e "${BOLD}${BLUE}\nStarting $app_type..${RESET}\n"
    if pm2 list | grep -q "$app_name"; then
        pm2 delete "$app_name"
    fi
    cd "apps/${app_type,,}"
    pm2 start "pnpm start --port $app_port" -n "$app_name"
    echo -e "${BOLD}${BLUE}\n$app_type Started${RESET}\n"
    cd ../..
}

if [[ $# -eq 0 ]]; then
    select opt in "${options[@]}"
    do
        case $opt in
            "all")
                for app in "${options[@]}"; do
                    [[ $app == "all" || $app == "quit" ]] && continue
                    get_app_details "$app"
                    apps_to_publish+=("$app")
                done
                break
                ;;
            "quit")
                exit
                ;;
            *) 
                get_app_details "$opt"
                apps_to_publish+=("$opt")
                break
                ;;
        esac
    done
else
    while [[ $# -gt 0 ]]; do
        case $1 in
            --app)
                app=$2
                shift 2
                ;;
            --name)
                name=$2
                shift 2
                ;;
            --port)
                port=$2
                shift 2
                ;;
            *)
                echo -e "${RED}Unknown option: $1${RESET}"
                exit 1
                ;;
        esac
        get_app_details "$app" "$name" "$port"
        apps_to_publish+=("$app")
    done
fi

update_code_from_remote

echo -e "${BOLD}${BLUE}\nStarting setup for ${apps_to_publish[*]}..${RESET}\n"
pnpm install

for app in "${apps_to_publish[@]}"; do
    start_app "$app"
done