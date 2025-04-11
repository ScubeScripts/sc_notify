const activeNotifications = {
    'top': [], 'top-right': [], 'top-left': [], 
    'bottom': [], 'bottom-right': [], 'bottom-left': [],
    'center-right': [], 'center-left': []
};

window.addEventListener('message', (event) => {
    if (event.data.action === 'notify') {
        createNotification(event.data);
    }
});

function createNotification(data) {
    const position = data.position || 'top-right';
    const notificationGroup = activeNotifications[position];
    
    if (notificationGroup.length >= 3) {
        const oldestNotification = notificationGroup.shift();
        fadeOutAndRemove(oldestNotification, position);
    }

    const notification = buildNotificationElement(data, position, notificationGroup.length);
    document.body.appendChild(notification);
    
    notificationGroup.push(notification);
    updatePositions(notificationGroup, position);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => fadeOutAndRemove(notification, position), data.duration);
}

function buildNotificationElement(data, position, index) {
    const notification = document.createElement('div');
    notification.className = `notification ${data.type || ''}`;
    
    const posStyle = calculatePosition(position, index);
    Object.assign(notification.style, posStyle);

    const progressBar = data.showDuration !== false
    ? `<div class="notification-progress" style="animation-duration: ${data.duration}ms"></div>`
    : '';

    const iconStyle = data.iconColor 
    ? `style="color: ${data.iconColor}"` 
    : '';

    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid fa-${data.icon || 'circle-info'}" ${iconStyle}></i>
            <div class="notification-text">
                <div class="notification-title">${data.title}</div>
                <div class="notification-description">${data.description}</div>
            </div>
        </div>
        ${progressBar}
    `;

    return notification;
}

function calculatePosition(position, index) {
    const offset = index * 70;
    const baseStyles = {
        'top': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
        'top-right': { top: '20px', right: '20px' },
        'top-left': { top: '20px', left: '20px' },
        'bottom': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
        'bottom-right': { bottom: '20px', right: '20px' },
        'bottom-left': { bottom: '20px', left: '20px' },
        'center-right': { top: '50%', right: '20px', transform: 'translateY(-50%)' },
        'center-left': { top: '50%', left: '20px', transform: 'translateY(-50%)' }
    }[position];

    if (position.includes('top')) {
        baseStyles.top = `${20 + offset}px`;
    } else if (position.includes('bottom')) {
        baseStyles.bottom = `${20 + offset}px`;
    } else if (position.includes('center')) {
        baseStyles.top = `calc(50% + ${offset}px)`;
    }

    return baseStyles;
}

function updatePositions(group, position) {
    let cumulativeHeight = 0;
    
    group.forEach((notification, index) => {
        const notificationHeight = notification.offsetHeight + 10;
        
        const newStyle = {
            transition: 'top 0.3s ease, bottom 0.3s ease',
        };

        if (position.includes('top')) {
            newStyle.top = `${20 + cumulativeHeight}px`;
        } else if (position.includes('bottom')) {
            newStyle.bottom = `${20 + cumulativeHeight}px`;
        } else if (position.includes('center')) {
            newStyle.top = `calc(50% + ${cumulativeHeight}px)`;
        }

        Object.assign(notification.style, newStyle);
        cumulativeHeight += notificationHeight;
    });
}

function fadeOutAndRemove(notification, position) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
        const group = activeNotifications[position];
        const index = group.indexOf(notification);
        if (index !== -1) group.splice(index, 1);
        updatePositions(group, position);
    }, 300);
}