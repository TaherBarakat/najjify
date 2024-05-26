export default function MessageCard({ isReqUserMessage, content }) {
  return (
    <div
      className={`rounded-ad max-w-[50%] px-2 py-2 ${isReqUserMessage ? "self-start bg-white  " : "self-end bg-[#d9fdd3]"}`}
    >
      <p>{content} </p>
    </div>
  );
}
