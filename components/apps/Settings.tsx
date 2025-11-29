import React, { useContext } from 'react';
import { Wifi, Bluetooth, Plane, Moon, Battery, ChevronRight, Search, UserCircle } from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const SettingRow = ({ icon: Icon, color, label, value, type = "arrow" }: any) => (
    <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-md active:bg-white/20 transition-colors cursor-pointer first:rounded-t-xl last:rounded-b-xl border-b border-white/5 last:border-0">
        <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${color}`}>
                <Icon size={18} />
            </div>
            <span className="text-white font-medium text-[15px]">{label}</span>
        </div>
        <div className="flex items-center space-x-2">
            {value && <span className="text-white/50 text-[15px]">{value}</span>}
            {type === "arrow" && <ChevronRight size={16} className="text-white/30" />}
            {type === "toggle" && (
                <div className="w-12 h-7 bg-green-500 rounded-full relative p-0.5">
                    <div className="w-6 h-6 bg-white rounded-full shadow-md translate-x-5" />
                </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="h-full w-full bg-[#000000] text-white flex flex-col pt-12 overflow-y-auto pb-20">
       <div className="px-5 mb-6">
           <h1 className="text-3xl font-bold mb-4">Settings</h1>
           <div className="relative">
               <Search className="absolute left-3 top-2.5 text-white/40" size={16} />
               <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-white/10 rounded-xl py-2 pl-9 pr-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition-colors"
                />
           </div>
       </div>

       <div className="px-5 space-y-2 mb-6">
           <div className="bg-white/10 rounded-xl p-4 flex items-center space-x-4 mb-6">
                <UserCircle size={56} className="text-gray-400" />
                <div>
                    <h3 className="font-medium text-lg">User</h3>
                    <p className="text-white/50 text-sm">Apple ID, iCloud, Media & Purchases</p>
                </div>
                <ChevronRight size={16} className="text-white/30 ml-auto" />
           </div>

           <div className="space-y-[1px]">
               <SettingRow icon={Plane} color="bg-orange-500" label="Airplane Mode" type="toggle" />
               <SettingRow icon={Wifi} color="bg-blue-500" label="Wi-Fi" value="LiquidNet" />
               <SettingRow icon={Bluetooth} color="bg-blue-500" label="Bluetooth" value="On" />
           </div>
       </div>
       
       <div className="px-5 space-y-[1px]">
           <SettingRow icon={Battery} color="bg-green-500" label="Battery" />
           <SettingRow icon={Moon} color="bg-indigo-500" label="Focus" />
       </div>
    </div>
  );
};