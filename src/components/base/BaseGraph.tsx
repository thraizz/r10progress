import * as echarts from "echarts";
import { useEffect, useRef } from "react";

/**
 * Custom echarts mount to make the graph rerender on nested data change,
 * which somehow does not work when using the echarts-for-react package.
 * It does in other graphs though, weird!
 */
export const BaseGraph = ({ options }: { options: echarts.EChartsOption }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  useEffect(() => {
    // Initialize chart
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // Cleanup
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;
    chartInstance.current.setOption(options, true);
  }, [options]);

  return <div ref={chartRef} className="h-full w-full" />;
};
