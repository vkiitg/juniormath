
import React from 'react';
import { MathTopic, Grade } from './types';
import { 
  Calculator, 
  Divide, 
  Minus, 
  Plus, 
  Hash, 
  Clock, 
  Shapes, 
  Percent, 
  Variable, 
  Triangle,
  Table as TableIcon,
  RotateCw
} from 'lucide-react';

export const GRADE_TOPICS: Record<Grade, MathTopic[]> = {
  1: [
    { id: 'counting', name: 'Counting', description: 'Numbers 1-100', icon: 'Hash' },
    { id: 'table', name: 'Table', description: 'Basic multiplication tables', icon: 'Table' },
    { id: 'addition_simple', name: 'Simple Addition', description: 'Single digit sums', icon: 'Plus' },
    { id: 'addition_wheel', name: 'Simple Addition Wheel', description: 'Circular math puzzles', icon: 'RotateCw' },
    { id: 'subtraction_simple', name: 'Simple Subtraction', description: 'Basic differences', icon: 'Minus' },
    { id: 'subtraction_wheel', name: 'Simple Subtraction Wheel', description: 'Circular math puzzles', icon: 'RotateCw' },
    { id: 'multiplication_simple', name: 'Simple Multiplication', description: 'Intro to products', icon: 'Calculator' },
    { id: 'multiplication_wheel', name: 'Simple Multiplication Wheel', description: 'Circular math puzzles', icon: 'RotateCw' },
    { id: 'shapes', name: 'Shapes', description: 'Basic geometry', icon: 'Shapes' },
  ],
  2: [
    { id: 'add_2d_no', name: '2 digit addition (No regrouping)', description: 'Simple 2-digit sums', icon: 'Plus' },
    { id: 'add_2d_re', name: '2 digit addition (with regrouping)', description: 'Carrying over digits', icon: 'Plus' },
    { id: 'add_3d_no', name: '3 digit addition (No regrouping)', description: 'Simple 3-digit sums', icon: 'Plus' },
    { id: 'add_3d_re', name: '3 digit addition (with regrouping)', description: 'Adv carrying', icon: 'Plus' },
    { id: 'sub_2d_no', name: '2 digit subtraction (No regrouping)', description: 'Simple differences', icon: 'Minus' },
    { id: 'sub_2d_re', name: '2 digit subtraction (with regrouping)', description: 'Borrowing digits', icon: 'Minus' },
    { id: 'sub_3d_no', name: '3 digit subtraction (No regrouping)', description: 'Simple 3-digit diff', icon: 'Minus' },
    { id: 'sub_3d_re', name: '3 digit subtraction (with regrouping)', description: 'Adv borrowing', icon: 'Minus' },
    { id: 'multi_basic', name: 'Multiplication', description: 'Intro to products', icon: 'Calculator' },
    { id: 'multi_2d', name: '2 digit multiplication', description: 'Double digit factors', icon: 'Calculator' },
    { id: 'time', name: 'Telling Time', description: 'Reading the clock', icon: 'Clock' },
    { id: 'multi_wheel', name: 'Multiplication wheel', description: 'Circular products', icon: 'RotateCw' },
  ],
  3: [
    { id: 'add_3d_re', name: '3 digit addition (with regrouping)', description: 'Mastering carrying', icon: 'Plus' },
    { id: 'add_3d_3a', name: '3 digit addition (3 addend)', description: 'Multiple large numbers', icon: 'Plus' },
    { id: 'add_4_5d', name: '4 & 5 digit addition', description: 'High-level sums', icon: 'Plus' },
    { id: 'add_large_multi', name: '4 & 5, 6 digit addition(3, 4 addend)', description: 'Advanced multi-sum', icon: 'Plus' },
    { id: 'multi_2x2_nc', name: '2x2 multiplication (No carry)', description: 'Intro to grid math', icon: 'Calculator' },
    { id: 'multi_2x2_wc', name: '2x2 multiplication (with carry)', description: 'Carrying in products', icon: 'Calculator' },
    { id: 'multi_3x2_nc', name: '3x2 multiplication (No carry)', description: 'Extended multiplication', icon: 'Calculator' },
    { id: 'multi_3x2_wc', name: '3x2 multiplication (with carry)', description: 'Adv product carrying', icon: 'Calculator' },
    { id: 'multi_3x3_wc', name: '3x3 multiplication (with carry)', description: 'Complex products', icon: 'Calculator' },
    { id: 'division_basic', name: 'Basic division', description: 'Intro to sharing', icon: 'Divide' },
    { id: 'fractions_intro', name: 'Intro to fractions', description: 'Understanding parts', icon: 'Hash' },
  ],
  4: [
    { id: 'long_add', name: 'Long Addition', description: 'Advanced multi-digit sums', icon: 'Plus' },
    { id: 'long_sub', name: 'Long Subtraction', description: 'Advanced borrowing', icon: 'Minus' },
    { id: 'multi_3x1_wc', name: '3x1 multiplication (with carry)', description: 'Intermediate products', icon: 'Calculator' },
    { id: 'multi_3x2_wc', name: '3x2 multiplication (with carry)', description: 'Complex carrying', icon: 'Calculator' },
    { id: 'multi_3x3_wc', name: '3x3 multiplication (with carry)', description: 'Advanced grid multiplication', icon: 'Calculator' },
    { id: 'multi_4x1_wc', name: '4x1 multiplication (with carry)', description: 'Large digit products', icon: 'Calculator' },
    { id: 'multi_4x2_wc', name: '4x2 multiplication (with carry)', description: 'Mastering multiplication', icon: 'Calculator' },
    { id: 'multi_4x3_wc', name: '4x3 multiplication (with carry)', description: 'High-level products', icon: 'Calculator' },
    { id: 'long_div_no_rem', name: 'Long division(No Remainder)', description: 'Perfect sharing', icon: 'Divide' },
    { id: 'long_div_rem', name: 'Long division(With Remainder)', description: 'Division with leftovers', icon: 'Divide' },
    { id: 'frac_add', name: 'Fraction Addition', description: 'Combining parts', icon: 'Hash' },
    { id: 'frac_sub', name: 'Fraction Subtraction', description: 'Taking parts away', icon: 'Hash' },
    { id: 'decimals', name: 'Decimals', description: 'Point values', icon: 'Hash' },
    { id: 'geometry', name: 'Geometry', description: 'Angles and shapes', icon: 'Triangle' },
  ],
  5: [
    { id: 'fractions_adv', name: 'Advanced Fractions', description: 'Operations with fractions', icon: 'Hash' },
    { id: 'measurement', name: 'Measurement', description: 'Volume and weight', icon: 'Calculator' },
    { id: 'order_ops', name: 'Order of Operations', description: 'PEMDAS', icon: 'Hash' },
  ],
  6: [
    { id: 'ratios', name: 'Ratios & Proportions', description: 'Comparing values', icon: 'Percent' },
    { id: 'algebra', name: 'Basic Algebra', description: 'Solving for x', icon: 'Variable' },
    { id: 'integers', name: 'Integers', description: 'Positive & negative', icon: 'Minus' },
  ],
};

export const getIcon = (name: string) => {
  switch (name) {
    case 'Calculator': return <Calculator className="w-6 h-6" />;
    case 'Table': return <TableIcon className="w-6 h-6" />;
    case 'RotateCw': return <RotateCw className="w-6 h-6" />;
    case 'Divide': return <Divide className="w-6 h-6" />;
    case 'Minus': return <Minus className="w-6 h-6" />;
    case 'Plus': return <Plus className="w-6 h-6" />;
    case 'Hash': return <Hash className="w-6 h-6" />;
    case 'Clock': return <Clock className="w-6 h-6" />;
    case 'Shapes': return <Shapes className="w-6 h-6" />;
    case 'Percent': return <Percent className="w-6 h-6" />;
    case 'Variable': return <Variable className="w-6 h-6" />;
    case 'Triangle': return <Triangle className="w-6 h-6" />;
    default: return <Calculator className="w-6 h-6" />;
  }
};
