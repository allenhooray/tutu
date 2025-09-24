import type { FC, PropsWithChildren } from "react"

export const FullLayouts: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}