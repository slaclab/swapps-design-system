import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import type { ECharts, EChartsOption } from "echarts";
import * as echarts from "echarts";
import ReactEChartsCore from "echarts-for-react/lib/core";

export type ChartEventHandler = (params: unknown, chart: ECharts) => void;

export interface SWAPPSChartInitOptions {
  renderer?: "canvas" | "svg";
  devicePixelRatio?: number;
  locale?: string;
}

export interface SWAPPSChartProps {
  option: EChartsOption;
  replaceMerge?: string | string[];
  notMerge?: boolean;
  lazyUpdate?: boolean;
  group?: string;
  onEvents?: Record<string, ChartEventHandler>;
  onReady?: (chart: ECharts) => void;
  opts?: SWAPPSChartInitOptions;
  style?: React.CSSProperties;
  className?: string;
  ariaLabel?: string;
}

export const SWAPPSChart = forwardRef<HTMLDivElement, SWAPPSChartProps>(
  function SWAPPSChart(
    {
      option,
      replaceMerge,
      notMerge = false,
      lazyUpdate = false,
      group,
      onEvents,
      onReady,
      opts,
      style,
      className,
      ariaLabel,
    },
    ref
  ) {
    const chartRef = useRef<ReactEChartsCore>(null);
    const mountedRef = useRef(true);
    const onReadyRef = useRef(onReady);
    const onEventsRef = useRef(onEvents);

    onReadyRef.current = onReady;
    onEventsRef.current = onEvents;

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);

    const handleChartReady = useCallback((instance: ECharts) => {
      if (!mountedRef.current) {
        instance.dispose();
        return;
      }
      if (group) {
        instance.group = group;
        echarts.connect(group);
      }
      onReadyRef.current?.(instance);
    }, [group]);

    const stableOnEvents = useMemo(() => {
      if (!onEvents) return undefined;
      const stable: Record<string, (...args: unknown[]) => void> = {};
      for (const eventName of Object.keys(onEvents)) {
        stable[eventName] = (...args: unknown[]) => {
          const handler = onEventsRef.current?.[eventName];
          if (handler) {
            const instance = chartRef.current?.getEchartsInstance();
            handler(args[0], instance as ECharts);
          }
        };
      }
      return stable;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onEvents ? Object.keys(onEvents).sort().join(",") : ""]);

    const initOpts = useMemo(
      () => ({
        renderer: (opts?.renderer ?? "canvas") as "canvas" | "svg",
        devicePixelRatio: opts?.devicePixelRatio,
        locale: opts?.locale,
      }),
      [opts?.renderer, opts?.devicePixelRatio, opts?.locale]
    );

    const wrapperStyle: React.CSSProperties = {
      width: "100%",
      height: "100%",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={`swapps-chart ${className ?? ""}`}
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
      >
        <ReactEChartsCore
          ref={chartRef}
          echarts={echarts}
          option={option}
          notMerge={notMerge}
          lazyUpdate={lazyUpdate}
          opts={initOpts}
          onChartReady={handleChartReady}
          onEvents={stableOnEvents}
          style={wrapperStyle}
          replaceMerge={replaceMerge}
        />
      </div>
    );
  }
);
