document.addEventListener('DOMContentLoaded', () => {
    const draggableImages = document.querySelectorAll('img');

    draggableImages.forEach(img => {
        img.addEventListener('touchstart', function(event) {
            // Initiate drag logic here
            // For example, set this image as the one being dragged
        });

        img.addEventListener('touchmove', function(event) {
            // Implement dragging logic here
            // For example, update the position of the image based on touch coordinates
            event.preventDefault(); // This might be necessary to prevent scrolling while dragging
        });

        img.addEventListener('touchend', function(event) {
            // Complete the drag operation here
            // For example, drop the image into a new location
        });

        // Prevent the context menu from showing on long press
        img.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
    });
});
