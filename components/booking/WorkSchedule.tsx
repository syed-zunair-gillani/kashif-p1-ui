'use client';
import React, { useMemo, useState } from 'react';

type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

type DayConfig = {
  key: DayKey;
  label: string;
};

type DaySchedule = {
  enabled: boolean;
  from: string; // "HH:MM" 24h
  to: string;   // "HH:MM" 24h
};

export type WorkScheduleValue = Record<DayKey, DaySchedule>;

type WorkScheduleProps = {
  /** 15 or 30 etc. */
  minuteStep?: 5 | 10 | 15 | 20 | 30 | 60;
  /** Initial schedule value */
  value?: Partial<WorkScheduleValue>;
  /** Callback whenever schedule changes */
  onChange?: (schedule: WorkScheduleValue) => void;
  /** Optional: show a 24×7 quick switch */
  show247Toggle?: boolean;
};

const DAYS: DayConfig[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

const DEFAULT_DAY: DaySchedule = { enabled: true, from: '09:00', to: '18:00' };

const buildDefaultValue = (partial?: Partial<WorkScheduleValue>): WorkScheduleValue => {
  const v = {} as WorkScheduleValue;
  DAYS.forEach(({ key }) => {
    v[key] = { ...DEFAULT_DAY, ...(partial?.[key] ?? {}) };
  });
  return v;
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

/** Small iOS-like toggle */
const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }> = ({
  checked,
  onChange,
  disabled,
}) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={classNames(
        'relative inline-flex h-6 w-[43px] items-center rounded-full transition-colors',
        checked ? 'bg-[#6EDE8A]' : 'bg-gray-300',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      aria-pressed={checked}
      aria-disabled={disabled}
    >
      <span
        className={classNames(
          'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-5' : 'translate-x-1'
        )}
      />
    </button>
  );
};

const TimeSelect: React.FC<{
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
  label?: string;
}> = ({ value, onChange, options, disabled, label }) => (
  <div className="flex items-center gap-2">
    {label ? <span className="text-xs text-gray-500 w-10">{label}</span> : null}

    <div className="relative w-full">
      <select
        className={classNames(
          "appearance-none min-w-[120px] w-full rounded-[12px] bg-transparent border py-2.5 px-4 pr-10 text-sm text-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
          disabled && "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Custom Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

const WorkSchedule: React.FC<WorkScheduleProps> = ({
  minuteStep = 30,
  value,
  onChange,
  show247Toggle = true,
}) => {
  const [schedule, setSchedule] = useState<WorkScheduleValue>(() => buildDefaultValue(value));

  const timeOptions = useMemo(() => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += minuteStep) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        times.push(`${hh}:${mm}`);
      }
    }
    return times;
  }, [minuteStep]);

  const update = (next: WorkScheduleValue) => {
    setSchedule(next);
    onChange?.(next);
  };

  const setDayEnabled = (key: DayKey, enabled: boolean) => {
    const next = { ...schedule, [key]: { ...schedule[key], enabled } };
    update(next);
  };

  const setDayTime = (key: DayKey, field: 'from' | 'to', val: string) => {
    // Basic guard: ensure from <= to (same-day window). If invalid, snap the other bound.
    const cur = schedule[key];
    let from = field === 'from' ? val : cur.from;
    let to = field === 'to' ? val : cur.to;
    if (from > to) {
      if (field === 'from') to = from;
      else from = to;
    }
    const next = { ...schedule, [key]: { ...cur, from, to } };
    update(next);
  };


  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-[#495057]">Working days</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-3 lg:grid-cols-4 pb-20">
        {DAYS.map(({ key, label }) => {
          const day = schedule[key];
          const disabled = !day.enabled;
          return (
            <div
              key={key}
              className={classNames(
                'rounded-2xl bg-white p-6',
                disabled ? 'opacity-70' : 'opacity-100',
                ''
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Toggle checked={day.enabled} onChange={(v) => setDayEnabled(key, v)} />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <TimeSelect
                  label="From"
                  disabled={disabled}
                  value={day.from}
                  onChange={(v) => setDayTime(key, 'from', v)}
                  options={timeOptions}
                />
                <TimeSelect
                  label="To"
                  disabled={disabled}
                  value={day.to}
                  onChange={(v) => setDayTime(key, 'to', v)}
                  options={timeOptions}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkSchedule;
