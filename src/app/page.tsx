import BoardTasks from "@/components/board-tasks";
import PopupModal from "@/components/popup-modal";
import Sidebar from "@/components/sidebar";

export default function Home() {


    return (
        <main className="flex h-full">
            <Sidebar />
            <BoardTasks />
            <PopupModal />
        </main>
    );
}
