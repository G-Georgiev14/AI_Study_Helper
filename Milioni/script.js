// Performance-optimized JavaScript with accessibility
(function() {
    'use strict';
    
    // Cache DOM elements
    const cache = {
        body: document.body,
        buttons: document.querySelectorAll('.primary-btn, .secondary-btn'),
        benefitCards: document.querySelectorAll('.benefit-card'),
        blogCards: document.querySelectorAll('.blog-card')
    };
    
    // Performance monitoring
    const perf = {
        startTime: performance.now(),
        mark: function(name) {
            if (performance.mark) {
                performance.mark(name);
            }
        },
        measure: function(name, startMark) {
            if (performance.measure) {
                performance.measure(name, startMark);
                console.log(`${name}: ${performance.getEntriesByName(name)[0].duration}ms`);
            }
        }
    };
    
    // Initialize
    function init() {
        perf.mark('init-start');
        
        // Add ARIA labels for better accessibility
        cache.buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim();
                button.setAttribute('aria-label', text);
            }
        });
        
        // Optimized scroll animations
        setupScrollAnimations();
        
        // Enhanced button interactions
        setupButtonInteractions();
        
        // Lazy loading for images
        setupLazyLoading();
        
        perf.mark('init-end');
        perf.measure('init-time', 'init-start', 'init-end');
    }
    
    // Optimized scroll animations with Intersection Observer
    function setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe elements
            [...cache.benefitCards, ...cache.blogCards].forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }
    }
    
    // Enhanced button interactions
    function setupButtonInteractions() {
        cache.buttons.forEach(button => {
            // Mouse events
            button.addEventListener('mouseenter', handleButtonHover);
            button.addEventListener('mouseleave', handleButtonLeave);
            
            // Keyboard events
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleButtonHover.call(button);
                }
            });
            
            button.addEventListener('keyup', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleButtonLeave.call(button);
                }
            });
        });
    }
    
    function handleButtonHover() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
    }
    
    function handleButtonLeave() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    }
    
    // Lazy loading for images
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Smooth scroll with reduced motion support
    function setupSmoothScroll() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // PDF Preview functionality
    window.openPDFPreview = function() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            padding: 1rem;
            box-sizing: border-box;
        `;
        
        // Create PDF viewer container
        const pdfViewer = document.createElement('div');
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        if (isMobile) {
            pdfViewer.style.cssText = `
                background: white;
                border-radius: 12px;
                width: 95%;
                height: 90vh;
                max-height: 700px;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            `;
        } else if (isTablet) {
            pdfViewer.style.cssText = `
                background: white;
                border-radius: 12px;
                width: 85%;
                height: 85vh;
                max-height: 650px;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            `;
        } else {
            pdfViewer.style.cssText = `
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 800px;
                height: 80vh;
                max-height: 600px;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
            `;
        }
        
        // Create header
        const header = document.createElement('div');
        header.style.cssText = `
            padding: ${isMobile ? '0.75rem 1rem' : '1rem'};
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8fafc;
            border-radius: 12px 12px 0 0;
            flex-shrink: 0;
        `;
        header.innerHTML = `
            <h3 style="margin: 0; color: #1e293b; font-size: ${isMobile ? '1rem' : '1.1rem'};">
                ${isMobile ? 'Преглед на Системата' : 'Преглед на Системата за Отличен 6'}
            </h3>
            <button onclick="this.closest('.pdf-modal').remove()" style="
                background: none;
                border: none;
                font-size: ${isMobile ? '1.2rem' : '1.5rem'};
                cursor: pointer;
                color: #64748b;
                padding: ${isMobile ? '0.25rem 0.5rem' : '0.5rem'};
                border-radius: 4px;
                transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#f1f5f9'" onmouseout="this.style.backgroundColor='transparent'">×</button>
        `;
        
        // Create content area
        const content = document.createElement('div');
        content.style.cssText = `
            flex: 1;
            padding: ${isMobile ? '1rem' : '2rem'};
            overflow-y: auto;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            -webkit-overflow-scrolling: touch;
        `;
        
        // Add preview content
        const contentHTML = isMobile ? `
            <div style="max-width: 100%;">
                <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📚</div>
                <h4 style="color: #1e293b; margin-bottom: 0.75rem; font-size: 1.1rem;">Система за Есета - Безплатен Преглед</h4>
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; text-align: left; margin-bottom: 1rem; border: 1px solid #e2e8f0;">
                    <h5 style="color: #667eea; margin-bottom: 0.5rem; font-size: 0.9rem;">📝 Промпт 1: Теза за Есе (ПЪЛЕН)</h5>
                    <p style="color: #64748b; line-height: 1.5; margin: 0; font-size: 0.85rem;">Действай като експерт по академично писане. Помогни ми да създам силна теза за есе на тема: [тема]. Генерирай 3 различни варианта на теза с аргументи и примери...</p>
                    <div style="filter: blur(3px); opacity: 0.7; margin-top: 0.5rem;">
                        <p style="color: #64748b; margin: 0; font-size: 0.85rem;">Пълният детайлен промпт...</p>
                    </div>
                </div>
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; text-align: left; margin-bottom: 1rem; border: 1px solid #e2e8f0;">
                    <h5 style="color: #667eea; margin-bottom: 0.5rem; font-size: 0.9rem;">📚 Промпт 2: Матури (ПЪЛЕН)</h5>
                    <p style="color: #64748b; line-height: 1.5; margin: 0; font-size: 0.85rem;">Помогни ми да се подготвя за матура по [предмет] в [брой дни] дни. Създай персонализиран план за подготовка с анализ...</p>
                    <div style="filter: blur(3px); opacity: 0.7; margin-top: 0.5rem;">
                        <p style="color: #64748b; margin: 0; font-size: 0.85rem;">Пълният детайлен промпт...</p>
                    </div>
                </div>
                <p style="color: #64748b; margin-bottom: 1.5rem; font-size: 0.9rem;">Това е 1 от 57 промпта в пълната система.</p>
                <div style="background: #fef3c7; padding: 0.75rem; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 1.5rem;">
                    <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 0.85rem;">🔒 Вземи пълния достъп за 13 лв.</p>
                </div>
                <button onclick="this.closest('.pdf-modal').remove(); window.open('https://gumroad.com/l/ai-study-helper', '_blank')" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                    max-width: 250px;
                ">Вземи Пълната Система →</button>
            </div>
        ` : `
            <div style="max-width: 600px;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                <h4 style="color: #1e293b; margin-bottom: 1rem;">Безплатен Преглед: Системата за Отличен 6</h4>
                
                <!-- Preview Content Structure -->
                <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
                    <h5 style="color: #667eea; margin-bottom: 1rem; font-size: 1rem;">📖 Съдържание на Пълната Система:</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                        <div style="background: white; padding: 0.75rem; border-radius: 6px; border: 1px solid #e2e8f0;">
                            <div style="font-weight: 600; color: #1e293b; margin-bottom: 0.25rem; font-size: 0.9rem;">📝 Система за Есета</div>
                            <div style="color: #64748b; font-size: 0.8rem;">12 експертни промпта</div>
                        </div>
                        <div style="background: white; padding: 0.75rem; border-radius: 6px; border: 1px solid #e2e8f0;">
                            <div style="font-weight: 600; color: #1e293b; margin-bottom: 0.25rem; font-size: 0.9rem;">🔬 Система за Изследвания</div>
                            <div style="color: #64748b; font-size: 0.8rem;">10 експертни промпта</div>
                        </div>
                        <div style="background: white; padding: 0.75rem; border-radius: 6px; border: 1px solid #e2e8f0;">
                            <div style="font-weight: 600; color: #1e293b; margin-bottom: 0.25rem; font-size: 0.9rem;">📚 Система за Матури</div>
                            <div style="color: #64748b; font-size: 0.8rem;">15 експертни промпта</div>
                        </div>
                        <div style="background: white; padding: 0.75rem; border-radius: 6px; border: 1px solid #e2e8f0;">
                            <div style="font-weight: 600; color: #1e293b; margin-bottom: 0.25rem; font-size: 0.9rem;">🧮 Система за Математика</div>
                            <div style="color: #64748b; font-size: 0.8rem;">8 експертни промпта</div>
                        </div>
                    </div>
                </div>
                
                <!-- Free Sample Prompts -->
                <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 8px; text-align: left; margin-bottom: 1.5rem; border: 1px solid #bbf7d0;">
                    <h5 style="color: #059669; margin-bottom: 1rem; font-size: 1rem;">✅ БЕЗПЛАТНИ ПЪЛНИ ВЕРСИИ: 2 Експертни Промпта</h5>
                    
                    <!-- Full Prompt 1 -->
                    <div style="background: white; padding: 1rem; border-radius: 6px; margin-bottom: 1rem; border: 1px solid #e2e8f0;">
                        <h6 style="color: #059669; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 600;">📝 Промпт 1: Генериране на Теза за Есе (ПЪЛНА ВЕРСИЯ)</h6>
                        <p style="color: #1e293b; font-family: monospace; font-size: 0.75rem; line-height: 1.4; margin: 0; white-space: pre-wrap;">Действай като експерт по академично писане. Помогни ми да създам силна теза за есе на тема: [тема] 

Генерирай 3 различни варианта на теза:
1. Класическа аргументативна теза
2. Креативна/метафорична теза  
3. Теза, която адресира контрааргументи

За всяка теза предостави:
- Основен аргумент (1 изречение)
- 2-3 подкрепящи точки
- Примерен цитат или статистика

Обясни защо всяка теза работи и коя е най-силна за [тип есе].</p>
                    </div>
                    
                    <!-- Full Prompt 2 -->
                    <div style="background: white; padding: 1rem; border-radius: 6px; border: 1px solid #e2e8f0;">
                        <h6 style="color: #059669; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 600;">📚 Промпт 2: Подготовка за Матури (ПЪЛНА ВЕРСИЯ)</h6>
                        <p style="color: #1e293b; font-family: monospace; font-size: 0.75rem; line-height: 1.4; margin: 0; white-space: pre-wrap;">Помогни ми да се подготвя за матура по [предмет] в [брой дни] дни.

Създай персонализиран план за подготовка:
1. Анализ на минали резултати и слаби места
2. Приоритизиране на теми по трудност
3. Дневен график за учене (по часове)
4. 5 ключови въпроса, които вероятно ще се появят
5. Стратегии за време по време на изпита
6. Техники за справяне със стреса

Включи конкретни задачи за всеки ден и методи за самопроверка.</p>
                    </div>
                    
                    <p style="color: #059669; font-size: 0.85rem; margin: 1rem 0 0 0; font-style: italic;">💡 Тези 2 промпта са напълно безплатни и готови за употреба. Останалите 55 експертни промпта са в пълната система.</p>
                </div>
                
                <!-- Value Proposition -->
                <div style="background: #fef3c7; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 1.5rem;">
                    <h5 style="color: #92400e; margin-bottom: 0.75rem; font-size: 1rem;">🔒 Какво Получаваш в Пълната Версия (13 лв.):</h5>
                    <ul style="color: #92400e; margin: 0; padding-left: 1.2rem; font-size: 0.9rem; line-height: 1.5;">
                        <li>Всички 57 експертни промпта с детайлни инструкции</li>
                        <li>Българска учебна програма и MATURA подготовка</li>
                        <li>Интерактивни шаблони за планиране на ученето</li>
                        <li>Система за проследяване на напредъка</li>
                        <li>Доживотни обновления и нови промптове</li>
                    </ul>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="this.closest('.pdf-modal').remove(); window.open('https://gumroad.com/l/ai-study-helper', '_blank')" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 1rem 2rem;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-bottom: 1rem;
                    ">Вземи Пълната Система за 13 лв. →</button>
                    <p style="color: #64748b; font-size: 0.85rem; margin: 0;">14 дни гаранция за удовлетвореност</p>
                </div>
            </div>
        `;
        
        content.innerHTML = contentHTML;
        
        // Assemble modal
        pdfViewer.appendChild(header);
        pdfViewer.appendChild(content);
        modal.appendChild(pdfViewer);
        modal.className = 'pdf-modal';
        
        // Add to page and handle click outside
        document.body.appendChild(modal);
        
        // Prevent body scroll on mobile
        if (isMobile) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                if (isMobile) {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            }
        });
        
        // Add escape key handler
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                if (isMobile) {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Handle modal removal cleanup
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && !document.contains(modal)) {
                    if (isMobile) {
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                    observer.disconnect();
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    };
    
})();
