"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import { IGraph } from "@/shared/interface";

interface RevenueChartProps {
  data: IGraph[];
  totalRevenue: number;
  percentageChange: number;
  className?: string;
}

const RevenueChart = ({ data, totalRevenue, percentageChange, className }: RevenueChartProps) => {
  const isPositive = percentageChange >= 0;

  return (
    <div
      className={cn(
        "relative bg-primary/5 flex flex-col rounded-lg xl:rounded-xl 3xl:rounded-2xl min-h-full",
        className
      )}
    >
      <div className="p-4 xl:p-6 text-center">
        <Typography variant="h3" size="p">
          Total Revenue
        </Typography>
        <Typography variant="h4" size="h5" className="mt-1 font-semibold">
          {totalRevenue}
        </Typography>
      </div>
      <div className="h-48 2xl:h-56 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(var(--primary-500))" stopOpacity={0.25} />
                <stop offset="95%" stopColor="rgb(var(--primary-500))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e4" />
            <XAxis hide={true} dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis hide={true} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.[0]?.payload?.month && payload?.[0]?.value) {
                  return (
                    <div className="bg-primary text-accent-white text-sm lg:text-small px-2 py-1 rounded-full">
                      <p className="font-medium">{`${payload[0].payload.month}: Rs. ${payload[0].value.toLocaleString()}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="rgb(var(--primary-500))"
              strokeWidth={4}
              fill="url(#colorRevenue)"
              dot={{
                fill: "rgb(var(--primary-500))",
                strokeWidth: 0,
                r: 6
              }}
              activeDot={{
                fill: "rgb(var(--primary-500))",
                stroke: "rgb(var(--primary-500))",
                strokeWidth: 2,
                r: 8
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
