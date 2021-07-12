import React from "react"
import Link from "next/link";

export const Button: React.FC<Props> = ({ children, active, className, href, colour = "base", ...props }) =>  {
  const baseStyles = "outline-none focus:outline-none transition py-2 px-4 rounded-full block"
  const colours = {
    base: `hover:text-white ${active ? "bg-blue text-white" : "bg-transparent hover:bg-blue text-gray"}`,
    aside: `text-white bg-blue hover:shadow-md`,
    google: `bg-white text-black`,
  }
  const styles = `${className ? className : ""} ${baseStyles} ${colours[colour]}`
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
  colour?: "base" | "aside" | "google"
}