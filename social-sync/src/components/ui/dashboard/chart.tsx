'use client';

import { MetricsData } from '@/types/dashboard';
import { formatStatsCount } from '@/utils/functions';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { DM_Sans } from 'next/font/google';
import { Locale } from '@/navigation';
import { useLocale } from 'next-intl';

const dmsans = DM_Sans({ subsets: ['latin'] });

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface MetricChartProps {
  data: MetricsData[];
  metric: keyof MetricsData;
  label: string;
}

export default function MetricChart({ data, metric, label }: MetricChartProps) {
  const locale = useLocale() as Locale;
  // const growthRates = calculateGrowthRate(data, metric);

  const chart = {
    series: [
      {
        name: label,
        data: data.map((d) => d[metric] as number),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area' as const,
        toolbar: {
          show: true,
          tools: {
            pan: false,
          },
        },
        zoom: {
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth' as const,
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          show: false,
          style: {
            fontFamily: dmsans.style.fontFamily,
            colors: ['#FFFFFF'],
          },
          formatter: (value: number) => formatStatsCount(value),
        },
      },
      xaxis: {
        labels: {
          show: false,
          style: {
            colors: ['#FFFFFF'],
            fontFamily: dmsans.style.fontFamily,
          },
        },
        tooltip: {
          enabled: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      grid: {
        borderColor: 'transparent',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
          gradientToColors: ['#1C1C1C'],
        },
      },
      colors: ['var(--main-color)'],
      tooltip: {
        theme: 'dark',
        style: {
          fontFamily: dmsans.style.fontFamily,
        },
        x: {
          show: true,
          formatter: (value: number, opts?: any) => {
            const date = data[value]?.date;
            return new Date(date).toLocaleDateString(locale, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            });
          },
        },
      },
    } as ApexOptions,
  };

  return (
    <ReactApexChart
      series={chart.series}
      options={chart.options}
      type='area'
      width='100%'
      height={356}
    />
  );
}
