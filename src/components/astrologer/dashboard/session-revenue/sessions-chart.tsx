"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Label,
  Tooltip,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";
import { IGraph } from "@/shared/interface";

export interface ISessionsChartProps {
  data: IGraph[];
  totalSessions: number;
  period: string;
  lastRecord: number;
  className?: string;
}

const SessionsChart = ({ data, totalSessions, period, lastRecord, className }: ISessionsChartProps) => {
  console.log("data", data);
  return (
    <div className={cn("relative bg-secondary/5 p-4 xl:p-6 rounded-lg xl:rounded-xl 3xl:rounded-2xl", className)}>
      <div className="mb-6">
        <div className="flex items-end">
          <h3 className="text-3xl font-bold">{totalSessions}+ Sessions</h3>
        </div>
        <p className="text-sm text-muted-foreground">Last {period}</p>
      </div>

      <div className="h-48 2xl:h-64  w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--secondary-500) / 0.1)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis hide={true} />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-primary px-2 py-1 text-xs md:text-sm 2xl:text-small text-accent-white rounded-full">
                      <p className="font-medium">{`${payload[0].payload.name}: ${payload[0].value} sessions`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              y={lastRecord}
              stroke="rgb(var(--primary-500))"
              strokeDasharray="3 3"
              ifOverflow="extendDomain"
            >
              <Label value={`${lastRecord}+`} position="right" fill="#000" fontSize={12} offset={10} />
            </ReferenceLine>
            <Bar dataKey="count" radius={[8, 8, 8, 8]} fill="rgb(var(--secondary-500))">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isHighlighted ? "rgb(var(--primary-500))" : "rgb(var(--secondary-500) / 0.1)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SessionsChart;
