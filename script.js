document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.images-container');
    const uncategorized = document.getElementById('uncategorized').querySelector('.images-container');
    const dragTexts = document.querySelectorAll('.images-container > p');

    // Helper function to handle the start of a drag or touch event
    function handleDragStart(event, elementId) {
        event.dataTransfer.setData("text/plain", elementId);
    }

    document.querySelectorAll('img').forEach(img => {
        // Handle drag start for mouse interactions
        img.addEventListener('dragstart', function(event) {
            handleDragStart(event, event.target.id);
        });

        // Add touchstart listener for touch interactions
        img.addEventListener('touchstart', function(event) {
            handleDragStart(event, event.target.id);
        }, {passive: true}); // Use passive event listeners if possible to improve performance
    });

    // Generic function to prevent default behavior and allow drop
    function allowDrop(event) {
        event.preventDefault();
    }

    categories.forEach(category => {
        // Allow drop for mouse interactions
        category.addEventListener('dragover', allowDrop);

        // Allow drop for touch interactions (might require additional logic for touch devices)
        category.addEventListener('touchmove', allowDrop, {passive: false});
    });

    // Generic function to handle drop for both drag and touch events
    function handleDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(data);

        let dropTarget = event.target;
        if (event.target.tagName === 'P') {
            // If dropping on the text paragraph, append to its parent (images-container)
            dropTarget = event.target.parentNode;
            event.target.style.display = 'none'; // Hide the "Drag images here" text
        }
        dropTarget.appendChild(draggedElement);

        updateDragTextVisibility();
    }

    categories.forEach(category => {
        // Handle drop for mouse interactions
        category.addEventListener('drop', handleDrop);

        // Handle drop for touch interactions
        category.addEventListener('touchend', handleDrop, {passive: false});
    });

    // Update the visibility of drag texts based on the presence of images
    function updateDragTextVisibility() {
        dragTexts.forEach(text => {
            const container = text.parentNode;
            const hasImages = container.querySelectorAll('img').length > 0;
            text.style.display = hasImages ? 'none' : 'block';
        });
    }
});
