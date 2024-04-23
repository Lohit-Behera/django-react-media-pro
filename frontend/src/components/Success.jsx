import React from "react";
import { MailCheck } from "lucide-react";

function Success() {
  return (
    <div>
      <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-green-100 p-6 shadow-lg shadow-green-500 ">
            <div className="rounded-full stroke-green-600 shadow-md shadow-green-500 bg-green-200 p-4">
              <MailCheck size={84} color="#16a34a" />
            </div>
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-bold">
            Massage sent successfully
          </h1>
          <p className="mt-5 lg:text-lg">
            We send you a massage. Check your email.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Success;
