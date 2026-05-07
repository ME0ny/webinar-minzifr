/**
 * 🎯 Landing Page JavaScript
 * Вебинар: Требование Минцифры 2026
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 📝 FORM HANDLING
    // ========================================
    
    const form = document.getElementById('webinarForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Валидация обязательных полей
            const requiredFields = ['name', 'company', 'position', 'email'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('input--error');
                } else {
                    input.classList.remove('input--error');
                }
            });
            
            // Валидация email
            const emailInput = form.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && !emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('input--error');
            }
            
            if (!isValid) {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // Имитация отправки формы
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
            
            // Симуляция API запроса
            setTimeout(() => {
                console.log('Форма отправлена:', data);
                
                // Успешная отправка
                showNotification('Спасибо за регистрацию! Ссылка на вебинар придёт на почту за час до старта.', 'success');
                
                // Очистка формы
                form.reset();
                
                // Возврат кнопки
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Редирект на страницу благодарности (опционально)
                // window.location.href = '/thank-you.html';
            }, 1500);
        });
    }
    
    // ========================================
    // 🔔 NOTIFICATIONS
    // ========================================
    
    function showNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Создаём уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification__message">${message}</span>
            </div>
            <button class="notification__close" aria-label="Закрыть">×</button>
        `;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 16px 20px;
            background: ${type === 'success' ? '#7A9E8A' : type === 'error' ? '#C45A6E' : '#B84A5A'};
            color: #FFFFFF;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(194, 90, 110, 0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Обработчик закрытия
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #FFFFFF;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Автозакрытие через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Добавляем анимации в CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .input--error {
            border-color: #C45A6E !important;
            box-shadow: 0 0 0 4px rgba(196, 90, 110, 0.2) !important;
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .notification__icon {
            font-size: 18px;
        }
        
        .notification__message {
            font-size: 14px;
            line-height: 1.4;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // 📜 SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем пустые ссылки и якоря без ID
            if (href === '#' || href.length === 1) {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню если открыто
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // ========================================
    // 🎭 ANIMATIONS ON SCROLL
    // ========================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за секциями
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // Добавляем стили для анимаций
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Stagger animation for grid items */
        .pain-grid .pain-item,
        .solution-benefits .solution-item,
        .steps-grid .step-item,
        .results-grid .result-item,
        .consequences-grid .consequence-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .animate-in .pain-grid .pain-item:nth-child(1),
        .animate-in .solution-benefits .solution-item:nth-child(1),
        .animate-in .steps-grid .step-item:nth-child(1),
        .animate-in .results-grid .result-item:nth-child(1),
        .animate-in .consequences-grid .consequence-card:nth-child(1) {
            animation: fadeInUp 0.5s ease-out 0.1s forwards;
        }
        
        .animate-in .pain-grid .pain-item:nth-child(2),
        .animate-in .solution-benefits .solution-item:nth-child(2),
        .animate-in .steps-grid .step-item:nth-child(2),
        .animate-in .results-grid .result-item:nth-child(2),
        .animate-in .consequences-grid .consequence-card:nth-child(2) {
            animation: fadeInUp 0.5s ease-out 0.2s forwards;
        }
        
        .animate-in .pain-grid .pain-item:nth-child(3),
        .animate-in .solution-benefits .solution-item:nth-child(3),
        .animate-in .steps-grid .step-item:nth-child(3),
        .animate-in .results-grid .result-item:nth-child(3),
        .animate-in .consequences-grid .consequence-card:nth-child(3) {
            animation: fadeInUp 0.5s ease-out 0.3s forwards;
        }
        
        .animate-in .pain-grid .pain-item:nth-child(4),
        .animate-in .solution-benefits .solution-item:nth-child(4),
        .animate-in .steps-grid .step-item:nth-child(4),
        .animate-in .results-grid .result-item:nth-child(4),
        .animate-in .consequences-grid .consequence-card:nth-child(4) {
            animation: fadeInUp 0.5s ease-out 0.4s forwards;
        }
        
        .animate-in .steps-grid .step-item:nth-child(5),
        .animate-in .bonus-grid .bonus-item:nth-child(3) {
            animation: fadeInUp 0.5s ease-out 0.5s forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyles);
    
    // ========================================
    // 📱 MOBILE MENU (если понадобится)
    // ========================================
    
    // Можно добавить мобильное меню при необходимости
    // Сейчас реализована адаптивная вёрстка без бургера
    
    // ========================================
    // 🎯 CTA BUTTONS ENHANCEMENT
    // ========================================
    
    // Плавный скролл к форме регистрации с кнопок в хедере
    const ctaButtons = document.querySelectorAll('a[href="#registration"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Можно добавить аналитику клика
            console.log('CTA click tracked');
        });
    });
    
    // ========================================
    // 📊 ANALYTICS HOOKS (готовность к интеграции)
    // ========================================
    
    // Функция для отправки событий в аналитику
    window.trackEvent = function(eventName, eventData = {}) {
        console.log('Analytics event:', eventName, eventData);
        
        // Яндекс.Метрика
        if (typeof ym !== 'undefined') {
            ym(XXXXXX, 'reachGoal', eventName, eventData);
        }
        
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    };
    
    // Трекинг просмотра секций
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const sectionId = entry.target.id || entry.target.classList[0];
                window.trackEvent('section_view', { section: sectionId });
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ========================================
    // ⚡ PERFORMANCE OPTIMIZATION
    // ========================================
    
    // Lazy loading для изображений (если браузер не поддерживает нативный)
    if ('loading' in HTMLImageElement.prototype === false) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================
    // 🎨 DYNAMIC PLACEHOLDER IMAGES
    // ========================================
    
    // Генерация плейсхолдеров для изображений
    const placeholderImages = document.querySelectorAll('img[src^="placeholder"]');
    
    placeholderImages.forEach(img => {
        // Создаём canvas для генерации плейсхолдера
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Градиентный фон
        const gradient = ctx.createLinearGradient(0, 0, 400, 300);
        gradient.addColorStop(0, '#F4B8C4');
        gradient.addColorStop(1, '#E89AA5');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 300);
        
        // Текст
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let text = 'Изображение';
        if (img.alt) {
            text = img.alt.split(' ').slice(0, 3).join(' ');
        }
        
        ctx.fillText(text, 200, 150);
        
        // Заменяем src на data URL
        img.src = canvas.toDataURL('image/png');
    });
    
    console.log('🚀 Landing page initialized successfully');
});
