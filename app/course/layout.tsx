import React from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow p-4 md:overflow-y-auto md:p-4">{children}</div>
    </div>
  );
}