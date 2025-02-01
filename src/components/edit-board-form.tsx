import Form from "next/form";

export default function EditBoardForm() {
    const editBoard = (formData: FormData) => {
        const boardName = formData.get('boardName');
        console.log(boardName);
    }
    return (
        <Form action={editBoard}>
            <h2>Edit Board</h2>
            <input type="text" name="boardName" />
        </Form>
    )
}