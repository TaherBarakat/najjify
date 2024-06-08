import { formatTimestamp } from "../../utils/utils";
export default function MessageCard({
  isReqUserMessage,
  content,
  timeStamp,
  messageSenderName,
}) {
  console.log(11111111111111111111111111111111, formatTimestamp);

  return (
    <div
      className={` flex max-w-[50%] flex-col  rounded-lg px-2 py-2 ${isReqUserMessage ? "self-start bg-white  " : "self-end bg-[#d9fdd3]"}`}
    >
      <p
        className={` text-xs text-neutral-600 ${isReqUserMessage ? "self-start   " : "self-end "}	`}
      >
        {messageSenderName}
      </p>
      <p className="break-all">{content} </p>
      <p
        className={` mt-1 text-[10px] text-neutral-600 ${isReqUserMessage ? " self-end " : "self-start "}	`}
      >
        {formatTimestamp(timeStamp)}
      </p>
    </div>
  );
}
