'use client';
import { cn } from '../../lib/utils';
import React, { type ReactNode } from 'react';

type AuroraBackgroundProps = React.HTMLProps<HTMLDivElement> & {
  children: ReactNode;
  showRadialGradient?: boolean;
};

export const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }: AuroraBackgroundProps) => {
  return (
    <div className={cn('relative w-full', className)} {...props}>
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={
          {
            '--aurora': 'repeating-linear-gradient(-100deg,#60a5fa_10%,#c7d2fe_15%,#bfdbfe_20%,#ede9fe_25%,#93c5fd_30%)',
            '--dark-gradient': 'repeating-linear-gradient(-100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)',
            '--white-gradient': 'repeating-linear-gradient(-100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',

            '--blue-300': '#dbeafe',
            '--blue-400': '#bfdbfe',
            '--blue-500': '#93c5fd',
            '--indigo-300': '#c7d2fe',
            '--violet-200': '#ede9fe',
            '--black': '#000',
            '--white': '#fff',
            '--transparent': 'transparent',
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora absolute -inset-2.5 opacity-20 blur-[10px] invert filter will-change-transform [background-image:var(--white-gradient),var(--aurora)] bg-size-[300%,200%] bg-position-[50%_50%,50%_50%] [--aurora:repeating-linear-gradient(-100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(-100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(-100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:bg-size-[200%,100%] after:bg-fixed after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

            showRadialGradient && `mask-[radial-gradient(ellipse_at_0%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};
