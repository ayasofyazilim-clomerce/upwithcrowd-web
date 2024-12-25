#!/bin/bash

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
        echo "Invalid port number. Please enter a value between 1 and 65535."
        return 1
    fi
}

get_app_details() {
    local app_type=$1
    if [[ -n $2 && -n $3 ]]; then
        app_name=$2
        app_port=$3
    else
        read -p "Please provide the app name for $app_type: " app_name
        while true; do
            read -p "Please provide port number for $app_name: " app_port
            validate_port $app_port || continue
            port_in_use=false
            for used_port in "${used_ports[@]}"; do
                if [[ $app_port -eq $used_port ]]; then
                    echo "Port $app_port is already in use by another app. Please choose a different port."
                    port_in_use=true
                    break
                fi
            done
            [[ $port_in_use == false ]] && break
        done
    fi
    echo "App name for $app_type is set to $app_name"
    echo "Port number for $app_name is set to $app_port"
    eval "${app_type,,}_app=\$app_name"
    eval "${app_type,,}_port=\$app_port"
    used_ports+=($app_port)
}

update_code_from_remote() {
    echo -e '\e[1m\e[34mPulling code from remote..\e[0m\n'
    git clean -fd
    git submodule foreach --recursive git clean -fd
    git fetch --all
    git reset --hard origin/main
    git pull --recurse-submodules
}

start_app() {
    local app_type=$1
    local app_name_var="${app_type,,}_app"
    local app_port_var="${app_type,,}_port"
    local app_name=${!app_name_var}
    local app_port=${!app_port_var}

    pnpm run build --filter "./apps/${app_type,,}"
    echo -e "\e[1m\e[34m\nStarting $app_type..\e[0m\n"
    pm2 delete "$app_name" || true
    cd "apps/${app_type,,}"
    pm2 start "pnpm start --port $app_port" -n "$app_name"
    echo -e "\e[1m\e[34m\n$app_type Started\e[0m\n"
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
                echo "Unknown option: $1"
                exit 1
                ;;
        esac
        get_app_details "$app" "$name" "$port"
        apps_to_publish+=("$app")
    done
fi

update_code_from_remote

echo -e "\e[1m\e[34m\nStarting setup for ${apps_to_publish[*]}..\e[0m\n"
pnpm install

for app in "${apps_to_publish[@]}"; do
    start_app "$app"
done
