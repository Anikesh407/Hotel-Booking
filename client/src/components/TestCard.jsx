import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const TestCard = () => {
  const [copied, setCopied] = useState(false);

  const card = {
    type: "Use Card for Payments",
    number: "4242424242424242",
    cvc: "Cvc: Any 3 digits",
    expiry: "Expiry: Any future date",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(card.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4">
      <div className="w-full max-w-2xl">
        {/* Medium+ screen: horizontal row */}
        <div className="hidden md:flex items-center justify-between bg-white shadow-md rounded-xl p-4 border gap-6">
          <p className="text-gray-600 font-semibold min-w-[60px]">
            {card.type}
          </p>

          <div className="flex items-center gap-2 min-w-[220px]">
            <p className="text-gray-700">{card.number}</p>
            <button
              onClick={handleCopy}
              className="text-gray-600 hover:text-blue-600"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          <p className="text-gray-700 min-w-[100px]">{card.cvc}</p>
          <p className="text-gray-700 min-w-[140px]">{card.expiry}</p>
        </div>

        {/* Small screen: stacked card */}
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border md:hidden">
          <h3 className="text-lg font-semibold">{card.type}</h3>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">{card.number}</p>
            <button
              onClick={handleCopy}
              className="ml-2 text-gray-600 hover:text-blue-600"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          <p className="text-gray-700">{card.cvc}</p>
          <p className="text-gray-700">{card.expiry}</p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
