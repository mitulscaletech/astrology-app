import React, { useEffect, useState } from "react";

import ReviewsChart from "./reviews-chart";
import RevenueChart from "./revenue-chart";
import SessionsChart from "./sessions-chart";
import Typography from "@/components/ui/typography";

import { IInsights } from "@/shared/interface";
import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";

import { transformGraphData } from "@/lib/utils";

const Insights = () => {
  const [chartData, setChartData] = useState<IInsights>({} as IInsights);

  const getChartStatistics = () => {
    HttpService.get(API_CONFIG.insights).then((response) => {
      if (!response.is_error) {
        setChartData(response.data);
      } else {
        setChartData({} as IInsights);
      }
    });
  };
  useEffect(() => {
    getChartStatistics();
  }, []);

  return (
    <>
      <div className="container">
        <div className="flex justify-between mb-4 lg:mb-6 2xl:mb-8">
          <Typography variant="h2" size="h6" isTitle className="font-semibold">
            Session & Revenue Insights
          </Typography>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {chartData?.session && (
            <div className="md:w-4/12">
              <SessionsChart
                data={transformGraphData(chartData?.session?.graph) || []}
                totalSessions={chartData?.session?.total_session || 0}
                period="30 Days"
                lastRecord={36}
              />
            </div>
          )}
          <div className="md:w-3/12">
            <RevenueChart
              data={chartData?.revenue?.graph || []}
              totalRevenue={chartData?.revenue?.total_revenue || 0}
              percentageChange={2.45}
            />
          </div>
          <div className="md:w-2/12">
            <ReviewsChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;
