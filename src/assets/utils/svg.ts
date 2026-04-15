import { FC } from 'react';

import alertSolid from '@assets/graphics/alert-solid';
import clockSolid from '@assets/graphics/clock-solid';
import dashboardSpeedSolid from '@assets/graphics/dashboard-speed-solid';
import settingSolid from '@assets/graphics/setting-solid';
import snowOffSolid from '@assets/graphics/snow-off-solid';
import snowSolid from '@assets/graphics/snow-solid';
import squareLockSolid from '@assets/graphics/square-lock-solid';
import squareUnlockSolid from '@assets/graphics/square-unlock-solid';
import viewSolid from '@assets/graphics/view-solid';
import { SVGGraphicProps } from '@assets/utils/types';

// Icon map
export const SvgIcons = {
    AlertSolid: 'alert-solid',
    ClockSolid: 'clock-solid',
    DashboardSpeedSolid: 'dashboard-speed-solid',
    SettingSolid: 'setting-solid',
    SnowOffSolid: 'snow-off-solid',
    SnowSolid: 'snow-solid',
    SquareLockSolid: 'square-lock-solid',
    SquareUnlockSolid: 'square-unlock-solid',
    ViewSolid: 'view-solid',
} as const;

export type SvgIcon = keyof typeof SvgIcons;
export type SvgIconValues = (typeof SvgIcons)[SvgIcon];

// Icon component record

export const SvgIconsRecord: Record<SvgIconValues, FC<SVGGraphicProps>> = {
    [SvgIcons.AlertSolid]: alertSolid,
    [SvgIcons.ClockSolid]: clockSolid,
    [SvgIcons.DashboardSpeedSolid]: dashboardSpeedSolid,
    [SvgIcons.SettingSolid]: settingSolid,
    [SvgIcons.SnowOffSolid]: snowOffSolid,
    [SvgIcons.SnowSolid]: snowSolid,
    [SvgIcons.SquareLockSolid]: squareLockSolid,
    [SvgIcons.SquareUnlockSolid]: squareUnlockSolid,
    [SvgIcons.ViewSolid]: viewSolid,
};
