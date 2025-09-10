'use client';
import React from 'react';

/* ---------- Types ---------- */
type BrandItem = {
  id: number | string;
  name: string;
  enabled: boolean;
  services: string[];
};

type BrandServicesGridProps = {
  items: BrandItem[];
  onToggle?: (id: BrandItem['id'], next: boolean) => void;
  onEdit?: (id: BrandItem['id']) => void;
  onAddNew?: () => void;
  className?: string;
};

/* ---------- UI atoms ---------- */
function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

const Toggle: React.FC<{
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}> = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    aria-pressed={checked}
    aria-disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={cx(
      'relative inline-flex h-6 w-[43px] items-center rounded-full transition-colors',
      checked ? 'bg-[#6EDE8A]' : 'bg-gray-300',
      disabled && 'opacity-50 cursor-not-allowed'
    )}
  >
    <span
      className={cx(
        'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
        checked ? 'translate-x-5' : 'translate-x-1'
      )}
    />
  </button>
);

const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={cx('h-4 w-4 text-gray-500', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const ServicePill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-[#E9ECEF] bg-white px-3 py-1 text-xs text-gray-700">
    {label}
  </span>
);

/* ---------- Main component ---------- */
const BrandServicesGrid: React.FC<BrandServicesGridProps> = ({
  items,
  onToggle,
  onEdit,
  onAddNew,
  className,
}) => {
  return (
    <div className={cx('w-full', className)}>
      {/* Header */}
      <div className="mb-4 flex items-center gap-9">
        <div className="text-sm font-medium text-[#495057]">Services</div>
        <button
          type="button"
          onClick={onAddNew}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-800"
        >
          <span className="text-lg leading-none">＋</span>
          <span>Add new</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl bg-white p-6"
          >
            {/* Top row: toggle + brand + pencil */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Toggle checked={b.enabled} onChange={(v) => onToggle?.(b.id, v)} />
                <span className="text-sm font-medium text-[#495057]">{b.name}</span>
              </div>

              <button
                type="button"
                onClick={() => onEdit?.(b.id)}
                className="rounded p-1 hover:bg-gray-50"
                aria-label={`Edit ${b.name}`}
                title="Edit"
              >
                <PencilIcon />
              </button>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {b.services.map((s, i) => (
                <ServicePill key={`${b.id}-${i}-${s}`} label={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


import { useState } from 'react';

export default function MyServices() {
  const [items, setItems] = useState<BrandItem[]>([
    { id: 1, name: 'Mercedes', enabled: true, services: ['Engine', 'Battery', 'Tire', 'Electronics', 'Brake', 'Electronics'] },
    { id: 2, name: 'BMW', enabled: true, services: ['Engine', 'Battery', 'Tire', 'Electronics', 'Brake', 'Electronics'] },
    { id: 3, name: 'Changan', enabled: true, services: ['Engine', 'Battery', 'Tire', 'Electronics', 'Brake', 'Electronics'] },
    { id: 4, name: 'Mercedes', enabled: true, services: ['Engine', 'Battery', 'Tire', 'Electronics', 'Brake', 'Electronics'] },
    { id: 5, name: 'BMW', enabled: true, services: ['Engine', 'Battery', 'Tire', 'Electronics', 'Brake', 'Electronics'] },
    { id: 6, name: 'Changan', enabled: true, services: ['Engine', 'Battery', 'Tire', 'Electronics', 'Brake', 'Electronics'] },
  ]);

  return (
    <div className="">
      <BrandServicesGrid
        items={items}
        onToggle={(id, next) =>
          setItems((prev) => prev.map((x) => (x.id === id ? { ...x, enabled: next } : x)))
        }
        onEdit={(id) => console.log('edit', id)}
        onAddNew={() => console.log('add new')}
      />
    </div>
  );
}