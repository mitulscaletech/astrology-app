import CustomBigCalendar from "@/components/common/custom-big-calendar";
import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { useEffect, useState } from "react";

const UpcomingSessions = () => {
  const [sessionList, setSessionList] = useState([]);

  const getAstrologerSession = () => {
    HttpService.get(API_CONFIG.astrologerCalender).then((response) => {
      if (!response.is_error) {
        setSessionList(response.data.booked);
      } else {
        setSessionList([]);
      }
    });
  };

  useEffect(() => {
    getAstrologerSession();
  }, []);

  return <div className="container">{sessionList?.length && <CustomBigCalendar sessionList={sessionList} />}</div>;
};
export default UpcomingSessions;
