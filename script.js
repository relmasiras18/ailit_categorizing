document.addEventListener('DOMContentLoaded', () => {
    let draggedElement = null;

    // Function to start dragging
    function onTouchStart(event) {
        if (event.target.tagName === 'IMG') {
            draggedElement = event.target;
            // Optional: Add a class or style to indicate dragging
            draggedElement.classList.add('dragging');
        }
    }

    // Function to move the dragged element
    function onTouchMove(event) {
        if (!draggedElement) return;

        event.preventDefault(); // Prevent scrolling when dragging

        // Optional: Update the position of the dragged element here
        // This might involve translating the element based on touch coordinates
        // For simplicity, this step is not implemented in this snippet
    }

    // Function to drop the dragged element
    function onTouchEnd(event) {
        if (!draggedElement) return;

        // Assuming 'categories' is a NodeList of drop targets
        const categories = document.querySelectorAll('.images-container');
        categories.forEach(category => {
            // Implement logic to determine if the dragged element is over a drop target
            // This might involve checking the touch point coordinates against the drop target's boundaries
            // For simplicity, this step is not implemented in this snippet

            // If over a target, append the dragged element to the category
            // category.appendChild(draggedElement);
        });

        // Clean up
        draggedElement.classList.remove('dragging');
        draggedElement = null;
    }

    // Add touch event listeners to the images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('touchstart', onTouchStart);
        img.addEventListener('touchmove', onTouchMove);
        img.addEventListener('touchend', onTouchEnd);
    });

    // Optionally, add touch event listeners to the drop targets as well
    document.querySelectorAll('.images-container').forEach(container => {
        container.addEventListener('touchend', onTouchEnd);
    });
});
