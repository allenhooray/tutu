import { Outlet } from 'react-router-dom';
import NavigationMenu from "./components/NavigationMenu"

export const TopNavigationLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavigationMenu />
      <main>
        <Outlet />
      </main>
    </div>
  )
}