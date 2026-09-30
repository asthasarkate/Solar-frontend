import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const routeTitles = {
  '/dashboard': 'Dashboard',
  '/analyze': 'Analyze Image',
  '/history': 'Scan History',
  '/profile': 'Profile',
}

export default function TopBar() {
  const { user } = useAuth()
  const location = useLocation()

  const title = routeTitles[location.pathname] || 'Dashboard'

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] px-8 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-[#18181B] tracking-tight">
        {title}
      </h2>
      <div className="flex items-center">
        <div
          className="w-9 h-9 rounded-full overflow-hidden border border-[#E5E7EB] bg-[#FAFAFA] flex-shrink-0 cursor-pointer hover:border-[#71717A] transition-colors"
          title={user?.name || 'User'}
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#18181B] font-medium text-xs tracking-wider">
              {initials}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
