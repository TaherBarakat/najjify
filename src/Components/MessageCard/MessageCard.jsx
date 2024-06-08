// export {formatTimestamp} from '../../utils/utils'
export default function MessageCard({ isReqUserMessage, content
  ,timeStamp
  ,messageSenderName
 }) {

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
  
    const isSameDay = (date1, date2) => {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    };
  
    const padToTwoDigits = (num) => {
      return num.toString().padStart(2, '0');
    };
  
    if (isSameDay(date, now)) {
      return `${padToTwoDigits(date.getHours())}:${padToTwoDigits(date.getMinutes())}`;
    } else {
      return `${date.getFullYear()}-${padToTwoDigits(date.getMonth() + 1)}-${padToTwoDigits(date.getDate())} ${padToTwoDigits(date.getHours())}:${padToTwoDigits(date.getMinutes())}`;
    }
  };


  return (
    <div
      className={` rounded-ad max-w-[50%] px-2 py-2 ${isReqUserMessage ? "self-start bg-white  " : "self-end bg-[#d9fdd3]"}`}
    >
      <p className="text-xs	">{messageSenderName}</p>
      <p>{content} </p>
    <p className="text-xs	" >{formatTimestamp(timeStamp)}</p>
    </div>
  );
}
