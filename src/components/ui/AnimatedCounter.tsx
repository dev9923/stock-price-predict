'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export default function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }: AnimatedCounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const [displayValue, setDisplayValue] = useState(`${prefix}${(0).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })}${suffix}`);

    const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    useEffect(() => {
        return spring.on('change', (latest: number) => {
            setDisplayValue(`${prefix}${latest.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}${suffix}`);
        });
    }, [spring, prefix, suffix, decimals]);

    return <span ref={ref}>{displayValue}</span>;
}
