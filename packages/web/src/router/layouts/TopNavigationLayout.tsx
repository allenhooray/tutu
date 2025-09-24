import type { FC, PropsWithChildren } from "react"
import NavigationMenu from "./components/NavigationMenu"

export const TopNavigationLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavigationMenu />
      <main>
        {children}
      </main>
    </div>
  )
}