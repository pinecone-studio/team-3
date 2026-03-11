"use client"

import { Progress } from "@/libs/shadcn/ui/progress"
import * as React from "react"


export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}


export function DocumentIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#CC272E" fillOpacity="0.1" />
      <path
        d="M25.1884 14.355L23.0884 12.255C22.902 12.0679 22.6804 11.9196 22.4364 11.8186C22.1924 11.7177 21.9308 11.666 21.6667 11.6667H15C14.558 11.6667 14.1341 11.8423 13.8215 12.1548C13.509 12.4674 13.3334 12.8913 13.3334 13.3333V26.6667C13.3334 27.1087 13.509 27.5326 13.8215 27.8452C14.1341 28.1577 14.558 28.3333 15 28.3333H25C25.4421 28.3333 25.866 28.1577 26.1786 27.8452C26.4911 27.5326 26.6667 27.1087 26.6667 26.6667V26.3742"
        stroke="#CC272E"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.8149 20.5217C28.1469 20.1897 28.3334 19.7395 28.3334 19.27C28.3334 18.8005 28.1469 18.3503 27.8149 18.0183C27.483 17.6864 27.0327 17.4999 26.5633 17.4999C26.0938 17.4999 25.6436 17.6864 25.3116 18.0183L21.9699 21.3617C21.7718 21.5597 21.6268 21.8044 21.5483 22.0733L20.8508 24.465C20.8299 24.5367 20.8286 24.6127 20.8471 24.6851C20.8657 24.7574 20.9033 24.8235 20.9561 24.8763C21.009 24.9291 21.075 24.9668 21.1474 24.9853C21.2197 25.0038 21.2957 25.0026 21.3674 24.9817L23.7591 24.2842C24.028 24.2057 24.2728 24.0606 24.4708 23.8625L27.8149 20.5217Z"
        stroke="#CC272E"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6666 25H17.5"
        stroke="#CC272E"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg
      width="6"
      height="9"
      viewBox="0 0 6 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666748 0.666687L5.33341 5.33335L0.666748 10"
        stroke="#0B0B0D"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CubIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#00713A" fillOpacity="0.1" />
      <path
        d="M15.3333 22.4867C15.536 22.6037 15.766 22.6653 16 22.6653C16.234 22.6653 16.464 22.6037 16.6667 22.4867L21.3333 19.82C21.5358 19.7031 21.704 19.535 21.821 19.3325C21.938 19.1301 21.9998 18.9005 22 18.6667V13.3333C21.9998 13.0995 21.938 12.8699 21.821 12.6674C21.704 12.465 21.5358 12.2969 21.3333 12.18L16.6667 9.51332C16.464 9.39629 16.234 9.33469 16 9.33469C15.766 9.33469 15.536 9.39629 15.3333 9.51332L10.6667 12.18C10.4642 12.2969 10.296 12.465 10.179 12.6674C10.062 12.8699 10.0002 13.0995 10 13.3333V18.6667C10.0002 18.9005 10.062 19.1301 10.179 19.3325C10.296 19.535 10.4642 19.7031 10.6667 19.82L15.3333 22.4867Z"
        stroke="#1D1B20"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 22.6667V16"
        stroke="#1D1B20"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1934 12.6667L16 16L21.8067 12.6667"
        stroke="#1D1B20"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 10.8467L19 14.28"
        stroke="#1D1B20"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DocumentIconSmall() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#CC272E" fillOpacity="0.1" />
      <path
        d="M20.1507 11.484L18.4707 9.80398C18.3216 9.65433 18.1444 9.53569 17.9492 9.45491C17.7539 9.37412 17.5447 9.3328 17.3334 9.33332H12.0001C11.6465 9.33332 11.3073 9.47379 11.0573 9.72384C10.8072 9.97389 10.6667 10.313 10.6667 10.6667V21.3333C10.6667 21.6869 10.8072 22.0261 11.0573 22.2761C11.3073 22.5262 11.6465 22.6667 12.0001 22.6667H20.0001C20.3537 22.6667 20.6928 22.5262 20.9429 22.2761C21.1929 22.0261 21.3334 21.6869 21.3334 21.3333V21.0993"
        stroke="#CC272E"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.2519 16.4173C22.5175 16.1518 22.6667 15.7916 22.6667 15.416C22.6667 15.0404 22.5175 14.6802 22.2519 14.4147C21.9863 14.1491 21.6261 13.9999 21.2506 13.9999C20.875 13.9999 20.5148 14.1491 20.2492 14.4147L17.5759 17.0893C17.4174 17.2478 17.3014 17.4436 17.2386 17.6587L16.6806 19.572C16.6638 19.6294 16.6628 19.6902 16.6777 19.7481C16.6925 19.806 16.7226 19.8588 16.7649 19.901C16.8071 19.9433 16.86 19.9734 16.9178 19.9882C16.9757 20.0031 17.0365 20.0021 17.0939 19.9853L19.0072 19.4273C19.2223 19.3645 19.4182 19.2485 19.5766 19.09L22.2519 16.4173Z"
        stroke="#CC272E"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 20H13.9999"
        stroke="#CC272E"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckListIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#B64E10" fillOpacity="0.1" />
      <path
        d="M17.9999 9.33334H13.9999C13.6317 9.33334 13.3333 9.63182 13.3333 10V11.3333C13.3333 11.7015 13.6317 12 13.9999 12H17.9999C18.3681 12 18.6666 11.7015 18.6666 11.3333V10C18.6666 9.63182 18.3681 9.33334 17.9999 9.33334Z"
        stroke="#B64E10"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6667 10.6667H20.0001C20.3537 10.6667 20.6928 10.8071 20.9429 11.0572C21.1929 11.3072 21.3334 11.6464 21.3334 12V21.3333C21.3334 21.6869 21.1929 22.0261 20.9429 22.2761C20.6928 22.5262 20.3537 22.6667 20.0001 22.6667H12.0001C11.6465 22.6667 11.3073 22.5262 11.0573 22.2761C10.8072 22.0261 10.6667 21.6869 10.6667 21.3333V12C10.6667 11.6464 10.8072 11.3072 11.0573 11.0572C11.3073 10.8071 11.6465 10.6667 12.0001 10.6667H13.3334"
        stroke="#B64E10"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 17.3333L15.3333 18.6667L18 16"
        stroke="#B64E10"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WarningBlueIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#0065B4" fillOpacity="0.1" />
      <path
        d="M22.4866 20L17.1533 10.6667C17.037 10.4615 16.8684 10.2908 16.6646 10.172C16.4608 10.0533 16.2291 9.99072 15.9933 9.99072C15.7574 9.99072 15.5258 10.0533 15.322 10.172C15.1182 10.2908 14.9496 10.4615 14.8333 10.6667L9.49995 20C9.38241 20.2036 9.32077 20.4346 9.32129 20.6697C9.32181 20.9047 9.38447 21.1355 9.50292 21.3385C9.62136 21.5416 9.79138 21.7097 9.99575 21.8259C10.2001 21.942 10.4316 22.0021 10.6666 22H21.3333C21.5672 21.9997 21.797 21.938 21.9995 21.8208C22.202 21.7037 22.3701 21.5354 22.487 21.3327C22.6038 21.1301 22.6653 20.9002 22.6653 20.6663C22.6652 20.4324 22.6036 20.2026 22.4866 20Z"
        stroke="#0065B4"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 14V16.6667"
        stroke="#0065B4"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 19.3333H16.0067"
        stroke="#0065B4"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function MacBook() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#F1F1F5" />
      <path
        d="M25 14.1667C25.442 14.1667 25.8659 14.3423 26.1785 14.6548C26.491 14.9674 26.6666 15.3913 26.6666 15.8334V22.9384C26.6665 23.1979 26.727 23.4538 26.8433 23.6859L27.7333 25.4584C27.7976 25.5858 27.828 25.7277 27.8216 25.8703C27.8153 26.0129 27.7725 26.1515 27.6972 26.2728C27.6219 26.3941 27.5167 26.4941 27.3917 26.563C27.2667 26.632 27.1261 26.6677 26.9833 26.6667H13.0166C12.8739 26.6677 12.7333 26.632 12.6083 26.563C12.4833 26.4941 12.3781 26.3941 12.3028 26.2728C12.2275 26.1515 12.1846 26.0129 12.1783 25.8703C12.172 25.7277 12.2024 25.5858 12.2666 25.4584L13.1566 23.6859C13.2729 23.4538 13.3334 23.1979 13.3333 22.9384V15.8334C13.3333 15.3913 13.5089 14.9674 13.8215 14.6548C14.134 14.3423 14.5579 14.1667 15 14.1667H25Z"
        stroke="#555555"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.7117 23.3225H13.2883"
        stroke="#555555"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DesctopIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#F1F1F5" />
      <path
        d="M26.6666 12.5H13.3333C12.4128 12.5 11.6666 13.2462 11.6666 14.1667V22.5C11.6666 23.4205 12.4128 24.1667 13.3333 24.1667H26.6666C27.5871 24.1667 28.3333 23.4205 28.3333 22.5V14.1667C28.3333 13.2462 27.5871 12.5 26.6666 12.5Z"
        stroke="#555555"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6666 27.5H23.3333"
        stroke="#555555"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 24.1667V27.5"
        stroke="#555555"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IphoneIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#F1F1F5" />
      <path
        d="M24.1666 11.6667H15.8333C14.9128 11.6667 14.1666 12.4129 14.1666 13.3334V26.6667C14.1666 27.5872 14.9128 28.3334 15.8333 28.3334H24.1666C25.0871 28.3334 25.8333 27.5872 25.8333 26.6667V13.3334C25.8333 12.4129 25.0871 11.6667 24.1666 11.6667Z"
        stroke="#555555"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 25H20.0083"
        stroke="#555555"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckListMini() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6.66667H12C11.2636 6.66667 10.6667 7.26362 10.6667 8V24C10.6667 24.7364 11.2636 25.3333 12 25.3333H20C20.7364 25.3333 21.3333 24.7364 21.3333 24V8C21.3333 7.26362 20.7364 6.66667 20 6.66667Z"
        stroke="#1D1B20"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 5.33333H14C13.6318 5.33333 13.3333 5.63181 13.3333 6V7.33333C13.3333 7.70152 13.6318 8 14 8H18C18.3682 8 18.6667 7.70152 18.6667 7.33333V6C18.6667 5.63181 18.3682 5.33333 18 5.33333Z"
        stroke="#1D1B20"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6667 17.3333L15.6667 19.3333L18.9999 16"
        stroke="#1D1B20"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
