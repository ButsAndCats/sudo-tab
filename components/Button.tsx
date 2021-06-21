import React from "react"
import Link from "next/link";

export const Button: React.FC<Props> = ({ children, active, className, href, ...props }) =>  {
  const styles = `${className ? className : ""} outline-none focus:outline-none transition py-2 px-4 rounded-full hover:text-white ${active ? "bg-blue text-white" : "bg-transparent hover:bg-blue text-gray"}`
  return href ? (
    <Link href={href}>
      <a
        className={styles}
      >
        {children}
      </a>
    </Link>
  ) : (
    <button
      className={styles}
      {...props}
    >
      {children}
    </button>
  )
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  href?: string
}