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
