import React from "react";

interface IconButtonProps {
  icon: React.ReactNode
}

const IconButton = ({icon}: IconButtonProps) => {
  return (
    <button className="p-2 bg-slate-600 rounded-md hover:bg-gray-700">{icon}</button>
  )
}

export default IconButton