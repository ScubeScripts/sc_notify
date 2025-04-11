fx_version 'cerulean'
game 'gta5'

name "sc_notify"
author "ScubeScripts"
description "A simple notification system for FiveM"
version "1.0.0"
  
client_scripts {
    'client/*.lua'
}
  
shared_script {
    'config.lua'
}

ui_page ("ui/ui.html")

files {
    "**/**/**/**/**/**/*.*",
}

