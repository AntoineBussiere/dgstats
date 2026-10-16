
"use client";

import { useEffect, useRef, useState } from "react";

interface InfoTooltipProps {
    text: string;
}

export default function InfoTooltip({ text }: InfoTooltipProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");

    const openTooltip = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();

            const boundary = buttonRef.current.closest("[data-tooltip-boundary]");
            const boundaryRect = boundary?.getBoundingClientRect();

            const rightLimit = boundaryRect?.right ?? window.innerWidth;
            const leftLimit = boundaryRect?.left ?? 0;

            const availableRight = rightLimit - rect.right;
            const availableLeft = rect.left - leftLimit;

            setDirection(
                availableRight >= 260 || availableRight >= availableLeft
                    ? "right"
                    : "left"
            );
        }

        setIsOpen(true);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <span ref={containerRef} className="relative inline-flex items-center">
            <button
                ref={buttonRef}
                type="button"
                aria-label="Plus d'informations"
                aria-expanded={isOpen}
                onMouseEnter={openTooltip}
                onMouseLeave={() => setIsOpen(false)}
                onFocus={openTooltip}
                onBlur={() => setIsOpen(false)}
                onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                    } else {
                        openTooltip();
                    }
                }}
                className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-500 text-[10px] font-semibold text-slate-400 transition-colors hover:border-indigo-400 hover:text-indigo-400"
            >
                i
            </button>

            {isOpen && (
                <span
                    role="tooltip"
                    className={`
                        absolute top-1/2 z-50 w-60 max-w-[calc(100vw-2rem)] -translate-y-1/2 rounded-lg
                        border border-slate-700 bg-slate-800 px-3 py-2 text-left text-xs
                        font-normal leading-relaxed text-slate-200 shadow-xl
                        ${ direction === "right" ? "left-full ml-2" : "right-full mr-2" }
                    `}
                >
                    {text}
                </span>
            )}
        </span>
    );
}
