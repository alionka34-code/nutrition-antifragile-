import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../styles/testimonial-stack.css";

/**
 * Pile de cartes d'avis glissables (drag / swipe).
 * @param {{ testimonials: Array, visibleBehind?: number }} props
 */
export const TestimonialStack = ({ testimonials, visibleBehind = 2, maxWidth }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartRef = useRef(0);
    const cardRefs = useRef([]);
    const totalCards = testimonials.length;

    const navigate = useCallback(
        (newIndex) => {
            setActiveIndex((newIndex + totalCards) % totalCards);
        },
        [totalCards]
    );

    const handleDragStart = (e, index) => {
        if (index !== activeIndex) return;
        setIsDragging(true);
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        dragStartRef.current = clientX;
        cardRefs.current[activeIndex]?.classList.add("is-dragging");
    };

    const handleDragMove = useCallback(
        (e) => {
            if (!isDragging) return;
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            setDragOffset(clientX - dragStartRef.current);
        },
        [isDragging]
    );

    const handleDragEnd = useCallback(() => {
        if (!isDragging) return;
        cardRefs.current[activeIndex]?.classList.remove("is-dragging");
        if (Math.abs(dragOffset) > 50) {
            navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
        }
        setIsDragging(false);
        setDragOffset(0);
    }, [isDragging, dragOffset, activeIndex, navigate]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleDragMove);
            window.addEventListener("touchmove", handleDragMove);
            window.addEventListener("mouseup", handleDragEnd);
            window.addEventListener("touchend", handleDragEnd);
        }
        return () => {
            window.removeEventListener("mousemove", handleDragMove);
            window.removeEventListener("touchmove", handleDragMove);
            window.removeEventListener("mouseup", handleDragEnd);
            window.removeEventListener("touchend", handleDragEnd);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    if (!testimonials?.length) return null;

    return (
        <section className="testimonials-stack relative pb-10" style={maxWidth ? { maxWidth } : undefined}>
            {testimonials.map((testimonial, index) => {
                const displayOrder =
                    (index - activeIndex + totalCards) % totalCards;

                // --- Calcul dynamique du style ---
                const style = {};
                if (displayOrder === 0) {
                    // Carte active
                    style.transform = `translateX(${dragOffset}px)`;
                    style.opacity = 1;
                    style.zIndex = totalCards;
                } else if (displayOrder <= visibleBehind) {
                    // Cartes empilées derrière
                    const scale = 1 - 0.05 * displayOrder;
                    const translateY = -2 * displayOrder; // en rem
                    style.transform = `scale(${scale}) translateY(${translateY}rem)`;
                    style.opacity = 1 - 0.2 * displayOrder;
                    style.zIndex = totalCards - displayOrder;
                } else {
                    // Cartes hors champ
                    style.transform = "scale(0)";
                    style.opacity = 0;
                    style.zIndex = 0;
                }

                const tagClasses = (type) =>
                    type === "featured"
                        ? "bg-marron/15 text-marron border border-marron/30"
                        : "bg-beige1 dark:bg-neutral-800 text-gray-600 dark:text-gray-300";

                return (
                    <div
                        ref={(el) => (cardRefs.current[index] = el)}
                        key={testimonial.id}
                        className="testimonial-card glass-effect"
                        style={style}
                        onMouseDown={(e) => handleDragStart(e, index)}
                        onTouchStart={(e) => handleDragStart(e, index)}
                    >
                        <div className="p-6 md:p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white font-SFBold text-base"
                                        style={{ background: testimonial.avatarGradient }}
                                    >
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <h3 className="font-SFBold text-lg text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h3>
                                        <p className="font-SF text-sm text-marron mt-1">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <blockquote className="font-SF text-gray-700 dark:text-gray-200 leading-relaxed text-base md:text-lg mb-6">
                                &laquo;&nbsp;{testimonial.quote}&nbsp;&raquo;
                            </blockquote>

                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-beige2 dark:border-neutral-700 pt-4 gap-4">
                                <div className="flex flex-wrap gap-2">
                                    {testimonial.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className={[
                                                "font-SF",
                                                "text-xs",
                                                "px-2",
                                                "py-1",
                                                "rounded-md",
                                                tagClasses(tag.type),
                                            ].join(" ")}
                                        >
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                    {testimonial.stats.map((stat, i) => {
                                        const IconComponent = stat.icon;
                                        return (
                                            <span
                                                key={i}
                                                className="flex items-center font-SF whitespace-nowrap"
                                            >
                                                <IconComponent className="mr-1.5 h-3.5 w-3.5" />
                                                {stat.text}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="pagination flex gap-2 justify-center absolute bottom-0 left-0 right-0">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        aria-label={`Voir l'avis ${index + 1}`}
                        onClick={() => navigate(index)}
                        className={`pagination-dot ${activeIndex === index ? "active" : ""}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default TestimonialStack;
