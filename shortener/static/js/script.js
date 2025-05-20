document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Copy to clipboard function
    setupCopyButtons();
    
    // Form validation
    setupFormValidation();
    
    // Advanced options toggle
    setupAdvancedOptions();
    
    // Smooth scroll
    setupSmoothScroll();
    
    // Counter animation
    setupCounterAnimation();
    
    // Initialize particles for hero section if exists
    if (document.getElementById('particles-js')) {
        initParticles();
    }
});

/**
 * Initialize particles.js for the hero section
 */
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 60, // Reduced for better performance
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.8,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.8, // Slower for subtle movement
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 200,
                        "size": 6,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

/**
 * Copy to clipboard functionality
 */
function copyToClipboard() {
    const shortUrlInput = document.getElementById('shortUrl');
    const copyMessage = document.getElementById('copyMessage');
    
    if (!shortUrlInput || !copyMessage) return;
    
    // Select the text
    shortUrlInput.select();
    shortUrlInput.setSelectionRange(0, 99999);
    
    // Use Clipboard API
    navigator.clipboard.writeText(shortUrlInput.value).then(function() {
        copyMessage.style.display = 'block';
        
        setTimeout(function() {
            copyMessage.style.display = 'none';
        }, 3000);
    }).catch(function(err) {
        // Fallback for older browsers
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                copyMessage.style.display = 'block';
                
                setTimeout(function() {
                    copyMessage.style.display = 'none';
                }, 3000);
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy the URL. Please select and copy it manually.');
        }
    });
}

/**
 * Setup all copy buttons
 */
function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (!url) return;
            
            navigator.clipboard.writeText(url).then(() => {
                // Change button text temporarily
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="bi bi-check-circle me-1"></i>Copied!';
                this.classList.remove('btn-outline-secondary');
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-outline-secondary');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy the URL. Please select and copy it manually.');
            });
        });
    });
}

/**
 * Form validation
 */
function setupFormValidation() {
    const urlForm = document.getElementById('url-form');
    
    if (!urlForm) return;
    
    urlForm.addEventListener('submit', function(event) {
        const urlInput = document.getElementById('id_original_url');
        const customShortCodeInput = document.getElementById('id_custom_short_code');
        
        if (!urlInput) return;
        
        // Validate URL format
        if (urlInput.value && !isValidURL(urlInput.value)) {
            event.preventDefault();
            showError(urlInput, 'Please enter a valid URL, including http:// or https://');
        }
        
        // Validate custom short code if provided
        if (customShortCodeInput && customShortCodeInput.value) {
            if (!isValidShortCode(customShortCodeInput.value)) {
                event.preventDefault();
                showError(customShortCodeInput, 'Custom short code can only contain letters, numbers, hyphens, and underscores');
            }
        }
    });
}

/**
 * Validate URL format
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * Validate short code format
 */
function isValidShortCode(code) {
    const pattern = /^[a-zA-Z0-9_-]+$/;
    return pattern.test(code);
}

/**
 * Show error message
 */
function showError(inputElement, message) {
    // Clear previous error
    const existingError = inputElement.parentElement.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class
    inputElement.classList.add('is-invalid');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    
    // Add after input
    inputElement.parentElement.appendChild(errorDiv);
    
    // Focus on the input
    inputElement.focus();
}

/**
 * Setup advanced options toggle and dependencies
 */
function setupAdvancedOptions() {
    const showAdvancedOptionsCheckbox = document.getElementById('showAdvancedOptions');
    const advancedOptionsDiv = document.getElementById('advancedOptions');
    
    if (showAdvancedOptionsCheckbox && advancedOptionsDiv) {
        showAdvancedOptionsCheckbox.addEventListener('change', function() {
            if (this.checked) {
                advancedOptionsDiv.classList.remove('d-none');
            } else {
                advancedOptionsDiv.classList.add('d-none');
            }
        });
    }
    
    // Expiry options
    const expiryOptions = document.getElementById('id_expiry_options');
    const customExpiryField = document.getElementById('customExpiryField');
    
    if (expiryOptions && customExpiryField) {
        expiryOptions.addEventListener('change', function() {
            if (this.value === 'custom') {
                customExpiryField.classList.remove('d-none');
            } else {
                customExpiryField.classList.add('d-none');
            }
        });
    }
    
    // Password protection toggle
    const passwordProtectCheckbox = document.getElementById('id_password_protect');
    const passwordField = document.getElementById('passwordField');
    
    if (passwordProtectCheckbox && passwordField) {
        passwordProtectCheckbox.addEventListener('change', function() {
            if (this.checked) {
                passwordField.classList.remove('d-none');
            } else {
                passwordField.classList.add('d-none');
            }
        });
    }
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top buttons
    document.querySelectorAll('a[href="#top"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

/**
 * Animate counters on the homepage
 */
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter-stats h2');
    
    if (counters.length === 0) return;
    
    const animateCounter = (counter, target) => {
        const speed = 200; // Animation duration in milliseconds
        const increment = target / (speed / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current).toLocaleString();
            
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, 16);
    };
    
    // Use Intersection Observer to trigger animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetText = counter.textContent;
                let targetNum = targetText;
                
                // Handle suffixes like K, M, etc.
                let multiplier = 1;
                if (targetText.includes('K')) {
                    multiplier = 1000;
                    targetNum = targetText.replace('K', '');
                } else if (targetText.includes('M')) {
                    multiplier = 1000000;
                    targetNum = targetText.replace('M', '');
                }
                
                // Handle plus sign
                let hasPlus = false;
                if (targetNum.includes('+')) {
                    hasPlus = true;
                    targetNum = targetNum.replace('+', '');
                }
                
                // Parse the target number
                const target = parseInt(targetNum.replace(/,/g, ''), 10) * multiplier;
                
                // Start the animation
                animateCounter(counter, target);
                
                // Restore the suffix after animation
                if (hasPlus) {
                    const originalSuffix = targetText.includes('K') ? 'K+' : (targetText.includes('M') ? 'M+' : '+');
                    setTimeout(() => {
                        counter.textContent = counter.textContent + originalSuffix;
                    }, 2000);
                } else if (targetText.includes('K') || targetText.includes('M')) {
                    const originalSuffix = targetText.includes('K') ? 'K' : 'M';
                    setTimeout(() => {
                        counter.textContent = counter.textContent + originalSuffix;
                    }, 2000);
                }
                
                // Unobserve after animation starts
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Generate QR code via AJAX
 */
function generateQR(url) {
    if (!url) return;
    
    const formData = new FormData();
    formData.append('url', url);
    
    // Check for CSRF token
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    if (csrfToken) {
        formData.append('csrfmiddlewaretoken', csrfToken.value);
    }
    
    fetch('/api/generate-qr/', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const qrContainer = document.getElementById('qrCodeContainer');
            if (qrContainer) {
                qrContainer.innerHTML = `<img src="data:image/png;base64,${data.qr_code}" alt="QR Code" class="img-fluid">`;
            }
        } else {
            console.error('Error generating QR code:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

/**
 * Add schema markup for better SEO
 */
function addSchemaMarkup() {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = `
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "TinyURL.run",
        "url": "https://tinyurl.run/",
        "description": "TinyURL.run is a free URL shortener service that transforms long URLs into short, memorable links with tracking capabilities.",
        "applicationCategory": "WebApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": "URL Shortening, Custom Aliases, Analytics, QR Code Generation, Password Protection",
        "screenshot": "https://tinyurl.run/static/img/screenshot.jpg",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1024"
        }
    }
    `;
    document.head.appendChild(schemaScript);
}

// Initialize schema markup
document.addEventListener('DOMContentLoaded', function() {
    addSchemaMarkup();
});