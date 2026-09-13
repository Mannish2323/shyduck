'use client';

import React from 'react';
import { useShyduck } from '@/lib/store';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useShyduck();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none'
      }}
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--line-strong)',
            borderLeft: `4px solid ${
              toast.type === 'error'
                ? '#ef4444'
                : toast.type === 'warning'
                ? '#f59e0b'
                : toast.type === 'info'
                ? 'var(--lavender)'
                : 'var(--gold)'
            }`,
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            boxShadow: 'var(--shadow-floating)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div style={{ marginTop: '2px', flexShrink: 0 }}>
            {toast.type === 'error' ? (
              <AlertCircle size={18} color="#ef4444" />
            ) : toast.type === 'warning' ? (
              <AlertCircle size={18} color="#f59e0b" />
            ) : toast.type === 'info' ? (
              <Info size={18} color="var(--lavender)" />
            ) : (
              <CheckCircle2 size={18} color="var(--gold)" />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>
              {toast.title}
            </div>
            {toast.description && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {toast.description}
              </div>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            style={{
              color: 'var(--text-muted)',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
