(() => {
    const ITEM_SELECTOR = '.timeline-item';
    const VISIBLE_CLASS = 'visible';
    const observedNodes = new WeakSet();
    let intersectionObserver = null;
    let mutationObserver = null;

    const revealImmediately = () => {
        document.querySelectorAll(ITEM_SELECTOR).forEach(item => {
            item.classList.add(VISIBLE_CLASS);
        });
    };

    const observeItems = items => {
        if (!intersectionObserver) {
            return;
        }

        items.forEach(item => {
            if (!item || observedNodes.has(item)) {
                return;
            }

            observedNodes.add(item);
            intersectionObserver.observe(item);
        });
    };

    const handleMutations = mutationList => {
        const newlyAdded = [];

        mutationList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (!(node instanceof HTMLElement)) {
                    return;
                }

                if (node.matches(ITEM_SELECTOR)) {
                    newlyAdded.push(node);
                }

                if (typeof node.querySelectorAll === 'function') {
                    node.querySelectorAll(ITEM_SELECTOR).forEach(child => {
                        newlyAdded.push(child);
                    });
                }
            });
        });

        if (newlyAdded.length) {
            observeItems(newlyAdded);
        }
    };

    const setupMutationObserver = () => {
        const timelineRoot = document.querySelector('.timeline');

        if (!timelineRoot || mutationObserver) {
            return;
        }

        mutationObserver = new MutationObserver(handleMutations);
        mutationObserver.observe(timelineRoot, { childList: true, subtree: false });
    };

    const setupIntersectionObserver = () => {
        if (!('IntersectionObserver' in window)) {
            revealImmediately();
            return;
        }

        intersectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.requestAnimationFrame(() => {
                        entry.target.classList.add(VISIBLE_CLASS);
                    });

                    intersectionObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.25,
            rootMargin: '0px 0px -15% 0px'
        });

        observeItems(document.querySelectorAll(ITEM_SELECTOR));
    };

    const init = () => {
        setupIntersectionObserver();
        setupMutationObserver();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('beforeunload', () => {
        intersectionObserver?.disconnect();
        mutationObserver?.disconnect();
    });
})();
