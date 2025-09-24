import { Toaster as SonnerToaster } from 'sonner'

export function Toaster({ ...props }: React.ComponentProps<typeof SonnerToaster>) {
  return (
    <SonnerToaster
      richColors
      position="top-right"
      className="
        group
        gap-2
        max-w-xs
        p-4
        z-50
        
        data-sonner-toaster
        [--sonner-background:var(--background)]
        [--sonner-text:var(--foreground)]
        [--sonner-border:var(--border)]
        [--sonner-radius:var(--radius)]
      "
      toastOptions={{
        classNames: {
          toast: 
            'group/toast'
            + ' bg-background border border-border text-foreground shadow-sm'
            + ' transition-all data-[swipe=true]:transition-none',
          closeButton: 'rounded-full hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          description: 'text-muted-foreground',
          success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
          error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
          warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
          info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        }
      }}
      {...props}
    />
  )
}

export default Toaster