// Data Manager - localStorage CRUD for Suman Art Glass
// Security: Global escapeHTML function for XSS prevention
function escapeHTML(str) {
    if (!str) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;', '/': '&#x2F;' };
    return String(str).replace(/[&<>"'/]/g, function(s) { return map[s]; });
}

const DataManager = {
    MAX_IMAGE_SIZE: 500000, // 500KB max for localStorage

    // Security: Sanitize string input
    sanitize(str) {
        if (typeof str !== 'string') return str;
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    // Security: Sanitize all string values in an object
    sanitizeObject(obj) {
        if (!obj || typeof obj !== 'object') return obj;
        const sanitized = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string' && key !== 'image' && key !== 'logo' && key !== 'photo') {
                sanitized[key] = this.sanitize(value);
            } else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    },

    init() {
        if (!localStorage.getItem('sag_projects')) {
            localStorage.setItem('sag_projects', JSON.stringify([
                { id: 1, name: 'Infinix IT Park', category: 'commercial', location: 'Hyderabad', description: 'Complete curtain wall glazing for 20-story IT park.', image: '../images/project-infinix.jpg', status: 'Completed', company: 'Infinix' },
                { id: 2, name: 'Hotel Radisson Facade', category: 'hospitality', location: 'Lucknow', description: 'Premium spider glazing facade for 5-star hotel.', image: '../images/project-radisson.jpg', status: 'Completed', company: 'Radisson' },
                { id: 3, name: 'SGPGI Hospital Wing', category: 'healthcare', location: 'Lucknow', description: 'Structural glazing for hospital new wing.', image: '../images/project-hospital.jpg', status: 'In Progress', company: 'SGPGI' },
                { id: 4, name: 'Toyota Showroom', category: 'commercial', location: 'Delhi', description: 'Aluminium facade and glass entrance for Toyota dealership.', image: '../images/project-toyota.jpg', status: 'Completed', company: 'Toyota' },
                { id: 5, name: 'CMS School Campus', category: 'institutional', location: 'Lucknow', description: 'UPVC windows and partitions for new school building.', image: '../images/project-school.jpg', status: 'Completed', company: 'CMS' },
                { id: 6, name: 'V-Mart Retail Store', category: 'retail', location: 'Multiple Cities', description: 'Interior glass partitions and display systems.', image: '../images/project-retail.jpg', status: 'Completed', company: 'V-Mart' },
                { id: 7, name: 'Omaxe City Complex', category: 'residential', location: 'Lucknow', description: 'Residential complex glass railing and window systems.', image: '../images/project-residential.jpg', status: 'In Progress', company: 'Omaxe' },
                { id: 8, name: 'LDA Office Building', category: 'government', location: 'Lucknow', description: 'Government building facade renovation.', image: '../images/project-lda.jpg', status: 'Completed', company: 'LDA' }
            ]));
        }

        if (!localStorage.getItem('sag_services')) {
            localStorage.setItem('sag_services', JSON.stringify([
                { id: 1, name: 'Curtain Wall Glazing', category: 'glass', description: 'High-performance curtain wall systems for commercial buildings.', icon: 'curtain-wall' },
                { id: 2, name: 'Spider Glazing', category: 'glass', description: 'Point-fixed glass systems with stainless steel fittings.', icon: 'spider-glazing' },
                { id: 3, name: 'Structural Glazing', category: 'glass', description: 'Structurally bonded glass facade systems.', icon: 'structural-glazing' },
                { id: 4, name: 'UPVC Windows', category: 'upvc', description: 'Energy-efficient UPVC window systems.', icon: 'upvc-windows' },
                { id: 5, name: 'Aluminium Partitions', category: 'aluminium', description: 'Modern aluminium partition systems for offices.', icon: 'aluminium-partition' },
                { id: 6, name: 'Facade Systems', category: 'facade', description: 'Complete building facade solutions.', icon: 'facade-systems' },
                { id: 7, name: 'Glass Railings', category: 'specialty', description: 'Tempered glass railing systems.', icon: 'glass-railing' },
                { id: 8, name: 'Toughened Glass', category: 'glass', description: 'Heat-treated safety glass solutions.', icon: 'toughened-glass' },
                { id: 9, name: 'Digital Printing on Glass', category: 'specialty', description: 'Custom digital prints on glass panels.', icon: 'digital-printing' },
                { id: 10, name: 'Metal Cladding', category: 'aluminium', description: 'ACP and metal cladding services.', icon: 'metal-cladding' },
                { id: 11, name: 'Aluminium Windows', category: 'aluminium', description: 'Slim-profile aluminium window systems.', icon: 'aluminium-windows' },
                { id: 12, name: 'Glass Art & Design', category: 'specialty', description: 'Decorative and artistic glass solutions.', icon: 'glass-art' }
            ]));
        }

        if (!localStorage.getItem('sag_gallery')) {
            localStorage.setItem('sag_gallery', JSON.stringify([
                { id: 1, title: 'Curtain Wall Installation', category: 'commercial', image: '../images/curtain-wall.jpg' },
                { id: 2, title: 'Spider Glazing Work', category: 'glass', image: '../images/spider-glazing.jpg' },
                { id: 3, title: 'UPVC Window Fitting', category: 'upvc', image: '../images/upvc-windows.jpg' },
                { id: 4, title: 'Aluminium Partition', category: 'aluminium', image: '../images/glass-partition.jpg' },
                { id: 5, title: 'Toughened Glass', category: 'glass', image: '../images/toughened-glass.jpg' },
                { id: 6, title: 'Digital Printing', category: 'specialty', image: '../images/digital-printing.jpg' },
                { id: 7, title: 'Metal Cladding', category: 'aluminium', image: '../images/metal-cladding.jpg' },
                { id: 8, title: 'Glass Art Design', category: 'specialty', image: '../images/glass-art.jpg' },
                { id: 9, title: 'Office Building Facade', category: 'commercial', image: '../images/office-building.jpg' },
                { id: 10, title: 'Modern Architecture', category: 'commercial', image: '../images/modern-building.jpg' },
                { id: 11, title: 'Aluminium Windows', category: 'aluminium', image: '../images/aluminum-windows.jpg' },
                { id: 12, title: 'Residential Project', category: 'residential', image: '../images/work1.jpg' }
            ]));
        }

        if (!localStorage.getItem('sag_clients')) {
            localStorage.setItem('sag_clients', JSON.stringify([
                { id: 1, name: 'Infinix India', industry: 'IT / Corporate', logo: '../images/client1.jpg', status: 'Active' },
                { id: 2, name: 'Radisson Hotels', industry: 'Hospitality', logo: '../images/client2.jpg', status: 'Active' },
                { id: 3, name: 'SGPGI Hospital', industry: 'Healthcare', logo: '../images/client3.jpg', status: 'Active' },
                { id: 4, name: 'Toyota', industry: 'Automotive', logo: '../images/client4.jpg', status: 'Active' },
                { id: 5, name: 'CMS', industry: 'Education', logo: '../images/client5.jpg', status: 'Active' },
                { id: 6, name: 'V-Mart', industry: 'Retail', logo: '../images/client6.jpg', status: 'Active' },
                { id: 7, name: 'Omaxe', industry: 'Real Estate', logo: '../images/client7.jpg', status: 'Active' },
                { id: 8, name: 'LDA', industry: 'Government', logo: '../images/client8.jpg', status: 'Active' }
            ]));
        }

        if (!localStorage.getItem('sag_testimonials')) {
            localStorage.setItem('sag_testimonials', JSON.stringify([
                { id: 1, name: 'Rajesh Kumar', designation: 'CEO, Infinix India', rating: 5, text: 'Suman Art Glass delivered exceptional quality for our IT park. Their curtain wall work is world-class. Highly recommended for any commercial project.', photo: '../images/team.jpg' },
                { id: 2, name: 'Priya Singh', designation: 'Director, Radisson Lucknow', rating: 5, text: 'The spider glazing on our hotel facade is stunning. Professional team, timely delivery, and premium craftsmanship. A truly reliable partner.', photo: '../images/team.jpg' },
                { id: 3, name: 'Dr. Amit Verma', designation: 'Admin, SGPGI Hospital', rating: 5, text: 'Outstanding work on our hospital wing. The structural glazing is both beautiful and functional. Their expertise in healthcare facilities is unmatched.', photo: '../images/team.jpg' },
                { id: 4, name: 'Ananya Sharma', designation: 'Manager, V-Mart Retail', rating: 4, text: 'Great glass partition work for our stores. Clean finish and quick installation. Would definitely work with them again.', photo: '../images/team.jpg' }
            ]));
        }

        if (!localStorage.getItem('sag_contacts')) {
            localStorage.setItem('sag_contacts', JSON.stringify([
                { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 98765 43210', service: 'Curtain Wall Glazing', message: 'Looking for curtain wall solutions for commercial building.', status: 'new', date: '2026-07-17' },
                { id: 2, name: 'Ananya Sharma', email: 'ananya@hotel.com', phone: '+91 87654 32109', service: 'Spider Glazing', message: 'Need spider glazing quote for hotel renovation.', status: 'new', date: '2026-07-17' },
                { id: 3, name: 'Vikram Singh', email: 'vikram@builders.com', phone: '+91 76543 21098', service: 'UPVC Windows', message: 'Interested in UPVC windows for residential complex.', status: 'new', date: '2026-07-16' }
            ]));
        }

        if (!localStorage.getItem('sag_settings')) {
            localStorage.setItem('sag_settings', JSON.stringify({
                companyName: 'Suman Art Glass',
                tagline: 'Transforming Spaces with Premium Glass Solutions',
                phone: '+91 98765 43210',
                email: 'info@sumanartglass.com',
                address: '123 Glass Avenue, Industrial Area, Lucknow, UP 226001, India',
                workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
                facebook: 'https://facebook.com/sumanartglass',
                instagram: 'https://instagram.com/sumanartglass',
                linkedin: 'https://linkedin.com/company/sumanartglass',
                whatsapp: '+919876543210'
            }));
        }
    },

    // Compress image if too large
    compressImage(base64, maxSize) {
        return new Promise((resolve) => {
            if (!base64 || base64.length < maxSize) { resolve(base64); return; }
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const ratio = Math.sqrt(maxSize / base64.length);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.onerror = () => resolve(base64);
            img.src = base64;
        });
    },

    getAll(key) { return JSON.parse(localStorage.getItem('sag_' + key) || '[]'); },
    getById(key, id) { return this.getAll(key).find(item => item.id === id); },
    
    async add(key, item) {
        // Security: Sanitize input before storage
        item = this.sanitizeObject(item);
        
        const items = this.getAll(key);
        item.id = Date.now();
        if (item.image && item.image.startsWith('data:') && item.image.length > this.MAX_IMAGE_SIZE) {
            item.image = await this.compressImage(item.image, this.MAX_IMAGE_SIZE);
        }
        if (item.logo && item.logo.startsWith('data:') && item.logo.length > this.MAX_IMAGE_SIZE) {
            item.logo = await this.compressImage(item.logo, this.MAX_IMAGE_SIZE);
        }
        if (item.photo && item.photo.startsWith('data:') && item.photo.length > this.MAX_IMAGE_SIZE) {
            item.photo = await this.compressImage(item.photo, this.MAX_IMAGE_SIZE);
        }
        items.push(item);
        try {
            localStorage.setItem('sag_' + key, JSON.stringify(items));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Storage full! Please delete some items first.');
                return null;
            }
        }
        return item;
    },

    async update(key, id, updates) {
        // Security: Sanitize input before storage
        updates = this.sanitizeObject(updates);
        
        const items = this.getAll(key);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            if (updates.image && updates.image.startsWith('data:') && updates.image.length > this.MAX_IMAGE_SIZE) {
                updates.image = await this.compressImage(updates.image, this.MAX_IMAGE_SIZE);
            }
            if (updates.logo && updates.logo.startsWith('data:') && updates.logo.length > this.MAX_IMAGE_SIZE) {
                updates.logo = await this.compressImage(updates.logo, this.MAX_IMAGE_SIZE);
            }
            if (updates.photo && updates.photo.startsWith('data:') && updates.photo.length > this.MAX_IMAGE_SIZE) {
                updates.photo = await this.compressImage(updates.photo, this.MAX_IMAGE_SIZE);
            }
            items[index] = { ...items[index], ...updates };
            try {
                localStorage.setItem('sag_' + key, JSON.stringify(items));
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    alert('Storage full! Please delete some items first.');
                    return null;
                }
            }
            return items[index];
        }
        return null;
    },

    delete(key, id) {
        const items = this.getAll(key).filter(item => item.id !== id);
        localStorage.setItem('sag_' + key, JSON.stringify(items));
    },

    getSettings() { return JSON.parse(localStorage.getItem('sag_settings') || '{}'); },
    updateSettings(settings) { localStorage.setItem('sag_settings', JSON.stringify(settings)); }
};

// Auto-initialize
DataManager.init();
