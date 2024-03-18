document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.images-container');
    const uncategorized = document.getElementById('uncategorized').querySelector('.images-container');
    const dragTexts = document.querySelectorAll('.images-container > p');

    // Drag start: set the data transfer object with the dragged image ID
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData("text/plain", event.target.id);
        });
    });

    // Allow drop: prevent the default handling to allow dropping
    categories.forEach(category => {
        category.addEventListener('dragover', function(event) {
            event.preventDefault();
        });
    });

    // Drop: handle the image drop into categories or back to uncategorized
    categories.forEach(category => {
        category.addEventListener('drop', function(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData("text/plain");
            const draggedElement = document.getElementById(data);

            // If dropping on the text paragraph, append to its parent (images-container)
            if (event.target.tagName === 'P') {
                event.target.style.display = 'none'; // Hide the "Drag the images here" text
                event.target.parentNode.appendChild(draggedElement);
            } else {
                // Hide the text for the target container if not already hidden
                const dragText = event.target.querySelector('p');
                if (dragText) dragText.style.display = 'none';
                event.target.appendChild(draggedElement);
            }

            // Show/hide the "Drag the images here" text based on whether the category has images
            updateDragTextVisibility();
        });
    });

    // Handle dropping images outside categories to automatically move them to uncategorized
    document.body.addEventListener('drop', function(event) {
        event.preventDefault(); // Prevent default to allow drop
        // Check if dropped outside any category and move the image to uncategorized
        if (!event.target.closest('.category')) {
            const data = event.dataTransfer.getData("text/plain");
            const draggedElement = document.getElementById(data);
            uncategorized.appendChild(draggedElement);
            updateDragTextVisibility();
        }
    });

    function updateDragTextVisibility() {
        dragTexts.forEach(text => {
            const container = text.parentNode;
            const hasImages = container.querySelectorAll('img').length > 0;
            text.style.display = hasImages ? 'none' : 'block';
        });
    }
});
