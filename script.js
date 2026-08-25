document.addEventListener('DOMContentLoaded', () => {

    const propertyData = [
        {
            id: "property-001",
            title: " — Modern Two-Bedroom Apartment",
            status: "rental",
            type: "Apartment",
            location: "Downtown Central",
            price: 1850,
            bedrooms: 2,
            bathrooms: 2,
            area: "1,100 sq ft",
            image: "images/property-001.jpg",
            description: " PROPERTY — Bright second-floor apartment featuring open-concept living, modern kitchen appliances, in-unit laundry hookups, and a private balcony overlooking the city park.",
            features: [
                " — In-Unit Washer/Dryer",
                " — Private Balcony",
                " — Underground Parking",
                " — Central Air Conditioning"
            ]
        },
        {
            id: "property-002",
            title: " — Spacious Family Suburban House",
            status: "sale",
            type: "House",
            location: "Oakwood Estates",
            price: 345000,
            bedrooms: 4,
            bathrooms: 3,
            area: "2,400 sq ft",
            image: "images/property-002.png",
            description: " PROPERTY — Well-maintained suburban single-family home with attached 2-car garage, fenced backyard, updated kitchen, and master suite with walk-in closet.",
            features: [
                " — Fenced Yard",
                " — 2-Car Garage",
                " — Renovated Kitchen",
                " — Quiet Neighborhood"
            ]
        },
        {
            id: "property-003",
            title: " — Cozy Urban Studio Unit",
            status: "rental",
            type: "Studio",
            location: "Downtown Central",
            price: 1200,
            bedrooms: 1,
            bathrooms: 1,
            area: "550 sq ft",
            image: "images/property-003.jpg",
            description: " PROPERTY — Efficient and stylish downtown studio residence with high ceilings, large windows, and utilities included in monthly rent.",
            features: [
                " — Utilities Included",
                " — High-Speed Internet Ready",
                " — Elevator Access",
                " — Secure Keycard Entry"
            ]
        },
        {
            id: "property-004",
            title: "🏡 Newly Renovated 3-Bedroom Colonial",
            status: "rental",
            type: "House",
            location: "Secaucus, NJ",
            price: 4000,
            bedrooms: 3,
            bathrooms: 2,
            area: "50 × 100 ft lot",
            images:  [
    "images/property 004/nj new home1.webp",
    "images/property 004/nj new home2.webp",
    "images/property 004/nj new home3.webp",
    "images/property 004/nj new home4.webp",
    "images/property 004/nj new home5.webp",
    "images/property 004/nj new home6.webp",
    "images/property 004/nj new home7.webp",
    "images/property 004/nj new home8.webp",
    "images/property 004/nj new home9.webp",
    "images/property 004/nj new home10.webp",
    "images/property 004/nj new home11.webp",
    "images/property 004/nj new home12.webp"
],
            description: "🏡 Newly renovated 3-bedroom, 2-full-bath Colonial located in the heart of Secaucus. Features include a bright living room, formal dining area, family room with a wood-burning fireplace, updated kitchen, finished basement with a second full bathroom and laundry area, private backyard, attached garage, and oversized driveway.",
            features: [
                "🚗 Attached Garage",
                "🌳 Private Backyard",
                "🔥 Wood-Burning Fireplace",
                "🧺 Washer & Dryer",
                "🍽️ Dishwasher & Refrigerator",
                "❄️ Air Conditioning",
                "🔥 Natural Gas & Oil Heating",
                "🏡 Finished Basement",
                "🚘 Oversized Driveway",
                "✨ Newly Renovated"
            ]
        }
    ];
    let activeProperties = [...propertyData];
    let selectedPropertyForInquiry = null;

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navRentalsLink = document.getElementById('navRentalsLink');
    const navSaleLink = document.getElementById('navSaleLink');
    
    const filterForm = document.getElementById('filterForm');
    const filterStatus = document.getElementById('filterStatus');
    const filterType = document.getElementById('filterType');
    const filterLocation = document.getElementById('filterLocation');
    const filterMinBudget = document.getElementById('filterMinBudget');
    const filterMaxBudget = document.getElementById('filterMaxBudget');
    const filterBedrooms = document.getElementById('filterBedrooms');
    const filterBathrooms = document.getElementById('filterBathrooms');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    const propertyCountText = document.getElementById('propertyCountText');
    const propertyGrid = document.getElementById('propertyGrid');
    
    const propertyModal = document.getElementById('propertyModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBody = document.getElementById('modalBody');

    const housingRequestForm = document.getElementById('housingRequestForm');
    const propertySubmissionForm = document.getElementById('propertySubmissionForm');
    const selectedPropertyNotice = document.getElementById('selectedPropertyNotice');
    const selectedPropertyTitle = document.getElementById('selectedPropertyTitle');
    const interestedPropertyInput = document.getElementById('interestedPropertyInput');
    const clearSelectedPropertyBtn = document.getElementById('clearSelectedPropertyBtn');

    function init() {
        populateLocationFilterOptions();
        renderPropertyList(activeProperties);
        setupEventListeners();
        setCurrentYearInFooter();
    }

    function setCurrentYearInFooter() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function setupEventListeners() {
        if (hamburgerBtn && mainNav) {
            hamburgerBtn.addEventListener('click', () => {
                const isOpen = mainNav.classList.toggle('is-open');
                hamburgerBtn.setAttribute('aria-expanded', isOpen);
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    mainNav.classList.remove('is-open');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        if (navRentalsLink) {
            navRentalsLink.addEventListener('click', () => {
                filterStatus.value = 'rental';
                applyFilters();
            });
        }
        if (navSaleLink) {
            navSaleLink.addEventListener('click', () => {
                filterStatus.value = 'sale';
                applyFilters();
            });
        }

        filterForm.querySelectorAll('select, input').forEach(element => {
            element.addEventListener('input', applyFilters);
        });

        clearFiltersBtn.addEventListener('click', resetFilters);

        modalCloseBtn.addEventListener('click', closeModal);
        propertyModal.addEventListener('click', (e) => {
            if (e.target === propertyModal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !propertyModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        if (clearSelectedPropertyBtn) {
            clearSelectedPropertyBtn.addEventListener('click', clearPropertyInquirySelection);
        }

        if (housingRequestForm) {
            housingRequestForm.addEventListener('submit', (e) => handleFormSubmission(e, housingRequestForm, 'housingFormFeedback'));
        }
        if (propertySubmissionForm) {
            propertySubmissionForm.addEventListener('submit', (e) => handleFormSubmission(e, propertySubmissionForm, 'propertyFormFeedback'));
        }
    }

  function populateLocationFilterOptions() {
    const locations = [
        "Atlanta, GA",
        "Austin, TX",
        "Baltimore, MD",
        "Boston, MA",
        "Charlotte, NC",
        "Chicago, IL",
        "Cleveland, OH",
        "Columbus, OH",
        "Dallas, TX",
        "Denver, CO",
        "Detroit, MI",
        "Fort Worth, TX",
        "Honolulu, HI",
        "Houston, TX",
        "Indianapolis, IN",
        "Jacksonville, FL",
        "Kansas City, MO",
        "Las Vegas, NV",
        "Los Angeles, CA",
        "Memphis, TN",
        "Miami, FL",
        "Milwaukee, WI",
        "Minneapolis, MN",
        "Nashville, TN",
        "New Orleans, LA",
        "New York, NY",
        "Oakland, CA",
        "Oklahoma City, OK",
        "Omaha, NE",
        "Orlando, FL",
        "Philadelphia, PA",
        "Phoenix, AZ",
        "Pittsburgh, PA",
        "Portland, OR",
        "Raleigh, NC",
        "Sacramento, CA",
        "Salt Lake City, UT",
        "San Antonio, TX",
        "San Diego, CA",
        "San Francisco, CA",
        "San Jose, CA",
        "Seattle, WA",
        "St. Louis, MO",
        "Tampa, FL",
        "Tucson, AZ",
        "Tulsa, OK",
        "Virginia Beach, VA",
        "Washington, DC",
        "Wichita, KS"
    ];

    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        filterLocation.appendChild(option);
    });
}

    function applyFilters() {
        const statusVal = filterStatus.value;
        const typeVal = filterType.value;
        const locationVal = filterLocation.value;
        const minBudgetVal = parseFloat(filterMinBudget.value) || 0;
        const maxBudgetVal = parseFloat(filterMaxBudget.value) || Infinity;
        const bedroomsVal = filterBedrooms.value;
        const bathroomsVal = filterBathrooms.value;

        activeProperties = propertyData.filter(item => {
            if (statusVal !== 'all' && item.status !== statusVal) return false;
            if (typeVal !== 'all' && item.type !== typeVal) return false;
            if (locationVal !== 'all' && item.location !== locationVal) return false;
            if (item.price < minBudgetVal || item.price > maxBudgetVal) return false;
            if (bedroomsVal !== 'all' && item.bedrooms < parseInt(bedroomsVal, 10)) return false;
            if (bathroomsVal !== 'all' && item.bathrooms < parseInt(bathroomsVal, 10)) return false;

            return true;
        });

        renderPropertyList(activeProperties);
    }

    function resetFilters() {
        filterForm.reset();
        activeProperties = [...propertyData];
        renderPropertyList(activeProperties);
    }

    function renderPropertyList(properties) {
        const count = properties.length;
        propertyCountText.textContent = `Showing ${count} ${count === 1 ? 'property' : 'properties'}`;

        propertyGrid.innerHTML = '';

        if (count === 0) {
            propertyGrid.innerHTML = `
                <div class="no-results">
                    <h3>No properties match your current filters.</h3>
                    <p>Try adjusting your budget, property type, or clearing filters to view available homes.</p>
                </div>
            `;
            return;
        }

        properties.forEach(item => {
            const card = document.createElement('article');
            card.className = 'property-card';

            const formattedPrice = item.status === 'rental' 
                ? `$${item.price.toLocaleString()}/mo` 
                : `$${item.price.toLocaleString()}`;

            const badgeClass = item.status === 'rental' ? 'badge-rental' : 'badge-sale';
            const badgeLabel = item.status === 'rental' ? 'For Rent' : 'For Sale';

            card.innerHTML = `
                <div class="property-image-wrapper">
                    <img src="${item.image}" alt="${item.title}" class="property-image" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x400?text=Havelyne+Homes+Listing';">
                    <div class="property-badges">
                        <span class="badge-tag ${badgeClass}">${badgeLabel}</span>
                        <span class="badge-tag badge-"></span>
                    </div>
                </div>
                <div class="property-card-body">
                    <div class="property-price">${formattedPrice}</div>
                    <h3 class="property-title">${item.title}</h3>
                    <div class="property-location">📍 ${item.location}</div>
                    
                    <div class="property-specs">
                        <span class="spec-item">🛏 ${item.bedrooms} Bed</span>
                        <span class="spec-item">🛁 ${item.bathrooms} Bath</span>
                        <span class="spec-item">📐 ${item.area}</span>
                    </div>

                    <p class="property-description">${item.description.substring(0, 110)}...</p>

                    <div class="property-card-actions">
                        <button type="button" class="btn btn-outline btn-sm view-details-btn" data-id="${item.id}">View Details</button>
                        <button type="button" class="btn btn-primary btn-sm ask-property-btn" data-id="${item.id}">Ask About This</button>
                    </div>
                </div>
            `;

            propertyGrid.appendChild(card);
        });

        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                openModal(id);
            });
        });

        document.querySelectorAll('.ask-property-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                selectPropertyForInquiry(id);
            });
        });
    }

    function openModal(propertyId) {
        const item = propertyData.find(p => p.id === propertyId);
        if (!item) return;

        const formattedPrice = item.status === 'rental' 
            ? `$${item.price.toLocaleString()}/mo` 
            : `$${item.price.toLocaleString()}`;

        const badgeClass = item.status === 'rental' ? 'badge-rental' : 'badge-sale';
        const badgeLabel = item.status === 'rental' ? 'For Rent' : 'For Sale';

        const featuresHTML = item.features.map(f => `<span class="modal-feature-tag">✓ ${f}</span>`).join('');

        modalBody.innerHTML = `
            <div class="modal-image-wrapper">
                <img src="${item.image}" alt="${item.title}" class="modal-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/800x500?text=Havelyne+Homes+Listing';">
            </div>
            <div class="modal-header-info">
                <div class="modal-title-group">
                    <span class="badge-tag ${badgeClass}">${badgeLabel}</span>
                    <span class="badge-tag badge-"> LISTING</span>
                    <h2 id="modalTitle" class="m-top">${item.title}</h2>
                    <p class="property-location">📍 ${item.location} (${item.type})</p>
                </div>
                <div class="modal-price-tag">${formattedPrice}</div>
            </div>

            <div class="property-specs">
                <span class="spec-item">Bedrooms: ${item.bedrooms}</span>
                <span class="spec-item">Bathrooms: ${item.bathrooms}</span>
                <span class="spec-item">Total Area: ${item.area}</span>
            </div>

            <h4>Property Overview</h4>
            <p class="m-top" style="color: var(--muted-text); line-height: 1.6;">${item.description}</p>

            <h4 class="m-top">Features & Amenities</h4>
            <div class="modal-features-list">
                ${featuresHTML}
            </div>

            <div class="m-top">
                <button type="button" class="btn btn-primary w-full" id="modalInquireBtn">Ask About This Property</button>
            </div>
        `;

        propertyModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        document.getElementById('modalInquireBtn').addEventListener('click', () => {
            closeModal();
            selectPropertyForInquiry(item.id);
        });
    }

    function closeModal() {
        propertyModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function selectPropertyForInquiry(propertyId) {
        const item = propertyData.find(p => p.id === propertyId);
        if (!item) return;

        selectedPropertyForInquiry = item;

        selectedPropertyTitle.textContent = `${item.title} (${item.id})`;
        interestedPropertyInput.value = `Property ID: ${item.id} - ${item.title}`;
        selectedPropertyNotice.classList.remove('hidden');

        const targetSection = document.getElementById('request-housing');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function clearPropertyInquirySelection() {
        selectedPropertyForInquiry = null;
        selectedPropertyTitle.textContent = 'None';
        interestedPropertyInput.value = 'General Inquiry';
        selectedPropertyNotice.classList.add('hidden');
    }

    function handleFormSubmission(event, formElement, feedbackElementId) {
        event.preventDefault();
        
        const feedbackEl = document.getElementById(feedbackElementId);
        feedbackEl.className = 'form-feedback';
        feedbackEl.textContent = '';

        formElement.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-invalid');
            input.removeAttribute('aria-invalid');
        });
        formElement.querySelectorAll('.error-message').forEach(span => span.textContent = '');

        let isValid = true;

        const requiredInputs = formElement.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            const errorSpan = document.getElementById(`err-${input.id}`);
            const val = input.value.trim();

            if (!val) {
                isValid = false;
                markFieldInvalid(input, errorSpan, 'Please complete this required field.');
            } else if (input.type === 'email' && !validateEmail(val)) {
                isValid = false;
                markFieldInvalid(input, errorSpan, 'Please enter a valid email address.');
            } else if (input.type === 'tel' && val.length < 7) {
                isValid = false;
                markFieldInvalid(input, errorSpan, 'Please enter a valid phone number.');
            }
        });

        if (!isValid) {
            feedbackEl.classList.add('error');
            feedbackEl.textContent = 'Please fix the highlighted errors above before submitting.';
            return;
        }

        const honeypot = formElement.querySelector('input[name="_gotcha"]');
        if (honeypot && honeypot.value !== '') {
            return;
        }

        const formData = new FormData(formElement);
        const actionUrl = formElement.getAttribute('action');

        if (!actionUrl || !actionUrl.startsWith('https://formspree.io/f/')) {
            feedbackEl.classList.add('error');
            feedbackEl.textContent = 'Form configuration incomplete: Please set your real Formspree endpoint in index.html.';
            return;
        }

        const submitButton = formElement.querySelector('button[type="submit"]');
        const originalBtnText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            submitButton.disabled = false;
            submitButton.textContent = originalBtnText;

            if (response.ok) {
                feedbackEl.classList.add('success');
                feedbackEl.textContent = 'Thank you! Your request has been received. We will be in touch shortly.';
                formElement.reset();
                if (formElement.id === 'housingRequestForm') clearPropertyInquirySelection();
            } else {
                response.json().then(data => {
                    feedbackEl.classList.add('error');
                    if (Object.hasOwn(data, 'errors')) {
                        feedbackEl.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        feedbackEl.textContent = 'An error occurred while submitting. Please try again or contact us directly.';
                    }
                });
            }
        })
        .catch(error => {
            submitButton.disabled = false;
            submitButton.textContent = originalBtnText;
            feedbackEl.classList.add('error');
            feedbackEl.textContent = 'Network failure. Please check your connection and try again.';
        });
    }

    function markFieldInvalid(inputElement, errorSpanElement, message) {
        inputElement.classList.add('is-invalid');
        inputElement.setAttribute('aria-invalid', 'true');
        if (errorSpanElement) {
            errorSpanElement.textContent = message;
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    init();
});
