document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.images-container');
    let source = null; // Keep track of the element being dragged

    // Function to check if an element should be placed before another
    function isbefore(a, b) {
        if (a.parentNode === b.parentNode) {
            for (var cur = a; cur; cur = cur.previousSibling) {
                if (cur === b) { 
                    return true;
                }
            }
        }
        return false;
    }

    document.querySelectorAll('img').forEach(img => {
        // Making images draggable
        img.setAttribute('draggable', true);
        img.addEventListener('dragstart', function(e) {
            source = e.target;
            e.dataTransfer.effectAllowed = 'move';
        });

        // Suppress the context menu on long press for touch devices
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, {passive: false});
    });

    // Handling dragover event to allow dropping
    categories.forEach(category => {
        category.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        // Handling drop event to perform the drop
        category.addEventListener('drop', function(e) {
            e.preventDefault();
            if (!source) return;

            // Perform the drop based on the relative positions of the source and target
            if (isbefore(source, e.target)) {
                e.target.parentNode.insertBefore(source, e.target);
            }
            else {
                e.target.parentNode.insertBefore(source, e.target.nextSibling);
            }
        });
    });

    // Optionally: Implement touchstart, touchmove, and touchend event listeners for touch-based dragging

    // Update the visibility of drag texts based on the presence of images
    function updateDragTextVisibility() {
        document.querySelectorAll('.images-container > p').forEach(text => {
            const container = text.parentNode;
            const hasImages = container.querySelectorAll('img').length > 0;
            text.style.display = hasImages ? 'none' : 'block';
        });
    }

    // Call updateDragTextVisibility at appropriate times to ensure the instructions are shown/hidden correctly
});
