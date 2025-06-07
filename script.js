// Keep the existing thinkPads array
const thinkPads = [
    {
        id: 1,
        name: "ThinkPad T14 Gen 3 (Intel)",
        series: "T Series",
        cpu: "Up to 12th Gen Intel Core i7 vPro",
        ram: "Up to 48GB DDR4",
        storage: "Up to 2TB PCIe SSD",
        screenSize: "14 inch",
        resolution: "Up to WQUXGA (3840 x 2400)",
        graphics: "Intel Iris Xe Graphics",
        image: "images/t14_gen3.jpg",
        priceRange: "€1500-€2500"
    },
    {
        id: 2,
        name: "ThinkPad X1 Carbon Gen 10",
        series: "X1 Series",
        cpu: "Up to 12th Gen Intel Core i7 vPro",
        ram: "Up to 32GB LPDDR5",
        storage: "Up to 2TB PCIe SSD",
        screenSize: "14 inch",
        resolution: "Up to 2.8K OLED (2880 x 1800)",
        graphics: "Intel Iris Xe Graphics",
        image: "images/x1_carbon_gen10.jpg",
        priceRange: "€1800-€3000"
    },
    {
        id: 3,
        name: "ThinkPad P16 Gen 1",
        series: "P Series",
        cpu: "Up to 12th Gen Intel Core i9 vPro",
        ram: "Up to 128GB DDR5",
        storage: "Up to 8TB PCIe SSD (2x 4TB)",
        screenSize: "16 inch",
        resolution: "Up to WQUXGA (3840 x 2400)",
        graphics: "Up to NVIDIA RTX A5500",
        image: "images/p16_gen1.jpg",
        priceRange: "€2500-€5000+"
    },
    {
        id: 4,
        name: "ThinkPad T16 Gen 1 (AMD)",
        series: "T Series",
        cpu: "AMD Ryzen PRO 6000 Series",
        ram: "Up to 32GB DDR4",
        storage: "Up to 2TB PCIe SSD",
        screenSize: "16 inch",
        resolution: "Up to WQXGA (2560 x 1600)",
        graphics: "Integrated AMD Radeon Graphics",
        image: "images/t16_amd.jpg",
        priceRange: "€1400-€2200"
    }
];

const thinkpadGrid = document.querySelector('.thinkpad-grid');
const seriesFilter = document.getElementById('filter-series');
const sortBy = document.getElementById('sort-by');

function populateSeriesFilter() {
    if (!seriesFilter) {
        console.error("Series filter dropdown not found!");
        return;
    }
    const series = [...new Set(thinkPads.map(p => p.series))]; // Get unique series
    series.forEach(s => {
        const option = document.createElement('option');
        option.value = s;
        option.textContent = s;
        seriesFilter.appendChild(option);
    });
}

function displayThinkPads(padsToDisplay) {
    if (!thinkpadGrid) {
        console.error("ThinkPad grid not found!");
        return;
    }
    thinkpadGrid.innerHTML = ''; // Clear existing items

    // Fallback to global thinkPads if padsToDisplay is not directly manipulated by filters/sorts yet
    let currentPads = padsToDisplay;

    const selectedSeries = seriesFilter ? seriesFilter.value : 'all';
    const sortValue = sortBy ? sortBy.value : 'name-asc';

    let filteredPads = [...padsToDisplay]; // Create a copy to sort/filter

    // Filter by series
    if (selectedSeries !== 'all') {
        filteredPads = filteredPads.filter(pad => pad.series === selectedSeries);
    }

    // Sort
    if (sortValue === 'name-asc') {
        filteredPads.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'name-desc') {
        filteredPads.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (filteredPads.length === 0) {
        thinkpadGrid.innerHTML = '<p class="no-results">Keine ThinkPads entsprechen den aktuellen Filterkriterien.</p>';
        return;
    }

    filteredPads.forEach(pad => {
        const item = document.createElement('div');
        item.className = 'thinkpad-item';
        item.id = `thinkpad-${pad.id}`;
        // Add a placeholder for the image and a div for text content
        item.innerHTML = `
            <div class="thinkpad-item-image-placeholder">
                <img src="${pad.image || 'images/placeholder.png'}" alt="Placeholder für ${pad.name}">
            </div>
            <div class="thinkpad-item-details">
                <h3>${pad.name}</h3>
                <p><strong>Series:</strong> ${pad.series}</p>
                <p><strong>CPU:</strong> ${pad.cpu}</p>
                <p><strong>RAM:</strong> ${pad.ram}</p>
                <p><strong>Storage:</strong> ${pad.storage}</p>
                <p><strong>Screen:</strong> ${pad.screenSize || 'N/A'}, ${pad.resolution || 'N/A'}</p>
                <p><strong>Graphics:</strong> ${pad.graphics || 'N/A'}</p>
                <p><strong>Price:</strong> ${pad.priceRange || 'N/A'}</p>
            </div>
        `;
        thinkpadGrid.appendChild(item);
    });
}

function updateDisplay() {
    displayThinkPads(thinkPads);
}

// Event Listeners
if (seriesFilter) {
    seriesFilter.addEventListener('change', updateDisplay);
}
if (sortBy) {
    sortBy.addEventListener('change', updateDisplay);
}

// Initial Population
document.addEventListener('DOMContentLoaded', () => {
    populateSeriesFilter();
    updateDisplay(); // Initial display
});

// Navigation Logic
const navOverview = document.getElementById('nav-overview');
const navGuide = document.getElementById('nav-guide');
const overviewSection = document.getElementById('overview');
const guideSection = document.getElementById('guide');

function showSection(sectionToShow, activeNav) {
    // Hide all sections
    if (overviewSection) overviewSection.style.display = 'none';
    if (guideSection) guideSection.style.display = 'none';

    // Remove active class from all nav links
    if (navOverview) navOverview.classList.remove('active');
    if (navGuide) navGuide.classList.remove('active');

    // Show the target section
    if (sectionToShow) sectionToShow.style.display = 'block';
    // Add active class to the clicked nav link
    if (activeNav) activeNav.classList.add('active');
}

if (navOverview && navGuide && overviewSection && guideSection) {
    navOverview.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(overviewSection, navOverview);
    });

    navGuide.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(guideSection, navGuide);
    });
} else {
    console.error("Navigation elements or sections not found. Tab switching may not work.");
}

// Initial state is set by HTML (guide display:none) and CSS (.active on nav-overview)
// If explicit JS control is needed on load for some reason:
/*
document.addEventListener('DOMContentLoaded', () => {
    // Make sure this is *after* the existing DOMContentLoaded content for filters
    // or integrate it into the existing one.
    if (overviewSection && navOverview) { // Check if elements exist
        showSection(overviewSection, navOverview); // Set initial view
    }
});
*/
