// Admin Panel JavaScript - Full CRUD with base64 image support

// Security: Input sanitization function
function sanitizeInput(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Security: Sanitize all form inputs before save
function sanitizeFormData(data) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            sanitized[key] = sanitizeInput(value);
        } else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}

function checkAuth() {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    window.location.href = 'login.html';
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;top:20px;right:20px;padding:1rem 1.5rem;border-radius:8px;color:white;font-weight:600;z-index:10000;animation:slideIn 0.3s ease;box-shadow:0 10px 25px rgba(0,0,0,0.2);';
    if (type === 'success') toast.style.background = '#22c55e';
    else if (type === 'error') toast.style.background = '#ef4444';
    else toast.style.background = '#3b82f6';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) { resolve(null); return; }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Modal Functions
function openModal(type, key, id = null) {
    const modal = document.getElementById(key + 'Modal');
    if (!modal) return;
    modal.classList.add('active');
    const titleEl = document.getElementById('modalTitle');
    if (titleEl) titleEl.textContent = id ? 'Edit ' + capitalize(key) : 'Add New ' + capitalize(key);
    
    if (id) {
        const item = DataManager.getById(key, id);
        if (item) {
            modal.dataset.editId = id;
            populateForm(key, item);
        }
    } else {
        modal.dataset.editId = '';
        const form = modal.querySelector('form') || modal.querySelector('.modal-body');
        if (form) {
            form.querySelectorAll('input:not([type="file"]):not([readonly])').forEach(i => i.value = '');
            form.querySelectorAll('textarea').forEach(i => i.value = '');
            form.querySelectorAll('select').forEach(i => i.selectedIndex = 0);
        }
        const preview = document.getElementById('imagePreview');
        if (preview) preview.innerHTML = '';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.dataset.editId = '';
    }
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// Populate form with existing data
function populateForm(key, item) {
    const modal = document.getElementById(key + 'Modal');
    if (!modal) return;
    Object.keys(item).forEach(k => {
        if (k === 'id' || k === 'image' || k === 'logo' || k === 'photo') return;
        const input = modal.querySelector('[name="' + k + '"], #' + k);
        if (input && input.type !== 'file') {
            input.value = item[k];
        }
    });
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// Read image file as base64
async function readImageFile(inputId) {
    const input = document.getElementById(inputId);
    if (input && input.files && input.files[0]) {
        const base64 = await fileToBase64(input.files[0]);
        return base64;
    }
    return null;
}

// ============ PROJECTS CRUD ============
async function saveProject() {
    const name = document.getElementById('projectName')?.value;
    const category = document.getElementById('projectCategory')?.value;
    const location = document.getElementById('projectLocation')?.value;
    const description = document.getElementById('projectDescription')?.value || '';
    const status = document.getElementById('projectStatus')?.value || 'Completed';
    const company = document.getElementById('projectCompany')?.value || '';
    
    if (!name || !category || !location) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const modal = document.getElementById('projectModal');
    const editId = modal?.dataset.editId ? parseInt(modal.dataset.editId) : null;
    
    let image = '../images/project-infinix.jpg';
    const newImage = await readImageFile('projectImage');
    if (newImage) {
        image = newImage;
    } else if (editId) {
        const existing = DataManager.getById('projects', editId);
        if (existing) image = existing.image;
    }

    const data = sanitizeFormData({ name, category, location, description, status, company, image });

    if (editId) {
        DataManager.update('projects', editId, data);
        showToast('Project updated successfully!');
    } else {
        DataManager.add('projects', data);
        showToast('Project added successfully!');
    }
    
    closeModal('projectModal');
    if (typeof loadProjects === 'function') loadProjects();
}

function editProject(id) { openModal('edit', 'project', id); }

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        DataManager.delete('projects', id);
        showToast('Project deleted successfully!');
        if (typeof loadProjects === 'function') loadProjects();
    }
}

// ============ SERVICES CRUD ============
function saveService() {
    const name = document.getElementById('serviceName')?.value;
    const category = document.getElementById('serviceCategory')?.value;
    const description = document.getElementById('serviceDescription')?.value || '';
    
    if (!name || !category) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const modal = document.getElementById('serviceModal');
    const editId = modal?.dataset.editId ? parseInt(modal.dataset.editId) : null;
    const data = sanitizeFormData({ name, category, description, icon: category });

    if (editId) {
        DataManager.update('services', editId, data);
        showToast('Service updated successfully!');
    } else {
        DataManager.add('services', data);
        showToast('Service added successfully!');
    }
    
    closeModal('serviceModal');
    if (typeof loadServices === 'function') loadServices();
}

function editService(id) { openModal('edit', 'service', id); }

function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        DataManager.delete('services', id);
        showToast('Service deleted successfully!');
        if (typeof loadServices === 'function') loadServices();
    }
}

// ============ GALLERY CRUD ============
async function saveGalleryItem() {
    const title = document.getElementById('galleryTitle')?.value;
    const category = document.getElementById('galleryCategory')?.value;
    
    if (!title || !category) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const modal = document.getElementById('galleryModal');
    const editId = modal?.dataset.editId ? parseInt(modal.dataset.editId) : null;
    
    let image = '../images/work1.jpg';
    const newImage = await readImageFile('galleryImage');
    if (newImage) {
        image = newImage;
    } else if (editId) {
        const existing = DataManager.getById('gallery', editId);
        if (existing) image = existing.image;
    }

    const data = { title, category, image };

    if (editId) {
        DataManager.update('gallery', editId, data);
        showToast('Gallery item updated!');
    } else {
        DataManager.add('gallery', data);
        showToast('Gallery item added!');
    }
    
    closeModal('galleryModal');
    if (typeof loadGallery === 'function') loadGallery();
}

function editGalleryItem(id) { openModal('edit', 'gallery', id); }

function deleteGalleryItem(id) {
    if (confirm('Delete this gallery item?')) {
        DataManager.delete('gallery', id);
        showToast('Gallery item deleted!');
        if (typeof loadGallery === 'function') loadGallery();
    }
}

// ============ CLIENTS CRUD ============
async function saveClient() {
    const name = document.getElementById('clientName')?.value;
    const industry = document.getElementById('clientIndustry')?.value;
    const status = document.getElementById('clientStatus')?.value || 'Active';
    
    if (!name) {
        showToast('Please enter client name', 'error');
        return;
    }

    const modal = document.getElementById('clientModal');
    const editId = modal?.dataset.editId ? parseInt(modal.dataset.editId) : null;
    
    let logo = '../images/client1.jpg';
    const newImage = await readImageFile('clientImage');
    if (newImage) {
        logo = newImage;
    } else if (editId) {
        const existing = DataManager.getById('clients', editId);
        if (existing) logo = existing.logo;
    }

    const data = { name, industry, status, logo };

    if (editId) {
        DataManager.update('clients', editId, data);
        showToast('Client updated!');
    } else {
        DataManager.add('clients', data);
        showToast('Client added!');
    }
    
    closeModal('clientModal');
    if (typeof loadClients === 'function') loadClients();
}

function editClient(id) { openModal('edit', 'client', id); }

function deleteClient(id) {
    if (confirm('Delete this client?')) {
        DataManager.delete('clients', id);
        showToast('Client deleted!');
        if (typeof loadClients === 'function') loadClients();
    }
}

// ============ TESTIMONIALS CRUD ============
async function saveTestimonial() {
    const name = document.getElementById('testimonialName')?.value;
    const designation = document.getElementById('testimonialDesignation')?.value || '';
    const text = document.getElementById('testimonialText')?.value || '';
    const rating = document.getElementById('testimonialRating')?.value || '5';
    
    if (!name || !text) {
        showToast('Please fill in name and testimonial', 'error');
        return;
    }

    const modal = document.getElementById('testimonialModal');
    const editId = modal?.dataset.editId ? parseInt(modal.dataset.editId) : null;
    
    let photo = '../images/team.jpg';
    const newImage = await readImageFile('testimonialPhoto');
    if (newImage) {
        photo = newImage;
    } else if (editId) {
        const existing = DataManager.getById('testimonials', editId);
        if (existing) photo = existing.photo;
    }

    const data = { name, designation, text, rating: parseInt(rating), photo };

    if (editId) {
        DataManager.update('testimonials', editId, data);
        showToast('Testimonial updated!');
    } else {
        DataManager.add('testimonials', data);
        showToast('Testimonial added!');
    }
    
    closeModal('testimonialModal');
    if (typeof loadTestimonials === 'function') loadTestimonials();
}

function editTestimonial(id) { openModal('edit', 'testimonial', id); }

function deleteTestimonial(id) {
    if (confirm('Delete this testimonial?')) {
        DataManager.delete('testimonials', id);
        showToast('Testimonial deleted!');
        if (typeof loadTestimonials === 'function') loadTestimonials();
    }
}

// ============ CONTACTS ============
function deleteContact(id) {
    if (confirm('Delete this inquiry?')) {
        DataManager.delete('contacts', id);
        showToast('Inquiry deleted!');
        if (typeof loadContacts === 'function') loadContacts();
    }
}

// ============ BILLING ============
function generateInvoiceNumber() {
    const invoices = JSON.parse(localStorage.getItem('sag_invoices') || '[]');
    const num = invoices.length + 1;
    return 'INV-2026-' + String(num).padStart(3, '0');
}

// Tab switching
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const selectAll = document.querySelector('thead input[type="checkbox"]');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            document.querySelectorAll('tbody input[type="checkbox"]').forEach(cb => {
                cb.checked = this.checked;
            });
        });
    }
});

// Search
function searchTable(input, tableId) {
    const filter = input.toLowerCase();
    const table = document.getElementById(tableId);
    if (!table) return;
    table.querySelectorAll('tbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
    });
}

// Format INR
function formatINR(num) {
    return '₹' + num.toLocaleString('en-IN');
}
