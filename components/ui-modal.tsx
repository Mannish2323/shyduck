'use client';

import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function UIModal({ isOpen, onClose, title, subtitle, children, maxWidth = '520px' }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.15s ease-out'
        }}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth,
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--line-strong)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-floating)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--line)'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 700, margin: 0 }}>{title}</h3>
            {subtitle && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '32px', height: '32px' }}
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  );
}
