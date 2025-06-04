'use client';

import React from 'react';
import { MenuItem as BaseMenuItem, MenuItemProps } from '@mui/base/MenuItem';
import {
  Menu as BaseMenu,
  MenuListboxSlotProps,
  MenuProps,
} from '@mui/base/Menu';
import clsx from 'clsx';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { CssTransition } from '@mui/base/Transitions';

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (props, ref) => {
    return (
      <BaseMenu
        ref={ref}
        {...props}
        slots={{
          listbox: Listbox,
        }}
        slotProps={{
          ...props.slotProps,
          root: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.root,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: clsx(`z-10`, resolvedSlotProps?.className),
            };
          },
          listbox: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.listbox,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                'text-sm box-border font-sans p-1.5 mr-7 my-3 mx-0 rounded-xl overflow-auto outline-0 bg-[#1e1e1e] backdrop-blur text-slate-300 min-w-listbox shadow-md shadow-slate-900 [.open_&]:opacity-100 [.open_&]:scale-100 transition-[opacity,transform] [.closed_&]:opacity-0 [.closed_&]:scale-90 [.placement-top_&]:origin-bottom [.placement-bottom_&]:origin-top',
                resolvedSlotProps?.className
              ),
            };
          },
        }}
      />
    );
  }
);

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseMenuItem
        ref={ref}
        className={clsx(
          'list-none p-2 rounded-lg cursor-pointer select-none last-of-type:border-b-0 focus:shadow-outline-purple focus:outline-0 focus:bg-white focus:bg-opacity-15 focus:text-slate-300 disabled:text-slate-700  disabled:hover:text-slate-700',
          className
        )}
        {...other}
      />
    );
  }
);

export const Listbox = React.forwardRef(function Listbox(
  props: MenuListboxSlotProps,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      'The `Listbox` component cannot be rendered outside a `Popup` component'
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName='open'
      exitClassName='closed'
    >
      <ul {...other} ref={ref} />
    </CssTransition>
  );
});
