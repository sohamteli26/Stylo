// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all functionality
    initializeHeader();
    initializeHeroUpload();
    initializeOccasionSelector();
    initializeFooterModals();
    initializeInteractiveButtons();
});

// Header functionality
function initializeHeader() {
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');

    // Profile dropdown toggle
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });

        // Profile menu item clicks
        const profileItems = profileDropdown.querySelectorAll('.profile-item');
        profileItems.forEach(item => {
            item.addEventListener('click', function() {
                const text = this.textContent.trim();
                if (text.includes('Saved Outfits')) {
                    alert('Opening your saved outfits collection...');
                } else if (text.includes('My Wardrobe')) {
                    alert('Viewing your wardrobe items...');
                } else if (text.includes('Style Preferences')) {
                    alert('Opening style preferences settings...');
                } else if (text.includes('Sign Out')) {
                    if (confirm('Are you sure you want to sign out?')) {
                        alert('Signing out... Goodbye!');
                    }
                }
                profileDropdown.classList.remove('show');
            });
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('show');
            
            if (isOpen) {
                mobileMenu.classList.remove('show');
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            } else {
                mobileMenu.classList.add('show');
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            }
        });

        // Close mobile menu when clicking navigation links
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            });
        });
    }
}

// Hero section upload functionality
function initializeHeroUpload() {
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadDropdown = document.getElementById('uploadDropdown');
    const takePhotoBtn = document.getElementById('takePhotoBtn');
    const uploadGalleryBtn = document.getElementById('uploadGalleryBtn');
    const uploadOrganizeBtn = document.getElementById('uploadOrganizeBtn');

    if (uploadBtn && uploadDropdown) {
        uploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            uploadDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!uploadDropdown.contains(e.target) && !uploadBtn.contains(e.target)) {
                uploadDropdown.classList.remove('show');
            }
        });
    }

    // Take Photo functionality
    if (takePhotoBtn) {
        takePhotoBtn.addEventListener('click', function() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function(stream) {
                        alert('Camera access granted! Take a photo of your outfit.');
                        // Stop the stream after showing the alert
                        stream.getTracks().forEach(track => track.stop());
                    })
                    .catch(function() {
                        alert('Camera access denied or not available.');
                    });
            } else {
                alert('Camera not supported on this device.');
            }
            uploadDropdown.classList.remove('show');
        });
    }

    // Upload from Gallery functionality
    if (uploadGalleryBtn) {
        uploadGalleryBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.multiple = true;
            input.onchange = function(e) {
                const files = e.target.files;
                if (files && files.length > 0) {
                    alert(`Selected ${files.length} photo(s). Processing and organizing your wardrobe...`);
                }
            };
            input.click();
            uploadDropdown.classList.remove('show');
        });
    }

    // Upload & Organize functionality
    if (uploadOrganizeBtn) {
        uploadOrganizeBtn.addEventListener('click', function() {
            alert('Upload and Organize: AI is analyzing your items and categorizing them by type, color, season, and style. This will help create better outfit suggestions!');
            uploadDropdown.classList.remove('show');
        });
    }
}

// Occasion selector functionality
function initializeOccasionSelector() {
    const occasionBtns = document.querySelectorAll('.occasion-btn');
    const weatherSection = document.getElementById('weatherSection');
    const weatherBtns = document.querySelectorAll('.weather-btn');
    const outfitDisplay = document.getElementById('outfitDisplay');
    const outfitBadge = document.getElementById('outfitBadge');
    const outfitDescription = document.getElementById('outfitDescription');
    const outfitItemsGrid = document.getElementById('outfitItemsGrid');

    let selectedOccasion = '';
    let selectedWeather = '';

    // Outfit suggestions data
    const outfitSuggestions = {
        "Wedding": {
            "Sunny": {
                items: ["Elegant Floral Dress", "Nude Heels", "Statement Earrings", "Light Cardigan"],
                description: "Perfect for an outdoor ceremony"
            },
            "Rainy": {
                items: ["Sophisticated Midi Dress", "Closed-toe Heels", "Elegant Blazer", "Small Umbrella"],
                description: "Classy and weather-appropriate"
            },
            "Cold": {
                items: ["Long-sleeve Formal Dress", "Warm Coat", "Dress Boots", "Scarf"],
                description: "Warm yet elegant for winter weddings"
            },
            "Mild": {
                items: ["A-line Dress", "Block Heels", "Light Jacket", "Delicate Jewelry"],
                description: "Comfortable for changing temperatures"
            }
        },
        "Birthday Party": {
            "Sunny": {
                items: ["Fun Printed Top", "High-waisted Jeans", "Sneakers", "Sunglasses"],
                description: "Casual and celebratory"
            },
            "Rainy": {
                items: ["Cute Sweater", "Dark Jeans", "Ankle Boots", "Light Jacket"],
                description: "Cozy party vibes"
            },
            "Cold": {
                items: ["Festive Jumper", "Warm Pants", "Boots", "Winter Coat"],
                description: "Warm and party-ready"
            },
            "Mild": {
                items: ["Stylish Blouse", "Casual Pants", "Comfortable Flats", "Light Cardigan"],
                description: "Perfect for indoor celebrations"
            }
        },
        "College": {
            "Sunny": {
                items: ["Casual T-shirt", "Denim Shorts", "Canvas Sneakers", "Backpack"],
                description: "Comfortable campus style"
            },
            "Rainy": {
                items: ["Hoodie", "Jeans", "Waterproof Sneakers", "Rain Jacket"],
                description: "Practical for rainy campus days"
            },
            "Cold": {
                items: ["Warm Sweater", "Leggings", "Boots", "Puffy Jacket"],
                description: "Cozy for cold study sessions"
            },
            "Mild": {
                items: ["Long-sleeve Shirt", "Jeans", "Sneakers", "Denim Jacket"],
                description: "Classic campus comfort"
            }
        },
        "Office": {
            "Sunny": {
                items: ["Crisp White Shirt", "Tailored Trousers", "Loafers", "Blazer"],
                description: "Professional and polished"
            },
            "Rainy": {
                items: ["Blouse", "Dress Pants", "Closed-toe Shoes", "Trench Coat"],
                description: "Business-appropriate rain gear"
            },
            "Cold": {
                items: ["Wool Sweater", "Dress Pants", "Dress Boots", "Warm Coat"],
                description: "Professional winter attire"
            },
            "Mild": {
                items: ["Button-up Shirt", "Skirt", "Flats", "Light Cardigan"],
                description: "Comfortable office wear"
            }
        }
    };

    // Occasion selection
    occasionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all buttons
            occasionBtns.forEach(b => b.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Store selected occasion
            selectedOccasion = this.dataset.occasion;
            
            // Show weather section
            weatherSection.style.display = 'block';
            
            // Reset weather selection and hide outfit
            weatherBtns.forEach(b => b.classList.remove('selected'));
            selectedWeather = '';
            outfitDisplay.style.display = 'none';
        });
    });

    // Weather selection
    weatherBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all weather buttons
            weatherBtns.forEach(b => b.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Store selected weather
            selectedWeather = this.dataset.weather;
            
            // Show outfit suggestion
            showOutfitSuggestion(selectedOccasion, selectedWeather);
        });
    });

    function showOutfitSuggestion(occasion, weather) {
        const outfit = outfitSuggestions[occasion] && outfitSuggestions[occasion][weather];
        
        if (outfit) {
            // Update badge
            outfitBadge.textContent = `${occasion} • ${weather}`;
            
            // Update description
            outfitDescription.textContent = outfit.description;
            
            // Update items
            outfitItemsGrid.innerHTML = '';
            outfit.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'outfit-item';
                itemDiv.innerHTML = `
                    <i data-lucide="shirt"></i>
                    <span>${item}</span>
                `;
                outfitItemsGrid.appendChild(itemDiv);
            });
            
            // Re-initialize lucide icons for new elements
            lucide.createIcons();
            
            // Show outfit display
            outfitDisplay.style.display = 'block';
        }
    }

    // Outfit action buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.outfit-try-btn')) {
            alert(`Trying on your ${selectedOccasion} outfit for ${selectedWeather} weather! Opening virtual try-on...`);
        } else if (e.target.closest('.outfit-save-btn')) {
            alert(`Outfit saved to your favorites! You can find it in your profile under "Saved Outfits".`);
        }
    });
}

// Footer modals functionality
function initializeFooterModals() {
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const footerLinks = document.querySelectorAll('.footer-link');

    // Footer content data
    const footerContent = {
        "about-us": {
            title: "About Stylo",
            content: "Stylo is an innovative fashion technology company founded in 2024 with a mission to revolutionize how people discover and style their wardrobes. Our AI-powered platform helps users make the most of their existing clothes while building confidence in their personal style. We believe that great style shouldn't require endless shopping or hours of decision-making – just smart technology and your unique taste."
        },
        "careers": {
            title: "Join Our Team",
            content: "We're looking for passionate individuals to help shape the future of fashion technology. Current openings include: AI/ML Engineers, Frontend Developers, Fashion Stylists, Product Designers, and Customer Success Representatives. We offer competitive salaries, equity packages, remote work options, and the chance to work on cutting-edge fashion AI. Send your resume to careers@stylo.com"
        },
        "press-kit": {
            title: "Press Resources",
            content: "Download our brand assets, company logos, and product screenshots. For media inquiries, interviews, or product demos, contact our press team at press@stylo.com. Recent coverage includes features in Vogue Tech, TechCrunch, and Fashion Week Daily. High-resolution images, executive bios, and company fact sheets are available in our digital press kit."
        },
        "help-center": {
            title: "Getting Help",
            content: "Find answers to common questions about uploading your wardrobe, using AI suggestions, and managing your style preferences. Browse our video tutorials, troubleshooting guides, and style tips. For technical support, use our in-app chat or email support@stylo.com. Our team typically responds within 2-4 hours during business days."
        },
        "contact-us": {
            title: "Contact Information",
            content: "Email: hello@stylo.com\nPhone: +1 (555) 123-STYLE\nAddress: 123 Fashion Avenue, San Francisco, CA 94102\nBusiness Hours: Monday-Friday 9AM-6PM PST\n\nFor partnerships: partnerships@stylo.com\nFor press inquiries: press@stylo.com\n\nFollow us on social media for daily style inspiration and product updates."
        },
        "style-guide": {
            title: "Style Guide & Tips",
            content: "Learn how to maximize your wardrobe with our comprehensive style guide. Topics include: Color coordination principles, seasonal wardrobe transitions, occasion-appropriate dressing, body type styling tips, accessory pairing, and sustainable fashion practices. Our certified stylists share weekly tips on mixing patterns, building capsule wardrobes, and creating signature looks from basics."
        },
        "privacy-policy": {
            title: "Privacy Policy",
            content: "Stylo is committed to protecting your privacy. We collect wardrobe photos and style preferences to provide personalized outfit recommendations. Your data is encrypted and never shared with third parties. You can delete your account and data at any time. We use cookies to improve your experience and analytics to enhance our AI algorithms. Full policy details available at stylo.com/privacy"
        },
        "data-protection": {
            title: "Data Protection",
            content: "Your personal information and wardrobe data are protected with enterprise-grade security. We use end-to-end encryption for all uploads, secure cloud storage with regular backups, and comply with GDPR and CCPA regulations. Our AI processes your style preferences locally when possible. You have full control over your data with options to export, modify, or delete your information at any time."
        }
    };

    // Footer link clicks
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            const contentKey = this.dataset.modal;
            const content = footerContent[contentKey];
            
            if (content) {
                modalTitle.textContent = content.title;
                modalContent.textContent = content.content;
                modal.classList.add('show');
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// Initialize all interactive buttons
function initializeInteractiveButtons() {
    // Get Started buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-primary') && e.target.textContent.includes('Get Started')) {
            alert('Welcome to Stylo! Let\'s start building your digital wardrobe and discover amazing outfit combinations.');
        }
    });

    // Start Styling button
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-primary') && e.target.textContent.includes('Start Styling')) {
            alert('Let\'s begin your style journey! Upload some photos of your clothes to get personalized outfit suggestions.');
        }
    });

    // Add Items button
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-primary') && e.target.textContent.includes('Add Items')) {
            alert('Add new items to your wardrobe! You can upload photos or manually add clothing descriptions.');
        }
    });

    // Try This Outfit buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.suggestion-try-btn')) {
            const suggestionCard = e.target.closest('.suggestion-card');
            let outfitType = 'outfit';
            
            if (suggestionCard.classList.contains('perfect-discovery')) {
                outfitType = 'discovery';
            }
            
            alert(`Great choice! This ${outfitType} has been added to your try-on list. Check your virtual wardrobe to see how it looks!`);
        }
    });

    // Take Style Quiz button
    document.addEventListener('click', function(e) {
        if (e.target.closest('button') && e.target.textContent.includes('Take Style Quiz')) {
            alert('Starting your personalized style quiz! We\'ll ask about your preferences, lifestyle, and fashion goals to create your perfect style profile.');
        }
    });

    // Apply Style buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.profile-apply-btn')) {
            const profileCard = e.target.closest('.profile-card');
            const profileName = profileCard.querySelector('h4').textContent;
            alert(`Applying "${profileName}" style to your wardrobe! We'll update your outfit suggestions to match this aesthetic.`);
        }
    });

    // Color analysis buttons
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Generate Outfits with These Colors')) {
            alert('Generating personalized outfits using your ideal color palette! Check your AI suggestions for new color-coordinated looks.');
        } else if (e.target.textContent.includes('Retake Analysis')) {
            alert('Retaking your color analysis! Please upload a new photo in natural lighting for the most accurate results.');
        }
    });

    // Trending outfit actions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.trending-action-btn')) {
            const button = e.target.closest('.trending-action-btn');
            const trendingCard = button.closest('.trending-card');
            const outfitName = trendingCard.querySelector('h4').textContent;
            
            if (button.textContent.includes('Like')) {
                alert(`You liked "${outfitName}"! Similar styles will appear more often in your recommendations.`);
            } else if (button.textContent.includes('Share')) {
                alert(`Sharing "${outfitName}" to your social media! Your friends will see this trendy outfit inspiration.`);
            }
        }
    });

    // Social media links
    document.addEventListener('click', function(e) {
        if (e.target.closest('.social-link')) {
            e.preventDefault();
            const socialLink = e.target.closest('.social-link');
            const platform = socialLink.getAttribute('aria-label');
            alert(`Opening Stylo's ${platform} page! Follow us for daily style inspiration and fashion tips.`);
        }
    });

    // Navigation links smooth scrolling
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Utility function for smooth animations
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        element.style.opacity = Math.min(progress / duration, 1);
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        element.style.opacity = Math.max(1 - (progress / duration), 0);
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// Initialize tooltips and other enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                const originalText = this.textContent;
                this.classList.add('loading');
                
                // Simulate loading for certain actions
                if (originalText.includes('Try This') || originalText.includes('Generate') || originalText.includes('Apply')) {
                    this.textContent = 'Processing...';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('loading');
                    }, 1500);
                }
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.item-card, .suggestion-card, .profile-card, .trending-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});