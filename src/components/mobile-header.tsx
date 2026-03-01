import { Menu, Activity } from 'lucide-react';
import { Button } from './ui-elements/button';

interface MobileHeaderProps {
    onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    return (
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b px-4 py-3">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMenuClick}
                    className="h-10 w-10 p-0"
                >
                    <Menu className="w-6 h-6" />
                </Button>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-gray-900">SkinScan</span>
                </div>

                {/* Empty div for spacing */}
                <div className="w-10"></div>
            </div>
        </div>
    );
}
