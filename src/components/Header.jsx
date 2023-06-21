import "./Header.css";
import { useState, useEffect } from "react";
export default function Header() {
  const [today, setToday] = useState("");
  const date = new Date().toDateString();

  useEffect(() => {
    setToday(date);
  }, [date]);
  return (
    <header>
      <h1 className="heading">ToDo App</h1>
      <p className="date">{today}</p>
    </header>
  );
}
