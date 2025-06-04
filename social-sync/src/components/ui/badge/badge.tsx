import * as React from 'react';
import clsx from 'clsx';
import { Badge as BaseBadge, BadgeProps } from '@mui/base/Badge';

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    return (
      <BaseBadge
        ref={ref}
        {...props}
        slotProps={{
          ...props.slotProps,
          root: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.root,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                'box-border m-0 p-0 text-xs list-none relative inline-block leading-none',
                resolvedSlotProps?.className
              ),
            };
          },
          badge: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.badge,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                'z-auto absolute top-0 right-0 min-w-badge min-h-badge font-sans p-0 text-[#E7E7E7] font-semibold font-xs font-sans rounded-xl bg-purple-500 leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right',
                resolvedSlotProps?.className
              ),
            };
          },
        }}
      />
    );
  }
);
