import { UserIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between p-4">
        <div className="logo text-2xl font-bold">
          Jewelry
        </div>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-slate-500 rounded-full flex items-center justify-center hover:scale-110 transition-all">
            <ShoppingBagIcon className='size-4 text-white' />
          </div>

          <div className="p-2 bg-slate-500 rounded-full flex items-center justify-center hover:scale-110 transition-all">
            <UserIcon className='size-4 text-white' />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header