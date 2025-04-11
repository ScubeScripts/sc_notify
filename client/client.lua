function notify(data)
    if not data.Duration and not data.duration then
        data.Duration = 5000
    end

    data.Duration = data.Duration or data.duration

    if data.showDuration == nil then
        data.showDuration = true
    elseif data.showDuration == true then
    elseif type(data.showDuration) == "number" then
        data.Duration = data.showDuration
    end

    SendNUIMessage({
        action = 'notify',
        title = data.title,
        description = data.description,
        type = data.type,
        icon = data.icon,
        iconColor = data.iconColor,
        showDuration = data.showDuration,
        position = data.position or 'top-right',
        duration = data.Duration
    })
end

exports('notify', notify)

RegisterNetEvent('sc_notify:notify')
AddEventHandler('sc_notify:notify', function(data)
    notify(data)
end)

RegisterCommand("testnotify", function()
    exports['sc_notify']:notify({
        title = "Wichtige Ankündigung",
        description = "Dies ist eine sehr lange Nachricht, die mehrere Zeilen umfasst.\nSie enthält sogar manuelle Zeilenumbrüche!",
        type = "info",
        position = "center-right",
        Duration = 10000,
        showDuration = false
    })
    
    exports['sc_notify']:notify({
        title = "Standard-Notify", 
        description = "Das ist eine Standard-Info!",
        type = "info"
    })

    exports['sc_notify']:notify({
        title = "Custom-Notify", 
        description = "Mit eigenem Icon & Position!",
        icon = "rocket",
        iconColor = "#FF00FF",
        position = "top-right",
        Duration = 15000,
        showDuration = false
    })
end, false)