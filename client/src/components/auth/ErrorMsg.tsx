import React from 'react';

interface MsgProps {
  msg: string;
}

export default function ErrorMsg({ msg }: MsgProps) {
  return <p className="text-sm text-red-400">{msg}</p>;
}
