import React from 'react'

export const StatDisplay=({
    value,
    label,
    color,
  }: {
    value: number;
    label: string;
    color: string;
  }) =>{
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold tracking-tight ${color}`}>
            {value}
          </span>
          <span className="text-gray-700 text-sm font-medium">{label}</span>
        </div>
      </div>
    );
  }
  