![gitthumps (1)](https://github.com/user-attachments/assets/b4ca9f42-00cf-4632-9f62-489a5a0dcd81)

![Screenshot 2025-04-11 194257](https://github.com/user-attachments/assets/4d46f56d-08ed-45ac-b273-3ae9ac3726cc)

## Usage client.lua

#### Standard Notify
```lua
exports['sc_notify']:notify({
    title = "Standard-Notify", 
    description = "This is a standard info!",
    type = "info" --success, error, info, warning
})
```

#### Coustom Notify
```lua
exports['sc_notify']:notify({
    title = "Custom-Notify", 
    description = "With custom icon & position!",
    icon = "rocket",
    iconColor = "#FF00FF",
    position = "top-right",
    Duration = 15000,
    showDuration = false
})
```

## Usage server.lua

#### Standard Notify
```lua
TriggerClientEvent('sc_notify:notify', targetPlayerId, {
    title = "Standard-Notify", 
    description = "This is a standard info!",
    type = "info" --success, error, info, warning
})
```

#### Coustom Notify
```lua
TriggerClientEvent('sc_notify:notify', targetPlayerId, {
    title = "Custom-Notify", 
    description = "With custom icon & position!",
    icon = "rocket",
    iconColor = "#FF00FF",
    position = "top-right",
    Duration = 15000,
    showDuration = false
})
```

## Installation
Clone or download this repository

Add sc_notify to your resources directory

Add this in your server.cfg :
```
ensure sc_notify
```

» You want more? Come to my [Discord Server](https://discord.gg/Mqgewse3Yc)

