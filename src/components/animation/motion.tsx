'use client';
import * as React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

export default function Motion({ constraintsRef }: { constraintsRef: React.RefObject<null> }) {
    const x = useMotionValue(0);
    const xInput = [-100, 0, 100];
    const count = useMotionValue(0);

    React.useEffect(() => {
        const controls = animate(count, 100, { duration: 5 });
        return () => controls.stop();
    }, []);

    const background = useTransform(x, xInput, [
        'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)',
        'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
        'linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)'
    ]);
    const color = useTransform(x, xInput, ['rgb(211, 9, 225)', 'rgb(68, 0, 255)', 'rgb(3, 209, 0)']);
    const tickPath = useTransform(x, [50, 100], [0, 1]);
    const crossPathA = useTransform(x, [-10, -55], [0, 1]);
    const crossPathB = useTransform(x, [-50, -100], [0, 1]);
    const rounded = useTransform(count, Math.round);
console.log(constraintsRef);
    return (
        <motion.div
            className='icon-container'
            style={{ ...box, x }}
            drag
            dragConstraints={constraintsRef}   // ✅ يستقبلها من الأب
            dragElastic={0.8}
            dragMomentum={true}
            whileDrag={{ scale: 1.05 }}
        >
            <motion.div className='icon-content' style={{ background, color }}>
            <motion.pre>{rounded}</motion.pre>
            <svg className='progress-icon' viewBox='0 0 50 50'>
                <motion.path
                    fill='none'
                    strokeWidth='2'
                    stroke={color}
                    d='M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0'
                    style={{ x: 5, y: 5 }}
                />
                <motion.path
                    id='tick'
                    fill='none'
                    strokeWidth='2'
                    stroke={color}
                    d='M14,26 L 22,33 L 35,16'
                    strokeDasharray='0 1'
                    style={{ pathLength: tickPath }}
                />
                <motion.path
                    fill='none'
                    strokeWidth='2'
                    stroke={color}
                    d='M17,17 L33,33'
                    strokeDasharray='0 1'
                    style={{ pathLength: crossPathA }}
                />
                <motion.path
                    id='cross'
                    fill='none'
                    strokeWidth='2'
                    stroke={color}
                    d='M33,17 L17,33'
                    strokeDasharray='0 1'
                    style={{ pathLength: crossPathB }}
                />
            </svg>
            </motion.div>
        </motion.div>
    );
}

const box = {
    width: 140,
    height: 140,
    backgroundColor: 'none',
    borderRadius: 20,
    padding: 20,
    zIndex: 1000, // ✅ يضعه فوق العناصر الأخرى
    touchAction: 'none', // ✅ يمنع الت
    marginTop: '90px', // ✅ يضيف مسافة من الأعلى والأسفل
    marginBottom: '90px', // ✅ يضيف مسافة من الأعلى والأسفل
};