import React, { useContext } from "react";

import ChatSection from "./components/ChatSection/ChatSection";
import MemberInRoom from "./components/MemberInRoom/MemberInRoom";

export default function SecondPage() {
  return (
    <div>
      <MemberInRoom />
      <ChatSection />
    </div>
  );
}
