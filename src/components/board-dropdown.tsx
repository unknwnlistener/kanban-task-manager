import Dropdown from "@/components/dropdown";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export default function BoardDropdown({ boardId }: { boardId: string }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                className="rounded-full hover:bg-gray-200 p-2 "
                onClick={() => setShowDropdown(show => !show)}>
                <EllipsisVertical /></button>
            {showDropdown && <Dropdown boardId={boardId} />}
        </div>
    )
}