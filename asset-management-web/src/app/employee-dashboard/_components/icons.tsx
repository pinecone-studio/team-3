export function DeviceIcon({
  type,
  size = 20,
}: {
  type: string;
  size?: number;
}) {
  if (type === "monitor") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="3"
          width="20"
          height="13"
          rx="1.5"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 21h8M12 16v5"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "phone") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect
          x="5"
          y="2"
          width="14"
          height="20"
          rx="2"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18h.01"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "keyboard") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="6"
          width="20"
          height="12"
          rx="2"
          stroke="#6B7280"
          strokeWidth="1.5"
        />
        <path
          d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  // laptop default
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v10H4V5z"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 15h20l-1.5 3H3.5L2 15z"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatIcon({ type, color }: { type: string; color: string }) {
  if (type === "cube") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="12" fill="#EBF3FF"/>
<path d="M19.4584 26.1829V20.3175L14.5 17.4473V23.1685C14.5 23.2112 14.5107 23.2512 14.5321 23.2887C14.5535 23.3261 14.5855 23.3581 14.6281 23.3848L19.4584 26.1829ZM20.5417 26.1829L25.3719 23.4056C25.4145 23.379 25.4465 23.3469 25.4679 23.3096C25.4893 23.2721 25.5 23.232 25.5 23.1894V17.4681L20.5417 20.3175V26.1829ZM19.3302 27.38L14.0867 24.3367C13.8759 24.2154 13.7115 24.0532 13.5936 23.85C13.4756 23.6467 13.4167 23.4237 13.4167 23.1812V16.8192C13.4167 16.5767 13.4756 16.3537 13.5936 16.1504C13.7115 15.9472 13.8759 15.785 14.0867 15.6637L19.3302 12.6204C19.5413 12.4975 19.7651 12.436 20.0015 12.436C20.2377 12.436 20.4605 12.4975 20.6698 12.6204L25.9134 15.6637C26.1242 15.785 26.2886 15.9472 26.4065 16.1504C26.5244 16.3537 26.5834 16.5767 26.5834 16.8192V23.1812C26.5834 23.4237 26.5244 23.6467 26.4065 23.85C26.2886 24.0532 26.1242 24.2154 25.9134 24.3367L20.6698 27.38C20.4587 27.5029 20.235 27.5644 19.9986 27.5644C19.7623 27.5644 19.5395 27.5029 19.3302 27.38ZM23.0465 17.6044L25.1042 16.4329L20.1073 13.5723C20.0647 13.5456 20.022 13.5323 19.9792 13.5323C19.9364 13.5323 19.8937 13.5456 19.8511 13.5723L18 14.6556L23.0465 17.6044ZM20 19.3656L22.0209 18.2021L16.875 15.2902L14.8959 16.4329L20 19.3656Z" fill="#2F6FED"/>
</svg>
  
    );
  }
  if (type === "doc") {
    return (
<svg
  width="40"
  height="40"
  viewBox="0 0 40 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="40" height="40" rx="12" fill="#EAF9F6" />

  <path
    d="M24.1507 15.4842L22.4707 13.8042C22.3215 13.6545 22.1443 13.5359 21.9491 13.4551C21.7539 13.3743 21.5446 13.333 21.3333 13.3335H16C15.6464 13.3335 15.3072 13.474 15.0572 13.724C14.8071 13.9741 14.6667 14.3132 14.6667 14.6668V25.3335C14.6667 25.6871 14.8071 26.0263 15.0572 26.2763C15.3072 26.5264 15.6464 26.6668 16 26.6668H24C24.3536 26.6668 24.6928 26.5264 24.9428 26.2763C25.1928 26.0263 25.3333 25.6871 25.3333 25.3335V25.0995"
    stroke="#2FBF9F"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  <path
    d="M26.252 20.4174C26.5176 20.1519 26.6668 19.7917 26.6668 19.4161C26.6668 19.0405 26.5176 18.6803 26.252 18.4148C25.9864 18.1492 25.6262 18 25.2507 18C24.8751 18 24.5149 18.1492 24.2493 18.4148L21.576 21.0894C21.4175 21.2478 21.3015 21.4437 21.2387 21.6588L20.6807 23.5721C20.6639 23.6295 20.6629 23.6903 20.6778 23.7482C20.6926 23.806 20.7227 23.8589 20.765 23.9011C20.8072 23.9434 20.86 23.9735 20.9179 23.9883C20.9758 24.0032 21.0366 24.0022 21.094 23.9854L23.0073 23.4274C23.2224 23.3646 23.4182 23.2486 23.5767 23.0901L26.252 20.4174Z"
    stroke="#2FBF9F"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  <path
    d="M17.3333 24H18"
    stroke="#2FBF9F"
    strokeWidth="1.33333"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

    );
  }
  if (type === "qr") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke={color}
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke={color}
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M14 14h3v3M17 17v4M14 17h3M14 21h7"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="5" y="5" width="3" height="3" fill={color} />
        <rect x="16" y="5" width="3" height="3" fill={color} />
        <rect x="5" y="16" width="3" height="3" fill={color} />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v4M12 17h.01"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PendingBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-[#FFF4DB] text-[#666666] text-xs font-medium px-2.5 py-1 rounded-full">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.99995 10.8002C5.34162 10.8002 4.72078 10.6752 4.13745 10.4252C3.55412 10.1752 3.0437 9.83145 2.6062 9.39395C2.1687 8.95645 1.82495 8.44603 1.57495 7.8627C1.32495 7.27936 1.19995 6.65853 1.19995 6.0002C1.19995 5.33353 1.32495 4.71061 1.57495 4.13145C1.82495 3.55228 2.1687 3.04395 2.6062 2.60645C3.0437 2.16895 3.55412 1.8252 4.13745 1.5752C4.72078 1.3252 5.34162 1.2002 5.99995 1.2002C6.66662 1.2002 7.28953 1.3252 7.8687 1.5752C8.44787 1.8252 8.9562 2.16895 9.3937 2.60645C9.8312 3.04395 10.175 3.55228 10.425 4.13145C10.675 4.71061 10.8 5.33353 10.8 6.0002C10.8 6.2252 10.7854 6.44603 10.7562 6.6627C10.727 6.87936 10.6833 7.09186 10.625 7.3002C10.5083 7.19186 10.3791 7.10436 10.2375 7.0377C10.0958 6.97103 9.94578 6.92936 9.78745 6.9127C9.82912 6.7627 9.85828 6.6127 9.87495 6.4627C9.89162 6.3127 9.89995 6.15853 9.89995 6.0002C9.89995 4.91686 9.52078 3.99603 8.76245 3.2377C8.00412 2.47936 7.08328 2.1002 5.99995 2.1002C4.91662 2.1002 3.99578 2.47936 3.23745 3.2377C2.47912 3.99603 2.09995 4.91686 2.09995 6.0002C2.09995 7.08353 2.47912 8.00436 3.23745 8.7627C3.99578 9.52103 4.91662 9.9002 5.99995 9.9002C6.43328 9.9002 6.8437 9.83561 7.2312 9.70645C7.6187 9.57728 7.97495 9.39186 8.29995 9.1502C8.37495 9.29186 8.47078 9.4127 8.58745 9.5127C8.70412 9.6127 8.83328 9.69603 8.97495 9.7627C8.56662 10.0877 8.11037 10.3419 7.6062 10.5252C7.10203 10.7085 6.56662 10.8002 5.99995 10.8002ZM9.17495 8.8252C9.05828 8.70853 8.99995 8.56686 8.99995 8.4002C8.99995 8.23353 9.05828 8.09186 9.17495 7.9752C9.29162 7.85853 9.43328 7.8002 9.59995 7.8002C9.76662 7.8002 9.90828 7.85853 10.025 7.9752C10.1416 8.09186 10.2 8.23353 10.2 8.4002C10.2 8.56686 10.1416 8.70853 10.025 8.8252C9.90828 8.94186 9.76662 9.0002 9.59995 9.0002C9.43328 9.0002 9.29162 8.94186 9.17495 8.8252ZM7.67495 8.1252L5.54995 6.0002V3.0002H6.44995V5.6252L8.31245 7.4877L7.67495 8.1252Z"
          fill="#EBA53E"
        />
      </svg>
      Хүлээгдэж буй
    </span>
  );
}

export function WarningTriangle({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v4M12 17h.01"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
