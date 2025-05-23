import CustomBigCalendar from "@/components/common/custom-big-calendar";
import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import moment from "moment";
import { useEffect, useState } from "react";

const UpcomingSessions = () => {
  const [sessionList, setSessionList] = useState([]);

  const getAstrologerSession = () => {
    HttpService.get(API_CONFIG.astrologerCalender).then((response) => {
      if (!response.is_error) {
        const tempData = response.data;
        // console.log(" tempData:", tempData);

        tempData.map((session: any) => {
          session.start = moment(`${session.start_at}`, "YYYY-MM-DD HH:mm:ss").toDate();
          session.end = moment(`${session.end_at}`, "YYYY-MM-DD HH:mm:ss").toDate();
        });
        setSessionList(tempData);
      } else {
        setSessionList([]);
      }
    });
  };

  // const day = moment(selectedDate).clone().add(i, "days");
  // const start = day.clone().hour(slot.startHour).minute(slot.startMinute).toDate();
  // const end = day.clone().hour(slot.endHour).minute(slot.endMinute).toDate();

  useEffect(() => {
    getAstrologerSession();
  }, []);

  return <div className="container">{sessionList?.length && <CustomBigCalendar sessionList={sessionList} />}</div>;
};
export default UpcomingSessions;
