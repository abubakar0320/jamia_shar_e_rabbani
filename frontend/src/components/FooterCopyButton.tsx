'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface FooterCopyButtonProps {
  text: string;
  title: string;
  idleLabel: string;
  copiedLabel: string;
  variant?: 'default' | 'compact';
  tone?: 'emerald' | 'teal' | 'sky';
}

const COPIED_CLASSES: Record<NonNullable<FooterCopyButtonProps['tone']>, string> = {
  emerald: 'bg-emerald-700 text-white shadow-xs',
  teal: 'bg-teal-700 text-white shadow-xs',
  sky: 'bg-sky-700 text-white shadow-xs',
};

const IDLE_HOVER_CLASSES: Record<NonNullable<FooterCopyButtonProps['tone']>, string> = {
  emerald: 'bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200 hover:border-emerald-600',
  teal: 'bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 border border-slate-200',
  sky: 'bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 border border-slate-200',
};

export default function FooterCopyButton({
  text,
  title,
  idleLabel,
  copiedLabel,
  variant = 'compact',
  tone = 'emerald',
}: FooterCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined' && navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const iconSize = variant === 'default' ? 13 : 12;
  const paddingClass = variant === 'default' ? 'px-3 py-1.5' : 'px-2.5 py-1.5';
  const textSizeClass = variant === 'default' ? 'text-[11px]' : 'text-[10px]';

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 ${paddingClass} rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
        copied ? COPIED_CLASSES[tone] : IDLE_HOVER_CLASSES[tone]
      }`}
      title={title}
    >
      {copied ? (
        <>
          <Check size={iconSize} />
          <span className={`${textSizeClass} font-urdu`}>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy size={iconSize} />
          <span className={`${textSizeClass} font-urdu`}>{idleLabel}</span>
        </>
      )}
    </button>
  );
}
