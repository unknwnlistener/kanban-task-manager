'use client';

import { closeBoardModal } from "@/state/features/featureSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import AddNewTaskForm from "./add-new-task-form";
import EditBoardForm from "./edit-board-form";
import DeleteBoardForm from "./delete-board-form";
import { X } from "lucide-react";
import AddNewColumnForm from "./add-new-column-form";

interface ModalProps {
    size?: "base" | "large" | "xlarge";
}
export default function PopupModal({ size = "base" }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const boardModal = useAppSelector((state) => state.feature.boardModal);
    const dispatch = useAppDispatch();

    const showModal = () => {
        dialogRef.current?.showModal();;
    }
    const closeModal = () => {
        dialogRef.current?.close();
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (boardModal.isOpen)
            showModal();
        else
            closeModal();
    }, [boardModal]);

    const handleCloseModal = () => {
        dispatch(closeBoardModal());
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    const getSizeCss = () => {
        switch (size) {
            case "base":
                return "lg:w-1/3 md:w-1/2";
            case "large":
                return "md:w-1/2";
            case "xlarge":
                return "w-full";
        }
    }

    const showForm = (variant: string) => {
        switch (variant) {
            case "addNewColumn":
                return <AddNewColumnForm onClose={handleCloseModal} />
            case "editBoard":
                return <EditBoardForm />
            case "deleteBoard":
                return <DeleteBoardForm />
        }
    }

    useEffect(() => {
        const modalElement = dialogRef?.current;
        let handleMouseEvent: (event: MouseEvent) => void;
        if (modalElement) {
            handleMouseEvent = (mouseEvent: MouseEvent) => {

                const dialogDimensions = modalElement.getBoundingClientRect()
                if (
                    mouseEvent.clientX < dialogDimensions.left ||
                    mouseEvent.clientX > dialogDimensions.right ||
                    mouseEvent.clientY < dialogDimensions.top ||
                    mouseEvent.clientY > dialogDimensions.bottom
                ) {
                    handleCloseModal();
                }
            }
            modalElement.addEventListener('click', handleMouseEvent);
        }
        return () => modalElement?.removeEventListener('click', handleMouseEvent);
    });

    return (
        <dialog onKeyDown={handleKeyDown} ref={dialogRef} className={clsx("relative z-10 px-5 pt-10 pb-5 mx-auto bg-white border-2 rounded backdrop:bg-gray-800/50 w-full h-fit ", getSizeCss())}>
            <button type="button" data-test="modal_close_button" onClick={() => handleCloseModal()} className="absolute p-1 rounded-full top-4 right-4 hover:bg-gray-200">
                <X className="text-gray-700" />
            </button>
            <div className="mx-3 text-left">
                {showForm(boardModal.variant)}
            </div>
        </dialog>
    )
}