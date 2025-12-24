function initializeTooltip() {
    let currentTooltipEl = null;
    let currentTargetEl = null;

    const showTooltip = (el) => {
        if (window.innerWidth < 768) return;
        const tooltipText = el.dataset.altTitle || el.dataset.sagTitle || el.dataset.solTitle || el.dataset.ustTitle;
        if (!tooltipText) return;

        const tooltip = document.createElement("div");
        //tooltip.className = "github-tooltip";
        tooltip.textContent = tooltipText;
        tooltip.style.position = "fixed";
        tooltip.style.zIndex = "9999";
        tooltip.style.padding = "4px 10px";
        tooltip.style.background = "#000";
        tooltip.style.color = "#fff";
        tooltip.style.borderRadius = "8px";
        tooltip.style.fontSize = "11px";
        tooltip.style.fontWeight = "400";
        tooltip.style.pointerEvents = "none";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.border = "1px solid #d0d7de";
        tooltip.style.boxShadow = "0 3px 6px #8c959f55";
        tooltip.style.fontFamily = "inherit";

        document.body.appendChild(tooltip);

        const rect = el.getBoundingClientRect();
        const offset = 8;

        if (el.hasAttribute("data-alt-title")) {
            tooltip.style.top = `${rect.bottom + offset}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        } else if (el.hasAttribute("data-ust-title")) {
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - offset}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        } else if (el.hasAttribute("data-sag-title")) {
            tooltip.style.top = `${rect.top + (rect.height - tooltip.offsetHeight) / 2}px`;
            tooltip.style.left = `${rect.right + offset}px`;
        } else if (el.hasAttribute("data-sol-title")) {
            tooltip.style.top = `${rect.top + (rect.height - tooltip.offsetHeight) / 2}px`;
            tooltip.style.left = `${rect.left - tooltip.offsetWidth - offset}px`;
        }

        currentTooltipEl = tooltip;
        currentTargetEl = el;
    };

    const hideTooltip = () => {
        if (currentTooltipEl) {
            currentTooltipEl.remove();
            currentTooltipEl = null;
            currentTargetEl = null;
        }
    };

    document.addEventListener(
        "mouseenter",
        (e) => {
            const el = e.target;
            if (el.nodeType === Node.ELEMENT_NODE && el.matches("[data-alt-title], [data-sag-title], [data-sol-title], [data-ust-title]")) {el.tooltipTimeout = setTimeout(() => showTooltip(el), 300);}
        },
        true
    );

    document.addEventListener(
        "mouseleave",
        (e) => {
            const el = e.target;
            if (el.nodeType === Node.ELEMENT_NODE && el.matches("[data-alt-title], [data-sag-title], [data-sol-title], [data-ust-title]")) {
                clearTimeout(el.tooltipTimeout);
                hideTooltip();
            }
        },
        true
    );

    window.addEventListener("scroll", () => {
        if (!currentTooltipEl || !currentTargetEl) return;

        const el = currentTargetEl;
        const tooltip = currentTooltipEl;
        const rect = el.getBoundingClientRect();
        const offset = 8;

        if (el.hasAttribute("data-alt-title")) {
            tooltip.style.top = `${rect.bottom + offset}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        } else if (el.hasAttribute("data-ust-title")) {
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - offset}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        } else if (el.hasAttribute("data-sag-title")) {
            tooltip.style.top = `${rect.top + (rect.height - tooltip.offsetHeight) / 2}px`;
            tooltip.style.left = `${rect.right + offset}px`;
        } else if (el.hasAttribute("data-sol-title")) {
            tooltip.style.top = `${rect.top + (rect.height - tooltip.offsetHeight) / 2}px`;
            tooltip.style.left = `${rect.left - tooltip.offsetWidth - offset}px`;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {initializeTooltip();});
