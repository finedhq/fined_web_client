'use client';

import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
    </div>
  );
};

export default Loader;